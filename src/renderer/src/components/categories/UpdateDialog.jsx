import { useState, useContext, useEffect } from 'react'

import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { CategoryContext } from '../../context/categoryContext'
const UpdateDialog = ({ updateDialogIsOpen, onCloseDialog, category }) => {
  useEffect(() => {
    setName(category?.name ?? '')
  }, [category, updateDialogIsOpen])
  const [name, setName] = useState(category?.name)
  const { updateCategory } = useContext(CategoryContext)
  const handleUpdateCategory = (event) => {
    event.preventDefault()
    updateCategory(category?._id, { name })
    onCloseDialog()
  }
  return (
    <>
      <Modal show={updateDialogIsOpen} size="2xl" onClose={onCloseDialog} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Modifier une categorie
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nom" />
              </div>
              <TextInput
                id="name"
                autoComplete="off"
                placeholder="nom"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="w-full flex justify-end">
              <Button onClick={handleUpdateCategory} className="w-48">
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
