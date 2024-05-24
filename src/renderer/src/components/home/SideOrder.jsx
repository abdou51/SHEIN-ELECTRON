import { FaPlus } from 'react-icons/fa'
import { GiPayMoney } from 'react-icons/gi'
import { IoIosCloseCircle } from 'react-icons/io'
import { FaDeleteLeft } from 'react-icons/fa6'

import { useContext, useState, useEffect } from 'react'

import { CartContext } from '../../context/cartContext'
import { OrderContext } from '../../context/orderContext'

import SingleProductDiscountDialog from './SingleProductDiscountDialog'
const SideOrder = () => {
  const { carts, createNewCart, deleteCart, selectedCart, setSelectedCart, removeItemFromCart } =
    useContext(CartContext)
  const { createOrder, loading } = useContext(OrderContext)

  // single product discount dialog state
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  function onCloseModal() {
    setOpenModal(false)
  }

  useEffect(() => {
    console.log(openModal)
  }, [openModal])

  return (
    <aside className="col-span-1 h-screen flex justify-between divide-x">
      <div className="p-2 flex flex-col justify-between w-[325px]">
        <div className="flex justify-between">
          <div className="gap-2 flex">
            <span
              onClick={() => {
                if (selectedCart.client === 0) {
                  return
                }
                deleteCart(selectedCart.client)
                setSelectedCart({ ...carts[0], client: 0 })
              }}
              className="p-1 hover:cursor-pointer"
            >
              <IoIosCloseCircle size={70} color="red" />
            </span>
          </div>
          <h1 className="h2 flex justify-center items-center">Client {selectedCart.client + 1}</h1>
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
                  className=" flex justify-between items-center"
                  onClick={() => {
                    setSelectedItem(item)
                    setOpenModal(true)
                  }}
                >
                  <h3 className="h7">{item.name}</h3>

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
        <div className="w-full">
          <div className="flex justify-between">
            <h3 className="h3">Subtotal</h3>
            <span>
              {selectedCart.items.reduce((acc, item) => acc + item.sellPrice, 0)}
              <sup>
                <small>DA</small>
              </sup>
            </span>
          </div>
          <div className="flex justify-between">
            <h3 className="h3">Réduction</h3>
            <span>
              {selectedCart.discount}
              <span>%</span>
            </span>
          </div>
          <div className="flex justify-between">
            <h3 className="h3">Total</h3>
            <span>
              {selectedCart.items.reduce((acc, item) => acc + item.sellPrice, 0) *
                (1 - selectedCart.discount / 100)}
              <sup>
                <small>DA</small>
              </sup>
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            createOrder(selectedCart)
            setSelectedCart({ ...carts[0], client: 0 })
          }}
          disabled={selectedCart.items.length === 0 || loading}
          className="bg-cyan-700 h-20 text-3xl text-bold rounded-b-2xl grotesk flex items-center justify-center gap-2 hover:opacity-75"
        >
          Checkout <GiPayMoney size={50} />
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
                  {cart.items.reduce((acc, item) => acc + item.sellPrice, 0)}
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
