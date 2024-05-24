import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react'

const ReceiptNum = ({ selectedPaperCount, openModal, setSelectedPaperCount, onCloseModal }) => {
  // Local state for selected paper count
  const papersCount = [1, 2, 3, 4]

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

export default ReceiptNum
