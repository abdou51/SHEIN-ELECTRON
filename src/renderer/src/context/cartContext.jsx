import { createContext, useState } from 'react'
import axios from '../api/axios'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([{ client: 0, items: [] }])

  const [selectedCart, setSelectedCart] = useState({ ...carts[0], client: 0 })
  const [barcode, setBarcode] = useState('')

  const updateSelectedCart = (cartIndex, updatedItems) => {
    if (selectedCart.client === cartIndex) {
      setSelectedCart((prevSelectedCart) => ({
        ...prevSelectedCart,
        items: updatedItems
      }))
    }
  }
  const addItemToCart = (cartIndex, product) => {
    setCarts((prevCarts) => {
      const newCarts = [...prevCarts]
      const existingItems = newCarts[cartIndex].items
      const itemExists = existingItems.some((item) => item._id === product._id)

      if (!itemExists) {
        existingItems.push({ ...product, discount: 0 })

        updateSelectedCart(cartIndex, existingItems)
      }

      return newCarts
    })
  }

  const handleSetBarcode = async (barcode) => {
    setBarcode(barcode)
    if (barcode.length === 9) {
      try {
        const response = await axios.get(`/products/single?barcode=${barcode}`)
        if (response.status === 200) {
          const product = response.data
          addItemToCart(selectedCart.client, product)
        }
        setBarcode('')
      } catch (error) {
        setBarcode('')
        console.error('Error fetching products:', error)
      }
    }
  }

  const removeItemFromCart = (cartIndex, productId) => {
    setCarts((prevCarts) => {
      const newCarts = [...prevCarts]
      const updatedItems = newCarts[cartIndex].items.filter((item) => item._id !== productId)
      newCarts[cartIndex].items = updatedItems

      updateSelectedCart(cartIndex, updatedItems)
      return newCarts
    })
  }

  const createNewCart = () => {
    setCarts((prevCarts) => [
      ...prevCarts,
      {
        client: prevCarts.length, // Assign client based on the current length of the array
        items: []
      }
    ])
  }

  const deleteCart = (cartIndex) => {
    setCarts((prevCarts) => [...prevCarts.slice(0, cartIndex), ...prevCarts.slice(cartIndex + 1)])
  }

  return (
    <CartContext.Provider
      value={{
        carts,
        addItemToCart,
        removeItemFromCart,
        createNewCart,
        deleteCart,
        selectedCart,
        setSelectedCart,
        barcode,
        handleSetBarcode,
        setCarts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
