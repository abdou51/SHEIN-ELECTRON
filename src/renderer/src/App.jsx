import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Arrivals from '../src/pages/Arrivals'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Products from './pages/Products'
import { CategoryProvider } from './context/categoryContext'
import { ArrivalProvider } from './context/arrivalContext'
import { ProductProvider } from './context/productContext'
import { CartProvider } from './context/cartContext'
import { UserProvider } from './context/userContext'
import { OrderProvider } from './context/orderContext'
import { ToastProvider } from './context/toastContext'

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <CartProvider>
            <OrderProvider>
              <ArrivalProvider>
                <CategoryProvider>
                  <ProductProvider>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/arrivals" element={<Arrivals />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/products" element={<Products />} />
                    </Routes>
                  </ProductProvider>
                </CategoryProvider>
              </ArrivalProvider>
            </OrderProvider>
          </CartProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
