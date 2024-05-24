import { Button, Label, Modal, TextInput, Select } from 'flowbite-react'
const VersementDialog = ({
  onCloseModal,
  openModal,
  versement,
  setVersement,
  phoneNumber,
  setPhoneNumber
}) => {
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
            <Button onClick={onCloseModal} className="w-48">
              Confirmer
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default VersementDialog
