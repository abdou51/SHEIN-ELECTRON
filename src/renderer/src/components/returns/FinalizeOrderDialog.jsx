import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react'
const FinalizeOrderDialog = ({ onCloseModal, openModal, item }) => {
  // Local state for selected paper count
  const papersCount = [1, 2, 3, 4]
  const [selectedPaperCount, setSelectedPaperCount] = useState(2)

  const [versement, setVersement] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')

  const { carts, setCarts, selectedCart, setSelectedCart } = useContext(CartContext)

  return (
    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Ajouter un nombre de bons à imprimer
          </h3>
          <div className="grid grid-cols-2 gap-8">
            {papersCount.map((paper) => (
              <div
                key={paper}
                className={`text-center text-xl font-bold rounded-lg ${
                  selectedPaperCount === paper ? 'text-white bg-gray-800' : 'text-black bg-gray-300'
                }`}
                onClick={() => setSelectedPaperCount(paper)}
              >
                <button className="h-16 w-16">{paper}</button>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un versement
            </h3>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Versement"
              value={versement}
              onChange={(event) => setVersement(Number(event.target.value))}
              required
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un numero de telephone
            </h3>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Numero de telephone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-end">
            {/* <Button onClick={handleAddDiscount} className="w-48">
              Ajouter
            </Button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FinalizeOrderDialog
