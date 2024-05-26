import { useState, useContext, useEffect } from 'react'
import { Button, Label, Modal, TextInput, Select, Radio } from 'flowbite-react'
import { ProductPageContext } from '../../context/productPageContext'

const UpdateDialog = ({ product, onCloseDialog, updateDialogIsOpen }) => {
  // context state
  const { updateProduct } = useContext(ProductPageContext)

  useEffect(() => {
    setSellPrice(product?.sellPrice ?? '')
  }, [product, updateDialogIsOpen])

  // local state
  const [sellPrice, setSellPrice] = useState(product?.sellPrice)

  useEffect(() => {
    setSellPrice(product?.sellPrice ?? '')
  }, [product])

  const handleUpdateProduct = (event) => {
    event.preventDefault()
    updateProduct(product?._id, product?.barcode, { sellPrice })
    onCloseDialog()
  }

  return (
    <>
      <Modal show={updateDialogIsOpen} size="lg" onClose={onCloseDialog} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier le prix</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Prix" />
              </div>
              <TextInput
                id="price"
                type="number"
                placeholder="prix"
                value={sellPrice}
                onChange={(event) => setSellPrice(event.target.value)}
                required
              />
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleUpdateProduct} className="w-48" disabled={!sellPrice}>
                Modifier
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UpdateDialog
