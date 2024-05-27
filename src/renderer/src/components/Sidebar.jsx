import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { FaTruckFront } from 'react-icons/fa6'
import { BiSolidCategory } from 'react-icons/bi'
import { IoLogOut, IoShirtSharp } from 'react-icons/io5'
import { MdAssignmentReturned } from 'react-icons/md'

import { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Sidebar = () => {
  const { logout } = useContext(UserContext)
  const location = useLocation()

  const getIconColor = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-500'
  }

  return (
    <nav className="flex flex-col justify-between p-4 min-h-screen w-20">
      <Link to="/">
        <img src={logo} alt="" className="rounded-full" />
      </Link>
      <ul className="flex flex-col gap-8">
        <li>
          <Link to="/returns">
            <i className={`flex justify-center items-center ${getIconColor('/returns')}`}>
              <MdAssignmentReturned size={40} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <i className={`flex justify-center items-center ${getIconColor('/categories')}`}>
              <BiSolidCategory size={40} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <i className={`flex justify-center items-center ${getIconColor('/products')}`}>
              <IoShirtSharp size={40} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/arrivals">
            <i className={`flex justify-center items-center ${getIconColor('/arrivals')}`}>
              <FaTruckFront size={40} />
            </i>
          </Link>
        </li>
      </ul>
      <Link onClick={logout}>
        <i className={`flex justify-center items-center ${getIconColor('/')}`}>
          <IoLogOut size={40} />
        </i>
      </Link>
    </nav>
  )
}

export default Sidebar
