import { useContext, useState, useEffect } from 'react'
import { ProductPageContext } from '../../context/productPageContext'
import { IoIosCloseCircle } from 'react-icons/io'
import { BsFillPrinterFill } from 'react-icons/bs'
import YesNoDialog from './YesNoDialog'
import { MdEdit } from 'react-icons/md'

import UpdateDialog from '../products/UpdateDialog'

const Table = () => {
  const { products, deleteProduct, printSingleSticker } = useContext(ProductPageContext)

  // dialog state
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [yesNoDialogIsOpen, setYesNoDialogIsOpen] = useState(false)
  return (
    <section className="p-2">
      <div className=" h-[600px] overflow-y-auto hide-scrollbar rounded-lg">
        <h2 className="sticky h6 mt-2 underline underline-offset-4">
          {products.length} produit trouvé
        </h2>
        <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
          <div className="col-span-2">Nom</div>
          <div className="col-span-1">Categorie</div>
          <div className="col-span-1">Taille</div>
          <div className="col-span-2">Arrivage</div>
          <div className="col-span-1">Prix</div>
          <div className="col-span-1">Etiquette</div>
          <div className="col-span-1">Modifier</div>
          <div className="col-span-1">Supprimer</div>
        </div>
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-10 border-b px-4 py-3 gap-4 items-center"
          >
            <div className="col-span-2">{product.name}</div>
            <div className="col-span-1">{product.category?.name}</div>
            <div className="col-span-1">{product.size}</div>
            <div className="col-span-2">{product.arrival?.name}</div>
            <div className="col-span-1">
              {product.sellPrice}
              <sup>
                <small>DA</small>
              </sup>
            </div>
            <div className="col-span-1 flex justify-left">
              <button
                className="flex justify-left"
                onClick={() => {
                  printSingleSticker(product)
                }}
              >
                <BsFillPrinterFill color="cyan" size={40} />
              </button>
            </div>
            <div className="col-span-1 flex justify-left">
              <button
                className="flex justify-left"
                onClick={() => {
                  setSelectedProduct(product)
                  setUpdateDialogIsOpen(true)
                }}
              >
                <MdEdit color="cyan" size={40} />
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="flex justify-left"
                onClick={() => {
                  setSelectedProduct(product)
                  setYesNoDialogIsOpen(true)
                }}
              >
                <IoIosCloseCircle color="red" size={40} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <UpdateDialog
        product={selectedProduct}
        updateDialogIsOpen={updateDialogIsOpen}
        onCloseDialog={() => {
          setUpdateDialogIsOpen(false)
        }}
      />
      <YesNoDialog
        yesNoDialogIsOpen={yesNoDialogIsOpen}
        onNo={() => {
          setYesNoDialogIsOpen(false)
        }}
        onYes={() => {
          deleteProduct(selectedProduct?._id)
          setYesNoDialogIsOpen(false)
        }}
      />
    </section>
  )
}

export default Table
