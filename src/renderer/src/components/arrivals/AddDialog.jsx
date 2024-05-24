import {
  Button,
  Label,
  Modal,
  TextInput,
  Datepicker,
  Select,
} from "flowbite-react";
import { IoMdAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

import { useState, useContext } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { ArrivalContext } from "../../context/arrivalContext";
const AddDialog = () => {
  // context state
  const { categories } = useContext(CategoryContext);
  const { addArrival, updateArrival, deleteArrival, loading } =
    useContext(ArrivalContext);

  // local state
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(undefined);
  const [numBoxes, setNumBoxes] = useState(undefined);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([
    {
      category: "",
      quantity: undefined,
    },
  ]);

  function onCloseModal() {
    setOpenModal(false);
    setName("");
    setDate(new Date());
    setQuantity(null);
    setNumBoxes(null);
    setCategory("");
    setItems([
      {
        category: "",
        quantity: undefined,
      },
    ]);
  }

  // event functions
  const handlewheel = (event) => {
    event.target.blur();
  };

  // submit functions

  const handleAddArrival = (event) => {
    event.preventDefault();
    addArrival({
      name,
      date,
      quantity,
      numBoxes,
      category,
      items,
    });
    onCloseModal();
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="h-12 hover:opacity-75 row-span-1 justify-self-end text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center m-2"
      >
        <IoMdAdd className="mr-2" size={28} />
        Ajouter Un Nouvel Arrivage
      </button>
      <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter Un Nouvel Arrivage
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nom De L'arrivage" />
              </div>
              <TextInput
                id="name"
                placeholder="nom"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <Datepicker
                className="h-10"
                language="fr-FR"
                labelTodayButton="Aujourd'hui"
                labelClearButton="Effacer"
                selected={date}
                onSelectedDateChanged={(date) => setDate(date)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="quantity" value="Quantité" />
              </div>
              <TextInput
                id="quantity"
                placeholder="quantité"
                value={quantity}
                type="number"
                onWheel={handlewheel}
                onChange={(event) =>
                  setQuantity(
                    event.target.value === ""
                      ? undefined
                      : Number(event.target.value)
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nbBoxes" value="Nb Cartons" />
              </div>
              <TextInput
                id="nbBoxes"
                placeholder="nb cartons"
                value={numBoxes}
                type="number"
                onWheel={handlewheel}
                onChange={(event) =>
                  setNumBoxes(
                    event.target.value === ""
                      ? undefined
                      : Number(event.target.value)
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Catégorie" />
              </div>
              <Select
                id="category"
                required
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2  flex justify-between">
                <Label htmlFor="category" value="Quantitéés Trouvées" />
                <Button
                  onClick={() =>
                    setItems([
                      ...items,
                      {
                        category,
                        quantity,
                      },
                    ])
                  }
                >
                  Ajouter Une Quantité
                </Button>
              </div>
              {items.map((item, index) => (
                <div
                  className="flex justify-between items-center mb-2"
                  key={index}
                >
                  <Label htmlFor="category" value={`Catégorie ${index + 1}`} />
                  <Select
                    id="category"
                    required
                    onChange={(e) =>
                      setItems(
                        items.map((it, i) => {
                          if (i === index) {
                            return {
                              ...it,
                              category: e.target.value,
                            };
                          }
                          return it;
                        })
                      )
                    }
                    value={item.category}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  <TextInput
                    id="quantity"
                    placeholder="quantité"
                    value={item.quantity}
                    type="number"
                    onChange={(event) =>
                      setItems(
                        items.map((it, i) => {
                          if (i === index) {
                            return {
                              ...it,
                              quantity:
                                event.target.value === ""
                                  ? null
                                  : Number(event.target.value),
                            };
                          }
                          return it;
                        })
                      )
                    }
                    required
                  />
                  <div
                    className="border w-12 h-12 text-red-500 flex items-center justify-center text-3xl rounded-lg font-bold"
                    onClick={() =>
                      setItems(items.filter((it, i) => i !== index))
                    }
                  >
                    <button>
                      <TiDelete size={48} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleAddArrival} className="w-48">
                Ajouter
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddDialog;
