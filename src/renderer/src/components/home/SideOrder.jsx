import { FaPlus } from 'react-icons/fa'
import { GiPayMoney } from 'react-icons/gi'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaDeleteLeft } from 'react-icons/fa6'
import { FaReceipt } from 'react-icons/fa'
import { FaMoneyBillWave } from 'react-icons/fa'

import { useContext, useState } from 'react'

import { CartContext } from '../../context/cartContext'
import { OrderContext } from '../../context/orderContext'

import SingleProductDiscountDialog from './SingleProductDiscountDialog'
import ReceiptNum from './ReceiptNum'
import VersementDialog from './VersementDialog'

const SideOrder = () => {
  const {
    carts,
    createNewCart,
    deleteCart,
    selectedCart,
    setSelectedCart,
    removeItemFromCart,
    emptyAndDeleteSelectedCart
  } = useContext(CartContext)
  const { createOrder, loading } = useContext(OrderContext)

  // single product discount dialog state
  const [openModal, setOpenModal] = useState(false)
  const [openReceiptNumDialog, setOpenReceiptNumDialog] = useState(false)
  const [openVersementDialog, setOpenVersementDialog] = useState(false)

  const [selectedItem, setSelectedItem] = useState({})
  const [selectedPaperCount, setSelectedPaperCount] = useState(2)

  // close modal state
  function onCloseModal() {
    setOpenModal(false)
  }
  function onCloseReceiptNumDialog() {
    setOpenReceiptNumDialog(false)
  }
  function onCloseVersementDialog() {
    setOpenVersementDialog(false)
  }

  return (
    <aside className="col-span-1 h-screen flex justify-between divide-x">
      <div className="p-2 flex flex-col justify-between w-[325px]">
        <div className="flex justify-between">
          <div className="gap-2 flex">
            <span onClick={() => emptyAndDeleteSelectedCart()} className="p-1 hover:cursor-pointer">
              <IoIosCloseCircle size={70} color="red" />
            </span>
          </div>
          <h1 className="h2 flex justify-center items-center">Client {selectedCart.client + 1}</h1>
        </div>
        <div className="flex justify-between gap-2 h-16">
          <div
            className="border border-1 text-white rounded-md  p-2 flex items-center  text-center gap-1"
            onClick={() => setOpenReceiptNumDialog(true)}
          >
            <FaReceipt size={25} color="white" />
            Num Bons : {selectedPaperCount}
          </div>
          <ReceiptNum
            openModal={openReceiptNumDialog}
            onCloseModal={onCloseReceiptNumDialog}
            selectedPaperCount={selectedPaperCount}
            setSelectedPaperCount={setSelectedPaperCount}
          />
          <div
            className="border border-1 text-white rounded-md  p-1 flex items-center text-center"
            onClick={() => setOpenVersementDialog(true)}
          >
            <FaMoneyBillWave size={30} color="white" />
            <h1>Versement:</h1>
            <h1>
              {selectedCart.versement}
              <sup>
                <small>DA</small>
              </sup>
            </h1>
          </div>
          <VersementDialog openModal={openVersementDialog} onCloseModal={onCloseVersementDialog} />
        </div>
        <div className="overflow-auto hide-scrollbar h-[20rem] font-bold text-left">
          <ul>
            {selectedCart.items.map((item) => (
              <li
                key={item._id}
                className="flex justify-between mt-4 hover:cursor-pointer items-center border p-2 rounded"
              >
                <div onClick={() => removeItemFromCart(selectedCart.client, item._id)}>
                  <FaDeleteLeft className="transform rotate-180 mr-4" size={36} color="red" />
                </div>
                <div
                  className="flex justify-between items-center w-full gap-2 hover:cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item)
                    setOpenModal(true)
                  }}
                >
                  <h3 className="h7">{item.name.slice(0, -10)}</h3>

                  <div className="flex flex-col">
                    <span
                      className={`${item.discount > 0 && 'line-through decoration-2 decoration-red-500'}`}
                    >
                      {item.sellPrice}
                      <sup>
                        <small>DA</small>
                      </sup>
                    </span>
                    {item.discount > 0 && (
                      <>
                        <h3 className="text-right"> - {item.discount}% </h3>
                        <span className="text-right">
                          {item.sellPrice - (item.sellPrice / 100) * item.discount}
                          <sup>
                            <small>DA</small>
                          </sup>
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <SingleProductDiscountDialog
                  openModal={openModal}
                  item={selectedItem}
                  onCloseModal={onCloseModal}
                />
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="w-full items-center flex flex-col">
          <div className="w-full flex justify-between text-3xl font-bold ">
            <h3 className="">Total</h3>
            <span>
              {selectedCart.items.reduce(
                (acc, item) => acc + item.sellPrice - (item.sellPrice / 100) * item.discount,
                0
              )}
              <sup>
                <small>DA</small>
              </sup>
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            createOrder(selectedCart, selectedPaperCount)
            setTimeout(() => {}, 1000)
            emptyAndDeleteSelectedCart()
          }}
          disabled={selectedCart.items.length === 0 || loading}
          className="bg-cyan-700 h-20 text-4xl text-bold rounded-b-2xl grotesk flex items-center justify-center gap-2 hover:opacity-75"
        >
          Payer <GiPayMoney size={50} />
        </button>
      </div>
      <nav className="overflow-y-auto hide-scrollbar p-1">
        <ul className="">
          <li
            onClick={createNewCart}
            className="flex justify-center items-center w-24 h-24 border rounded-full border-gray-500 hover:cursor-pointer"
          >
            <FaPlus size={50} />
          </li>
          {carts.map((cart, index) => (
            <li
              onClick={() => setSelectedCart({ ...cart, client: index })}
              className={`flex mt-2 justify-center items-center w-24 h-24 border rounded-full border-gray-500 hover:cursor-pointer ${
                index === selectedCart.client ? 'bg-cyan-700' : ''
              }`}
              key={index}
            >
              <div className="flex flex-col gap-1 items-center text-center font-bold p-1">
                <h2 className="h6">Client {index + 1}</h2>
                <span>
                  {cart.items.reduce(
                    (acc, item) => acc + item.sellPrice - (item.sellPrice / 100) * item.discount,
                    0
                  )}
                  <sup className="ml-1">
                    <small>DA</small>
                  </sup>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideOrder
