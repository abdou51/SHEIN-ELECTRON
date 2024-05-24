import { Button, Label, Modal, TextInput, Select } from 'flowbite-react'
import { useState, useContext } from 'react'

import { ReturnsContext } from '../../context/returnsContext'
const ExchangeProductDialog = ({ onCloseModal, openModal, item }) => {
  const { productBarcode, setProductBarcode, handleSetProductExchange } = useContext(ReturnsContext)
  return (
    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Ajouter un Produit a echanger contre {item?.product?.name}
            </h3>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Code Barre"
              value={productBarcode}
              onChange={(event) => {
                handleSetProductExchange(event.target.value)
              }}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ExchangeProductDialog
