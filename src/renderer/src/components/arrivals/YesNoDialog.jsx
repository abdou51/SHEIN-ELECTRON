import { useState, useContext, useEffect } from 'react'
import { Button,  Modal,  } from 'flowbite-react'

const YesNoDialog = ({ onYes,onNo, yesNoDialogIsOpen }) => {
  

  return (
    <>
      <Modal show={yesNoDialogIsOpen} size="lg" onClose={onNo} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Êtes-vous sûr de vouloir supprimer cette arrivée?
                </h3>
            <div className="w-full flex justify-between">
              <Button onClick={()=>onYes()} className="w-48">
                Oui
              </Button>
              <Button onClick={()=>onNo()} className="w-48">
                Non
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default YesNoDialog
