import { createContext, useState, useEffect, useCallback } from 'react'
import axios from '../api/axios'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // filters State
  const [categoryFilter, setCategoryFilter] = useState('')

  // Fetch products from the server
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter) {
        params.append('category', categoryFilter._id)
        const response = await axios.get(`/products?${params}`)
        setProducts(response.data)
      }
    } catch (error) {
      console.error('Error fetching products', error)
    } finally {
      setLoading(false)
    }
  }, [categoryFilter])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        categoryFilter,
        setCategoryFilter
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
