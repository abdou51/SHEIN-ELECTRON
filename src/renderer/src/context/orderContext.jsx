import { createContext, useState } from 'react'
import axios from '../api/axios'

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [loading, setIsLoading] = useState(false)
  const createOrder = async (order) => {
    try {
      setIsLoading(true)
      const parsedOrder = {
        phone: 'Phone number here',
        total: order.items.reduce((acc, item) => acc + item.sellPrice, 0),
        orderItems: order.items.map((item) => ({
          product: item._id,
          sellPrice: item.sellPrice
        }))
      }
      console.log(parsedOrder)
      await axios.post('/orders', parsedOrder)
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
