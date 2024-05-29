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

  const printSingleSticker = (product) => {
    const options = {
      preview: true,
      copies: 1,
      margin: '0 0 0 0',
      printerName: 'XP-80C',
      silent: true,
      pageSize: '40mm'
    }

    const dataToPrint = [
      {
        type: 'text',
        value: product.name.slice(0, -10),
        style: { fontSize: '15px', fontWeight: '800', textAlign: 'left' }
      },
      {
        type: 'text',
        value: `${product.sellPrice} DZD`,
        style: { fontSize: '15px', fontWeight: '800', textAlign: 'left' }
      },
      {
        type: 'barCode',
        value: product.barcode,
        height: 18,
        width: 1,
        fontsize: 12,
        displayValue: true,
        style: { fontSize: '16px', fontWeight: '800', textAlign: 'left' }
      }
    ]

    window.electron.ipcRenderer.send('print-stickers', dataToPrint, options)
  }

  const handlePrint = (products) => {
    const options = {
      preview: true,
      copies: 1,
      margin: '0 0 0 0',
      printerName: 'XP-80C',
      silent: true,
      pageSize: '40mm'
    }

    products.forEach((product) => {
      const dataToPrint = [
        {
          type: 'text',
          value: product.name.slice(0, -10),
          style: { fontSize: '15px', fontWeight: '800', textAlign: 'left' }
        },
        {
          type: 'text',
          value: `${product.sellPrice} DZD`,
          style: { fontSize: '15px', fontWeight: '800', textAlign: 'left' }
        },
        {
          type: 'barCode',
          value: product.barcode,
          height: 18,
          width: 1,
          fontsize: 12,
          displayValue: true,
          style: { fontSize: '16px', fontWeight: '800', textAlign: 'left' }
        }
      ]

      window.electron.ipcRenderer.send('print-stickers', dataToPrint, options)
    })
  }

  const addProduct = async (product) => {
    setLoading(true)
    try {
      const response = await axios.post('/products', product)
      handlePrint(response.data)
      showToast('Produits Ajoutées avec success', 'success')
      fetchProducts()
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

      showToast('Produit modifié avec success', 'success')
    } catch (error) {
      console.error('Error updating product:', error)
      showToast('Erreur lors de la modification du produit', 'error')
    }
  }

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.put(`/products/${id}`, { isDrafted: true })
      setProducts(products.filter((arr) => arr._id !== id))
      showToast('Produit supprimé avec success', 'success')
    } catch (error) {
      console.error('Error deleting product:', error)
      showToast('Erreur lors de la suppression du produit', 'error')
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
        handleBarcodefilter,
        printSingleSticker
      }}
    >
      {children}
    </ProductPageContext.Provider>
  )
}
