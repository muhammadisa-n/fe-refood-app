import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className='bg-primary'>
                <div className='w-full max-w-full p-4 mx-auto md:py-8'>
                    <div className='sm:flex sm:items-center sm:justify-between'>
                        <a
                            href='/'
                            className='flex items-center mb-4 space-x-3 text-white sm:mb-0 rtl:space-x-reverse'>
                            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
                                Refood
                            </span>
                        </a>
                        <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 '>
                            <li>
                                <NavLink
                                    to='/'
                                    className='hover:underline me-4 md:me-6 hover:text-secondary'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/recomendation'
                                    className='hover:underline me-4 md:me-6 hover:text-secondary'>
                                    Recomendation
                                </NavLink>
                                <NavLink
                                    to='/aboutus'
                                    className='hover:underline me-4 md:me-6 hover:text-secondary'>
                                    About Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <hr className='my-6 border-gray-400 sm:mx-auto lg:my-8' />
                    <span className='block text-sm text-gray-300 sm:text-center '>
                        © {year}{' '}
                        <a
                            href='https://flowbite.com/'
                            className='hover:underline'>
                            Refood App
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer
