import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className='bg-primary z-50'>
                <div className='w-full max-w-full p-4 mx-auto md:py-8'>
                    <div className='sm:flex sm:items-center sm:justify-between'>
                        <a
                            href='/'
                            className='flex items-center mb-4 space-x-3  sm:mb-0 text-white'>
                            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
                                Refood App
                            </span>
                        </a>
                        <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 '>
                            <li>
                                <NavLink
                                    to='/'
                                    className='hover:underline me-4 md:me-6 hover:text-secondary text-white'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/recomendation'
                                    className='hover:underline me-4 md:me-6 hover:text-secondary text-white'>
                                    Recomendation
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <hr className='my-6 border-white sm:mx-auto lg:my-8' />
                    <span className='block text-sm text-white sm:text-center '>
                        © {year}{' '}
                        <a
                            href='/'
                            className='hover:underline text-white font-semibold'>
                            Refood App.
                        </a>
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer
