import { createContext, useState, useContext } from 'react'
import axios from '../api/axios'
import { UserContext } from '../context/userContext'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const { user } = useContext(UserContext)

  const [loading, setIsLoading] = useState(false)
  const createOrder = async (order, selectedPaperCount) => {
    try {
      setIsLoading(true)
      const parsedOrder = {
        versement: order.versement,
        phone: order.phoneNumber,
        note: order.note,
        total: order.items.reduce(
          (acc, item) => acc + item.sellPrice * (1 - item.discount / 100),
          0
        ),
        orderItems: order.items.map((item) => ({
          product: item._id,
          productName: item.name,
          sellPrice: item.sellPrice,
          discount: item.discount,
          finalPrice: item.sellPrice * (1 - item.discount / 100)
        }))
      }
      const createdOrder = await axios.post('/orders', parsedOrder)
      const date = createdOrder.data.createdAt
      const reference = createdOrder.data.reference.slice(1)
      parsedOrder.date = date
      parsedOrder.reference = reference
      parsedOrder.paperCount = selectedPaperCount
      parsedOrder.user = user
      const response = window.electron.ipcRenderer.send('print-request', parsedOrder)
    } catch (error) {
      console.error('Error adding arrival:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        loading
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
