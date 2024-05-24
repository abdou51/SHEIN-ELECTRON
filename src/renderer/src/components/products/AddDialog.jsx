import { useState, useContext } from "react";

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";

import { ProductContext } from "../../context/productContext";
import { CategoryContext } from "../../context/categoryContext";

const AddDialog = () => {
  // context state
  const { addProduct } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);

  // local state
  const [openModal, setOpenModal] = useState(false);

  // add product state
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setPrice("");
  }

  const handleAddProduct = (event) => {
    event.preventDefault();
    addProduct({
      sellPrice: price,
      category,
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
        Ajouter un produit
      </button>
      <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un produit
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Prix" />
              </div>
              <TextInput
                type="text"
                autoComplete="off"
                placeholder="prix"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
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
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleAddProduct} className="w-48">
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
