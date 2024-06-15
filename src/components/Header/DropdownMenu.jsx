import React, { useState } from 'react'
import MenuItem from './MenuItem.jsx'

const DropdownMenu = ({ menuItems, profileImage }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className='items-center justify-center w-full px-1x border border-primary text-sm font-medium text-white  rounded-full shadow-sm inline-block cursor-pointer relative'
            onClick={toggleDropdown}>
            <img
                className='w-[50px] h-[50px]  rounded-full object-cover '
                src={profileImage}
                alt='Profile'
            />

            {isOpen && (
                <div className='absolute right-0 w-48 mt- origin-top-right bg-white rounded-md shadow-lg border  '>
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            title={item.title}
                            to={item.to}
                            onClick={item.onClick}></MenuItem>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu
