import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ to, title, onClick }) => {
    return (
        <div className='py-1'>
            <NavLink
                className='block w-full px-4 py-2 text-sm text-black shadow-sm hover:text-primary hover:font-semibold'
                onClick={onClick}
                to={to}>
                {title}
            </NavLink>
        </div>
    )
}

export default MenuItem
