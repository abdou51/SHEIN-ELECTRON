import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import Arrivals from '../src/pages/Arrivals'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Returns from './pages/Returns'
import { CategoryProvider } from './context/categoryContext'
import { ArrivalProvider } from './context/arrivalContext'
import { ProductProvider } from './context/productContext'
import { ProductPageProvider } from './context/productPageContext'
import { CartProvider } from './context/cartContext'
import { UserProvider } from './context/userContext'
import { OrderProvider } from './context/orderContext'
import { ReturnsProvider } from './context/returnsContext'
import { ToastProvider } from './context/toastContext'

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <CartProvider>
            <ReturnsProvider>
              <OrderProvider>
                <ArrivalProvider>
                  <CategoryProvider>
                    <ProductPageProvider>
                      <ProductProvider>
                        <Routes>
                          <Route path="/login" element={<Login />} />
                          <Route path="/" element={<Home />} />
                          <Route path="/arrivals" element={<Arrivals />} />
                          <Route path="/categories" element={<Categories />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/returns" element={<Returns />} />
                        </Routes>
                      </ProductProvider>
                    </ProductPageProvider>
                  </CategoryProvider>
                </ArrivalProvider>
              </OrderProvider>
            </ReturnsProvider>
          </CartProvider>
        </UserProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
