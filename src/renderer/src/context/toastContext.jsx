import React, { createContext, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'info') => {
    toast(message, { type })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position='bottom-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
