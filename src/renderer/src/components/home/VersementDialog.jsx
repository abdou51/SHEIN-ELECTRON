import { Button, Modal, TextInput } from 'flowbite-react'
import { useContext } from 'react'
import { CartContext } from '../../context/cartContext'

const VersementDialog = ({ onCloseModal, openModal }) => {
  const { addVersement, selectedCart } = useContext(CartContext)

  const handleVersementChange = (event) => {
    const newVersement = Number(event.target.value)
    addVersement(newVersement, selectedCart.phoneNumber, selectedCart.note)
  }

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value
    addVersement(selectedCart.versement, newPhoneNumber, selectedCart.note)
  }

  const handleNoteChange = (event) => {
    const newNote = event.target.value
    addVersement(selectedCart.versement, selectedCart.phoneNumber, newNote)
  }

  return (
    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un versement
            </h3>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Versement"
              value={selectedCart.versement}
              onChange={handleVersementChange}
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
              value={selectedCart.phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter une note</h3>
            <TextInput
              type="richtext"
              autoComplete="off"
              placeholder="Note"
              value={selectedCart.note}
              onChange={handleNoteChange}
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              onClick={() => {
                onCloseModal()
              }}
              className="w-48"
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default VersementDialog
