import { useContext, useState } from 'react'
import { CategoryContext } from '../../context/categoryContext'
import { IoIosCloseCircle } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import UpdateDialog from './UpdateDialog'
const Table = () => {
  const { categories, deleteCategory } = useContext(CategoryContext)
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState()
  return (
    <>
      <section className="p-2">
        <div className=" h-[650px] overflow-y-auto hide-scrollbar rounded-lg">
          <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
            <div className="col-span-6">Nom</div>
            <div className="col-span-2 text-center">Stock</div>
            <div className="col-span-1 text-center">Modifier</div>
            <div className="col-span-1 text-center">Supprimer</div>
          </div>
          {categories.map((category) => (
            <div
              key={category._id}
              className="grid grid-cols-10 border-b px-6 py-4 gap-4 items-center"
            >
              <div className="col-span-6">{category.name}</div>
              <div className="col-span-2 text-center">{category.stock}</div>
              <div className="col-span-1 flex justify-center">
                <button
                  className="flex justify-center"
                  onClick={() => {
                    setSelectedCategory(category)
                    setUpdateDialogIsOpen(true)
                  }}
                >
                  <MdEdit color="cyan" size={40} />
                </button>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  className="flex justify-center "
                  onClick={() => deleteCategory(category._id)}
                >
                  <IoIosCloseCircle color="red" size={40} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <UpdateDialog
        category={selectedCategory}
        updateDialogIsOpen={updateDialogIsOpen}
        onCloseDialog={() => {
          setUpdateDialogIsOpen(false)
        }}
      />
    </>
  )
}

export default Table
