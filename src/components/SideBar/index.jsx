import React from "react"
import { NavLink } from "react-router-dom"
const SideBar = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-primary text-white w-48 flex flex-col justify-between">
          <div className="mt-8">
            <NavLink
              to="/my-dashboard"
              className="block px-4 py-2 hover:bg-secondary"
            >
              My Dashboard
            </NavLink>
            <NavLink
              to="/my-dashboard/seller/my-products"
              className="block px-4 py-2 hover:bg-secondary"
            >
              My Products
            </NavLink>
            <NavLink
              to="/my-dashboard/seller/orders"
              className="block px-4 py-2 hover:bg-secondary"
            >
              Orders
            </NavLink>
          </div>
        </div>
        {/* Konten di sebelah kanan sidebar */}
        <div className="flex-1 ">{children}</div>
      </div>
    </>
  )
}

export default SideBar
