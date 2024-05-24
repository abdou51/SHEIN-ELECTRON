import { useState, useContext } from 'react'

import {
  Button,
  Label,
  Modal,
  TextInput,
  Datepicker,
  Select,
} from 'flowbite-react'
import { IoMdAdd } from 'react-icons/io'

import { CategoryContext } from '../../context/categoryContext'

const AddDialog = () => {
  // context state
  const { addCategory } = useContext(CategoryContext)

  // local state
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState('')

  function onCloseModal() {
    setOpenModal(false)
    setName('')
  }

  const handleAddCategory = (event) => {
    event.preventDefault()
    addCategory({
      name,
    })
    onCloseModal()
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type='button'
        className='h-12 hover:opacity-75 row-span-1 justify-self-end text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center m-2'
      >
        <IoMdAdd className='mr-2' size={28} />
        Ajouter une categorie
      </button>
      <Modal show={openModal} size='5xl' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              Ajouter une categorie
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Nom' />
              </div>
              <TextInput
                id='name'
                autoComplete='off'
                placeholder='nom'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className='w-full flex justify-end'>
              <Button onClick={handleAddCategory} className='w-48'>
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
