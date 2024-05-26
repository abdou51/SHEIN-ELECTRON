import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import axios from '../api/axios'
import { useToast } from '../context/toastContext'
export const ProductPageContext = createContext()

export const ProductPageProvider = ({ children }) => {
  // toaster context
  const { showToast } = useToast()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState('')
  const [barcode, setBarcode] = useState('')

  // Fetch products from the server
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter) {
        params.append('category', categoryFilter)
        const response = await axios.get(`/products?${params}`)
        setProducts(response.data)
      } else {
        setProducts([])
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

  const addProduct = async (product) => {
    setLoading(true)
    try {
      const response = await axios.post('/products', product)
      showToast('Produits Ajoutées avec success', 'success')
      setProducts(response.data)
    } catch (error) {
      console.error('Error adding product:', error)
      showToast("Erreur lors de l'ajout des produits", 'error')
    } finally {
      setLoading(false)
    }
  }

  // Update a product
  const updateProduct = async (id, barcode, product) => {
    try {
      const response = await axios.put(`/products/${id}`, product)
      handleBarcodefilter(barcode)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.put(`/products/${id}`, { isDrafted: true })
      setProducts(products.filter((arr) => arr._id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleBarcodefilter = async (barcode) => {
    setBarcode(barcode)
    if (barcode.length === 9) {
      try {
        const response = await axios.get(`/products/single?barcode=${barcode}`)
        if (response.status === 200) {
          const product = response.data
          setProducts([product])
        } else {
          setProducts([]) // Clear products if no match is found
        }
      } catch (error) {
        setProducts([]) // Clear products if there's an error
        console.error('Error fetching product:', error)
      } finally {
        setBarcode('') // Reset barcode state regardless of outcome
      }
    }
  }

  return (
    <ProductPageContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        fetchProducts,
        categoryFilter,
        setCategoryFilter,
        barcode,
        setBarcode,
        handleBarcodefilter
      }}
    >
      {children}
    </ProductPageContext.Provider>
  )
}
