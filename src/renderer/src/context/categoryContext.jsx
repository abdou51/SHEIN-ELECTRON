import { createContext, useState, useEffect, useContext } from 'react'
import { useToast } from '../context/toastContext'
import axios from '../api/axios'

// Create the context
export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  // toast context
  const { showToast } = useToast()

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/categories')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Add a category
  const addCategory = async (category) => {
    try {
      const response = await axios.post('/categories', category) // Use axios instance
      setCategories((prevCategories) => [response.data, ...prevCategories])
      showToast('This is a toast notification!', 'success')
    } catch (error) {
      console.error('Error adding category:', error)
      showToast('This is a toast notification!', 'error')
    }
  }

  // Update a category
  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await axios.put(`/categories/${id}`, updatedCategory) // Use axios instance
      setCategories(
        categories.map((cat) => (cat._id === id ? response.data : cat))
      )
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/categories/${id}`) // Use axios instance
      setCategories(categories.filter((cat) => cat._id !== id))
      showToast('This is a toast notification!', 'success')
    } catch (error) {
      console.error('Error deleting category:', error)
      showToast('This is a toast notification!', 'error')
    }
  }

  // Provide the context
  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        loading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
