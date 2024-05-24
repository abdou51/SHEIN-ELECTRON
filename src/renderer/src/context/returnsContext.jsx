import { createContext, useState } from 'react'
import axios from '../api/axios'

export const ReturnsContext = createContext()

export const ReturnsProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState()
  const [barcode, setBarcode] = useState('')
  const [selectedItem, setSelectedItem] = useState({})
  const [productBarcode, setProductBarcode] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const handleSetProductExchange = async (barcode) => {
    setProductBarcode(barcode)
    console.log(barcode.length)
    if (barcode.length === 9) {
      try {
        const response = await axios.get(`/products/single?barcode=${barcode}`)
        if (response.status === 200) {
          const newProduct = response.data
          const updatedOrderItems = selectedOrder.orderItems.map((item) =>
            item._id === selectedItem._id
              ? {
                  ...item,
                  exchanged: true,
                  exchangeDetails: {
                    newProduct: newProduct._id,
                    sellPrice: newProduct.sellPrice,
                    name: newProduct.name
                  }
                }
              : item
          )
          setSelectedOrder((prevOrder) => ({
            ...prevOrder,
            orderItems: updatedOrderItems
          }))
        }
        setProductBarcode('')
        setOpenModal(false)
      } catch (error) {
        setProductBarcode('')
        setOpenModal(false)
        console.error('Error fetching product:', error)
      }
    }
  }

  const handleSetBarcode = async (barcode) => {
    setBarcode(barcode)
    try {
      const response = await axios.get(`/orders/single?reference=${barcode}`)
      if (response.status === 200) {
        const order = response.data
        setSelectedOrder(order)
        console.log('order', order)
      }
      setBarcode('')
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const markItemAsReturned = (itemId) => {
    if (selectedOrder) {
      const updatedOrderItems = selectedOrder.orderItems.map((item) =>
        item._id === itemId ? { ...item, returned: !item.returned } : item
      )
      console.log('orderItems', updatedOrderItems)
      setSelectedOrder((prevOrder) => ({
        ...prevOrder,
        orderItems: updatedOrderItems
      }))
    }
  }

  return (
    <ReturnsContext.Provider
      value={{
        selectedOrder,
        barcode,
        handleSetBarcode,
        markItemAsReturned,
        productBarcode,
        setProductBarcode,
        selectedItem,
        setSelectedItem,
        handleSetProductExchange,
        openModal,
        setOpenModal
      }}
    >
      {children}
    </ReturnsContext.Provider>
  )
}
