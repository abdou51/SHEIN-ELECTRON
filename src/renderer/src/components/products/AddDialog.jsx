import { useState, useContext, useEffect } from 'react'
import { Button, Label, Modal, TextInput, Select, Radio } from 'flowbite-react'
import { IoMdAdd } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'

import { ProductContext } from '../../context/productContext'
import { CategoryContext } from '../../context/categoryContext'
import { ArrivalContext } from '../../context/arrivalContext'

const AddDialog = () => {
  // size arrays
  const numberSizes = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52]
  const letterSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', '5XL', '6XL']

  // context state
  const { addProduct } = useContext(ProductContext)
  const { categories } = useContext(CategoryContext)
  const { arrivals } = useContext(ArrivalContext)

  // local state
  const [openModal, setOpenModal] = useState(false)
  const [category, setCategory] = useState('')
  const [sizeFormat, setSizeFormat] = useState('number')
  const [items, setItems] = useState([
    {
      size: '',
      price: '',
      quantity: ''
    }
  ])
  const [arrivalFilter, setArrivalFilter] = useState('')
  const [selectedArrival, setSelectedArrival] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  function onCloseModal() {
    setOpenModal(false)
    setCategory('')
    setSizeFormat('number')
    setItems([
      {
        size: '',
        price: '',
        quantity: ''
      }
    ])
    setArrivalFilter('')
    setSelectedArrival('')
    setShowDropdown(false)
  }

  const handleAddProduct = (event) => {
    event.preventDefault()
    addProduct({
      category,
      items,
      arrival: selectedArrival
    })
    onCloseModal()
  }

  const addItem = () => {
    setItems([...items, { size: '', price: '', quantity: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value }
      }
      return item
    })
    setItems(newItems)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const isFormValid = () => {
    if (!category) return false
    for (let item of items) {
      if (!item.size || !item.price || !item.quantity) {
        return false
      }
    }
    return true
  }

  const filteredArrivals = arrivals.filter((arrival) =>
    arrival.name.toLowerCase().includes(arrivalFilter.toLowerCase())
  )

  const handleArrivalSelect = (arrival) => {
    setSelectedArrival(arrival._id)
    setArrivalFilter(arrival.name)
    setShowDropdown(false)
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="h-12 hover:opacity-75 row-span-1 justify-self-end text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center m-2"
      >
        <IoMdAdd className="mr-2" size={28} />
        Ajouter des produits
      </button>
      <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un produit
            </h3>
            <div>
              <div className="mb-2 block relative">
                <Label htmlFor="arrivalFilter" value="Arrivage" />
                <TextInput
                  id="arrivalFilter"
                  placeholder="Commencez à taper pour rechercher..."
                  value={arrivalFilter}
                  onChange={(event) => {
                    setArrivalFilter(event.target.value)
                    setShowDropdown(true)
                  }}
                />
                {arrivalFilter && showDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 text-black">
                    {filteredArrivals.map((arrival) => (
                      <div
                        key={arrival._id}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleArrivalSelect(arrival)}
                      >
                        {arrival.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Format de taille" />
              </div>
              <div className="flex space-x-4">
                <Radio
                  id="number"
                  name="sizeFormat"
                  value="number"
                  checked={sizeFormat === 'number'}
                  onChange={() => setSizeFormat('number')}
                />
                <Label htmlFor="number" value="Numérique" />
                <Radio
                  id="letter"
                  name="sizeFormat"
                  value="letter"
                  checked={sizeFormat === 'letter'}
                  onChange={() => setSizeFormat('letter')}
                />
                <Label htmlFor="letter" value="Lettre" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <Label value="Taille, Quantité et Prix" />
                <Button onClick={addItem}>Ajouter une taille</Button>
              </div>
              {items.map((item, index) => (
                <div className="flex items-center space-x-4 mb-2" key={index}>
                  <Select
                    id={`size-${index}`}
                    required
                    value={item.size}
                    onChange={(event) => updateItem(index, 'size', event.target.value)}
                  >
                    <option value="">Sélectionner une taille</option>
                    {sizeFormat === 'number'
                      ? numberSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))
                      : letterSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                  </Select>
                  <TextInput
                    id={`quantity-${index}`}
                    placeholder="quantité"
                    value={item.quantity}
                    onChange={(event) => updateItem(index, 'quantity', event.target.value)}
                    required
                  />
                  <TextInput
                    id={`price-${index}`}
                    placeholder="prix"
                    value={item.price}
                    onChange={(event) => updateItem(index, 'price', event.target.value)}
                    required
                  />

                  <button onClick={() => removeItem(index)}>
                    <TiDelete size={40} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleAddProduct} className="w-48" disabled={!isFormValid()}>
                Ajouter
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddDialog
