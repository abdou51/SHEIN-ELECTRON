import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaTruckFront } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoLogOut, IoShirtSharp } from "react-icons/io5";

import { useContext } from "react";
import { UserContext } from "../context/userContext";
const Sidebar = () => {
  const { logout } = useContext(UserContext);
  return (
    <nav className="flex flex-col justify-between p-6 min-h-screen w-20 ">
      <Link to="/">
        <img src={logo} alt="" className="rounded-full" width={60} />
      </Link>
      <ul className="flex flex-col gap-8">
        <li>
          <Link to="/categories">
            <i className="flex justify-center items-center">
              <BiSolidCategory size={40} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <i className="flex justify-center items-center">
              <IoShirtSharp size={40} />
            </i>
          </Link>
        </li>
        <li>
          <Link to="/arrivals">
            <i className="flex justify-center items-center">
              <FaTruckFront size={40} />
            </i>
          </Link>
        </li>
      </ul>
      {/* <span>dsd</span> */}
      <Link onClick={logout}>
        <i className="flex justify-center items-center">
          <IoLogOut size={40} />
        </i>
      </Link>
    </nav>
  );
};

export default Sidebar;
