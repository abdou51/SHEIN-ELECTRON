// icons import
import { GiPayMoney } from 'react-icons/gi'
import { PiKeyReturnFill } from 'react-icons/pi'
import { PiKeyReturnLight } from 'react-icons/pi'
import { FaExchangeAlt } from 'react-icons/fa'

import { useContext, useState, useEffect } from 'react'

// context import
import { CartContext } from '../../context/cartContext'
import { OrderContext } from '../../context/orderContext'
import { ReturnsContext } from '../../context/returnsContext'

import ExchangeProductDialog from './ExchangedProductDialog'
const SideOrder = () => {
  const { carts, createNewCart, deleteCart, selectedCart, setSelectedCart, removeItemFromCart } =
    useContext(CartContext)
  const { createOrder, loading } = useContext(OrderContext)

  const {
    selectedOrder,
    markItemAsReturned,
    selectedItem,
    setSelectedItem,
    openModal,
    setOpenModal
  } = useContext(ReturnsContext)

  // single product discount dialog state

  // close modal state
  function onCloseModal() {
    setOpenModal(false)
  }

  return (
    <aside className="flex justify-between divide-x   ">
      <div className="p-2 flex flex-col justify-between w-full">
        <h1>Bon : {selectedOrder?.reference}</h1>
        <h1>Date : {selectedOrder?.createdAt.slice(0, 10)}</h1>
        <h1>Heure : {selectedOrder?.createdAt.slice(11, 19)}</h1>
        <div className="overflow-auto hide-scrollbar h-[26rem] font-bold text-left">
          <ul className="mt-4 flex flex-col gap-4">
            {selectedOrder?.orderItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between hover:cursor-pointer items-center border p-2 rounded"
              >
                <div onClick={() => markItemAsReturned(item._id)}>
                  {item.returned ? (
                    <PiKeyReturnFill className="mr-4" size={50} color="cyan" />
                  ) : (
                    <PiKeyReturnLight className="mr-4" size={50} color="cyan" />
                  )}
                </div>
                <div className="flex justify-between items-center gap-8">
                  <h3 className="h7">{item.product.name}</h3>

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

                <div
                  className="ml-4"
                  onClick={() => {
                    setSelectedItem(item)
                    setOpenModal(true)
                  }}
                >
                  <FaExchangeAlt size={50} color="cyan" />
                </div>
                <div className="flex justify-between items-center w-[306px]">
                  <h3 className="h7">{item.exchangeDetails?.name}</h3>
                  <div className="flex flex-col">
                    <span>
                      {item.exchangeDetails?.sellPrice}
                      {item.exchangeDetails && (
                        <sup>
                          <small>DA</small>
                        </sup>
                      )}
                    </span>
                  </div>
                </div>
                <ExchangeProductDialog
                  openModal={openModal}
                  onCloseModal={onCloseModal}
                  item={selectedItem}
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
              {selectedOrder?.total}
              <sup>
                <small>DA</small>
              </sup>
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            createOrder(selectedCart, versement, phoneNumber)
            setSelectedCart({ items: [], client: 0 })
            setVersement(0)
            setPhoneNumber('')
          }}
          disabled={selectedCart.items.length === 0 || loading}
          className="bg-cyan-700 h-20 text-4xl text-bold rounded-b-2xl grotesk flex items-center justify-center gap-2 hover:opacity-75"
        >
          Payer <GiPayMoney size={50} />
        </button>
      </div>
    </aside>
  )
}

export default SideOrder
