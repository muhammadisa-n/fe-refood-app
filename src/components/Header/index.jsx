import React, { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"
import AuthContext from "../../context/authContext"
import axios from "axios"
import DropdownButton from "../DropdownButton"
import profileImage from "@assets/userdefault.png"
import { FaShoppingCart } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5"
const Header = () => {
  const { loggedIn, getLoggedIn, user } = useContext(AuthContext)
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false)
  const navigate = useNavigate()
  const setActive = ({ isActive }) =>
    isActive
      ? "font-semibold text-center font-inter text-primary"
      : "font-semibold text-center text-black transition ease-in-out font-inter hover:text-secondary"

  const HandleLogout = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}` + "auth/logout", {
      withCredentials: true,
    })
    localStorage.removeItem("data-app")
    await getLoggedIn()
    navigate("/")
  }
  const menuItemsCustomer = [
    {
      title: "My Orders",
      to: "/my-orders",
    },
    {
      title: "My Profile",
      to: "/my-profile",
    },
    {
      title: "Logout",
      onClick: HandleLogout,
    },
  ]
  const menuItems = [
    {
      title: "My Dashboard",
      to: `/my-dashboard`,
    },
    {
      title: "My Profile",
      to: "/my-profile",
    },
    {
      title: "Logout",
      onClick: HandleLogout,
    },
  ]
  return (
    <>
      <nav className="sticky top-0 px-4 py-4 bg-white ">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <NavLink to="/" className="text-[26px] font-semibold font-inter">
              Refood App
            </NavLink>
            <div className="items-center justify-between hidden gap-3 md:flex">
              {loggedIn === false && (
                <>
                  <NavLink to="/" className={setActive}>
                    Home
                  </NavLink>
                  {/* <NavLink to="/recomendation" className={setActive}>
                    Recomendation
                  </NavLink> */}
                </>
              )}
              {loggedIn === true && user.role === "Customer" && (
                <>
                  <NavLink to="/" className={setActive}>
                    Home
                  </NavLink>
                  <NavLink to="/recomendation" className={setActive}>
                    Recomendation
                  </NavLink>
                  <NavLink to="/carts" className={setActive}>
                    <FaShoppingCart size={20} />
                  </NavLink>
                </>
              )}
            </div>
            <div className="items-center justify-between hidden gap-2 md:flex ">
              {loggedIn === true && user.role === "Customer" && (
                <>
                  <DropdownButton
                    nameUser={user.fullname}
                    profileImage={profileImage}
                    menuItems={menuItemsCustomer}
                  ></DropdownButton>
                </>
              )}
              {loggedIn === true && user.role !== "Customer" && (
                <>
                  <DropdownButton
                    nameUser={user.fullname}
                    profileImage={profileImage}
                    menuItems={menuItems}
                  ></DropdownButton>
                </>
              )}
              {loggedIn === false && (
                <>
                  <NavLink
                    to="/login"
                    className="flex items-center justify-center h-8 px-4 font-semibold text-white transition ease-in-out rounded-sm bg-primary hover:bg-secondary hover:text-primary"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex items-center justify-center h-8 px-4 font-semibold rounded-sm text-primary bg-secondary hover:bg-primary hover:text-white"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
            <div className="items-center justify-between gap-2 lg:hidden md:hidden ">
              <AiOutlineMenu
                size={35}
                onClick={() => setIsOpenNavMobile(!isOpenNavMobile)}
                className="fixed bg-transparent  top-4 right-4 z-[99] md:hidden text-dark "
              />
            </div>
          </div>
        </div>
        {isOpenNavMobile && (
          <>
            <div className="fixed left-0 z-20 flex flex-col items-center justify-center w-full h-screen bg-white/90 ">
              <NavLink
                to="/"
                className="w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold"
              >
                <span className="pl-4">Home</span>
              </NavLink>
              <NavLink
                to="/recomendation"
                className="w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold"
              >
                <span className="pl-4">Recomendation</span>
              </NavLink>
              <NavLink
                to="/carts"
                className="w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold"
              >
                <span className="pl-4">Carts</span>
              </NavLink>
              <NavLink
                to="/login"
                className="w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold"
              >
                <span className="pl-4">Log In</span>
              </NavLink>
              <NavLink
                to="/register"
                className="w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold"
              >
                <span className="pl-4">Sign Up</span>
              </NavLink>
            </div>
          </>
        )}
      </nav>
    </>
  )
}

export default Header
