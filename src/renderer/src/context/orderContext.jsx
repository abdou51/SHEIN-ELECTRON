import { createContext, useState } from 'react'
import axios from '../api/axios'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [loading, setIsLoading] = useState(false)
  const createOrder = async (order, versement, phoneNumber) => {
    try {
      setIsLoading(true)
      const parsedOrder = {
        versement: versement,
        phone: phoneNumber,
        total: order.items.reduce(
          (acc, item) => acc + item.sellPrice * (1 - item.discount / 100),
          0
        ),
        orderItems: order.items.map((item) => ({
          product: item._id,
          sellPrice: item.sellPrice,
          discount: item.discount,
          finalPrice: item.sellPrice * (1 - item.discount / 100)
        }))
      }
      await axios.post('/orders', parsedOrder)
      window.electron.ipcRenderer.send('print-request')
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
