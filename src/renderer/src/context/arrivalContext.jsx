import { createContext, useState, useEffect, useCallback, useRef } from 'react'
import axios from '../api/axios'

import { useToast } from '../context/toastContext'

export const ArrivalContext = createContext()

export const ArrivalProvider = ({ children }) => {
  // toast context
  const { showToast } = useToast()

  // arrivaks state
  const [arrivals, setArrivals] = useState([])
  const [loading, setLoading] = useState(false)

  // filters State
  const [nameFilter, setNameFilter] = useState('')
  const startDateFilter = useRef()
  const endDateFilter = useRef()

  // Fetch arrivals from the server
  const setStartDateFilter = (newDate) => {
    startDateFilter.current = newDate;
  }
  const setEndDateFilter = (newDate) => {
    endDateFilter.current = newDate;
  }
  const fetchArrivals = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (nameFilter) params.append('name', nameFilter)
      if (startDateFilter.current) params.append('startDate', startDateFilter.current)
      if (endDateFilter.current) params.append('endDate', endDateFilter.current)
      const response = await axios.get(`/arrivals?${params}`)
      setArrivals(response.data)
    } catch (error) {
      console.error('Error fetching arrivals:', error)
    } finally {
      setLoading(false)
    }
  }, [nameFilter,])

  useEffect(() => {
    fetchArrivals()
  }, [fetchArrivals])

  // Add an arrival
  const addArrival = async (arrival) => {
    try {
      const response = await axios.post('/arrivals', arrival)
      fetchArrivals()
      showToast('Arrivage crée avec success', 'success')
    } catch (error) {
      console.error('Error adding arrival:', error)
      showToast("Erreur lors de la création de l'arrivage", 'error')
    }
  }

  // Update an arrival
  const updateArrival = async (id, updatedArrival) => {
    try {
      const response = await axios.put(`/arrivals/${id}`, updatedArrival)
      setArrivals(arrivals.map((arr) => (arr._id === id ? response.data : arr)))
      showToast('Arrival modifié avec success', 'success')
    } catch (error) {
      console.error('Error updating arrival:', error)
      showToast("Erreur lors de la modification de l'arrivage", 'error')
    }
  }

  // Delete an arrival
  const deleteArrival = async (id) => {
    try {
      await axios.delete(`/arrivals/${id}`)
      setArrivals(arrivals.filter((arr) => arr._id !== id))
      showToast('Arrivage supprimé avec success', 'success')
    } catch (error) {
      console.error('Error deleting arrival:', error)
      showToast("Erreur lors de la suppression de l'arrivage", 'error')
    }
  }

  return (
    <ArrivalContext.Provider
      value={{
        arrivals,
        addArrival,
        updateArrival,
        deleteArrival,
        loading,
        fetchArrivals,
        nameFilter,
        setNameFilter,
        startDateFilter,
        setStartDateFilter,
        endDateFilter,
        setEndDateFilter
      }}
    >
      {children}
    </ArrivalContext.Provider>
  )
}
