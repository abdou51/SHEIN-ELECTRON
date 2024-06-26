import shirt from '../../assets/shirt.png'
import { MdBarcodeReader } from 'react-icons/md'
import { CategoryContext } from '../../context/categoryContext'
import { ProductContext } from '../../context/productContext'
import { ReturnsContext } from '../../context/returnsContext'
import { GiClothes } from 'react-icons/gi'

import { useContext, useState } from 'react'
const Main = () => {
  const { barcode, handleSetBarcode, resetOrder } = useContext(ReturnsContext);
 
  return (
    <>
      <section className="p-2 w-full">
        <div className="items-center justify-end flex">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MdBarcodeReader size={25} />
            </div>
          </div>

          <input
            type="text"
            autoComplete="off"
            id="default-search"
            className="block w-full p-4 ps-10 text-xl text-white h-20 rounded bg-[#4f4f4f]   "
            placeholder="Code Barre"
            value={barcode}
            onChange={(e) => handleSetBarcode(e.target.value)}
          />
          <button
            onClick={resetOrder}
            className="ml-4 border border-white rounded-md p-4 hover:bg-cyan-500 bg-gray-500"
          >
            Réinitialiser
          </button>
        </div>
      </section>
     
    </>
  )
}

export default Main
