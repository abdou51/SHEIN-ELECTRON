import { Button, Label, Modal, TextInput, Select } from 'flowbite-react'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext'
const SingleProductDiscountDialog = ({ onCloseModal, openModal, item }) => {
  // local reduction state
  const predefinedDiscounts = [10, 15, 20, 25, 30, 35, 40, 45, 50, 100]
  const [reductionPercentage, setReductionPercentage] = useState(0)

  const { carts, setCarts, selectedCart, setSelectedCart } = useContext(CartContext)

  const handleAddDiscount = () => {
    const updatedItem = {
      ...item,
      discount: reductionPercentage
    }
    const updatedItems = selectedCart.items.map((cartItem) =>
      cartItem._id === item._id ? updatedItem : cartItem
    )

    const updatedCart = {
      ...selectedCart,
      items: updatedItems
    }

    setSelectedCart(updatedCart)
    setCarts(carts.map((cart) => (cart.client === updatedCart.client ? updatedCart : cart)))

    setReductionPercentage(0)

    onCloseModal()
  }
  return (
    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Ajouter une reduction {item.name}
          </h3>
          <div className="grid grid-cols-3 gap-8">
            {predefinedDiscounts.map((discount) => (
              <div
                key={discount}
                className={`text-center  text-xl font-bold rounded-lg ${
                  reductionPercentage === discount
                    ? 'text-white bg-gray-800'
                    : 'text-black bg-gray-300'
                }`}
                onClick={() => setReductionPercentage(discount)}
              >
                <button className=" h-16 w-16">{discount} %</button>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Reduction (%)" />
            </div>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="prix"
              value={reductionPercentage}
              onChange={(event) => setReductionPercentage(Number(event.target.value))}
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <Button onClick={handleAddDiscount} className="w-48">
              Ajouter
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SingleProductDiscountDialog
