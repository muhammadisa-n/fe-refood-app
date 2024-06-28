import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DropdownMenu from '@components/Header/DropdownMenu.jsx'
import profileImage from '@assets/userdefault.png'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { logout } from '@utils/services/authServices.js'
import { useCart } from '@context/CartContext'
import { useUser } from '@context/userContext.jsx'
const Header = () => {
    const { user, role, refreshUser } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const { carts, refreshCart } = useCart()
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || ''
    )
    const navigate = useNavigate()
    const setActive = ({ isActive }) =>
        isActive
            ? 'font-semibold text-center font-inter text-primary'
            : 'font-semibold text-center text-black transition ease-in-out font-inter hover:text-secondary'

    const HandleLogout = async () => {
        await logout()
        localStorage.removeItem('access_token')
        setToken(null)
        navigate('/')
    }
    const menuItemsCustomer = [
        {
            title: 'My Orders',
            to: '/my-orders',
        },
        {
            title: 'My Profile',
            to: '/my-profile',
        },
        {
            title: 'Logout',
            onClick: HandleLogout,
        },
    ]
    const menuItemsCustomerMobile = [
        {
            title: 'Home',
            to: '/',
        },
        {
            title: 'Recommendation',
            to: '/recommendation',
        },
        {
            title: 'My Orders',
            to: '/my-orders',
        },
        {
            title: 'My Profile',
            to: '/my-profile',
        },
        {
            title: 'Logout',
            onClick: HandleLogout,
        },
    ]
    const menuItems = [
        {
            title: 'My Dashboard',
            to: `/my-dashboard`,
        },
        {
            title: 'Logout',
            onClick: HandleLogout,
        },
    ]
    const menuItemsMobile = [
        {
            title: 'Home',
            to: '/',
        },
        {
            title: 'Recommendation',
            to: '/recommendation',
        },
        {
            title: 'My Dashboard',
            to: `/my-dashboard`,
        },
        {
            title: 'Logout',
            onClick: HandleLogout,
        },
    ]

    useEffect(() => {
        if (token) {
            refreshCart()
            refreshUser()
        }
    }, [])
    return (
        <header className='sticky top-0 z-50 px-4 py-4 bg-white border-b-2'>
            <nav>
                <div className='container mx-auto'>
                    <div className='flex justify-between'>
                        <a
                            href='/'
                            className='text-[26px] font-semibold font-inter'>
                            Refood App
                        </a>
                        <div className='items-center justify-between hidden gap-3 md:flex'>
                            <NavLink to='/' className={setActive}>
                                Home
                            </NavLink>
                            <NavLink to='/recommendation' className={setActive}>
                                Recommendation
                            </NavLink>
                        </div>
                        <div className='items-center justify-between hidden gap-2 md:flex '>
                            {token && role === 'Customer' ? (
                                <>
                                    <NavLink
                                        to='/carts'
                                        className='relative mx-3'>
                                        <FaShoppingCart
                                            size={20}
                                            className='hover:text-primary'
                                        />
                                        {carts && carts.length > 0 && (
                                            <span className='absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white transform translate-x-1/2 -translate-y-1/2 rounded-full bg-primary'>
                                                {carts.length}
                                            </span>
                                        )}
                                    </NavLink>
                                    <DropdownMenu
                                        profileImage={
                                            user.ava_image_url
                                                ? user.ava_image_url
                                                : profileImage
                                        }
                                        menuItems={
                                            menuItemsCustomer
                                        }></DropdownMenu>
                                </>
                            ) : (
                                <>
                                    {token && role !== 'Customer' ? (
                                        <DropdownMenu
                                            profileImage={
                                                user.ava_image_url
                                                    ? user.ava_image_url
                                                    : profileImage
                                            }
                                            menuItems={
                                                menuItems
                                            }></DropdownMenu>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                            {!token && (
                                <>
                                    <NavLink
                                        to='/login'
                                        className='flex items-center justify-center h-8 px-4 font-semibold text-white transition ease-in-out rounded-sm bg-primary hover:bg-secondary hover:text-primary'>
                                        Log In
                                    </NavLink>
                                    <NavLink
                                        to='/register'
                                        className='flex items-center justify-center h-8 px-4 font-semibold rounded-sm text-primary bg-secondary hover:bg-primary hover:text-white'>
                                        Sign Up
                                    </NavLink>
                                </>
                            )}
                        </div>
                        {/*Nav Mobile */}
                        <div className='items-center justify-between gap-2 lg:hidden md:hidden '>
                            {!token ? (
                                <>
                                    <AiOutlineMenu
                                        size={35}
                                        onClick={() => setIsOpen(!isOpen)}
                                        className='relative bg-transparent  top-0  z-[99] md:hidden text-dark'
                                    />
                                    {isOpen && (
                                        <div className='absolute w-[150px] right-0 bg-white px-4 py-4'>
                                            <NavLink
                                                to='/login'
                                                className='flex items-center justify-center h-8 px-4 my-2 font-semibold text-white transition ease-in-out rounded-sm bg-primary hover:bg-secondary hover:text-primary'>
                                                Log In
                                            </NavLink>
                                            <NavLink
                                                to='/register'
                                                className='flex items-center justify-center h-8 px-4 my-2 font-semibold rounded-sm text-primary bg-secondary hover:bg-primary hover:text-white'>
                                                Sign Up
                                            </NavLink>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {token && role === 'Customer' ? (
                                        <div className='flex'>
                                            <NavLink
                                                to='/carts'
                                                className='relative mx-3 top-4'>
                                                <FaShoppingCart
                                                    size={20}
                                                    className='hover:text-primary'
                                                />
                                                {carts && carts.length > 0 && (
                                                    <span className='absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white transform translate-x-1/2 -translate-y-1/2 rounded-full bg-primary'>
                                                        {carts.length}
                                                    </span>
                                                )}
                                            </NavLink>
                                            <DropdownMenu
                                                profileImage={
                                                    user.ava_image_url
                                                        ? user.ava_image_url
                                                        : profileImage
                                                }
                                                menuItems={
                                                    menuItemsCustomerMobile
                                                }></DropdownMenu>
                                        </div>
                                    ) : (
                                        <DropdownMenu
                                            profileImage={
                                                user.ava_image_url
                                                    ? user.ava_image_url
                                                    : profileImage
                                            }
                                            menuItems={
                                                menuItemsMobile
                                            }></DropdownMenu>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
