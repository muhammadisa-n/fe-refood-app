import React, { useState } from "react"
import MenuItem from "./MenuItem"

const DropdownButton = ({ menuItems, nameUser, profileImage }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border rounded-md shadow-sm border-secondary bg-primary hover:bg-secondary "
        onClick={toggleDropdown}
      >
        <img
          className="w-6 h-6 mr-2 rounded-full"
          src={profileImage}
          alt="Profile"
        />
        <span>{nameUser}</span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              to={item.to}
              onClick={item.onClick}
            ></MenuItem>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownButton
