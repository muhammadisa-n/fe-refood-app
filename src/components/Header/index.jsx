import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import DropdownButton from '@components/DropdownButton'
import profileImage from '@assets/userdefault.png'
import { FaShoppingCart } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { logout } from '@utils/services/authServices.js'
import { useCart } from '@context/CartContext'
import { useUser } from '@context/userContext.jsx'
const Header = () => {
    const { user, role, refreshUser } = useUser()
    const { carts, refreshCart } = useCart()
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || ''
    )
    const [isOpenNavMobile, setIsOpenNavMobile] = useState(false)
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

    useEffect(() => {
        if (token) {
            refreshCart()
            refreshUser()
        }
    }, [])
    return (
        <>
            <nav className='sticky  top-0 px-4 py-4  border-b-2 bg-white  z-50'>
                <div className='container mx-auto'>
                    <div className='flex justify-between'>
                        <a
                            href='/'
                            className='text-[26px] font-semibold font-inter'>
                            Refood App
                        </a>
                        <div className='items-center justify-between hidden gap-3 md:flex'>
                            {!token && (
                                <>
                                    <NavLink to='/' className={setActive}>
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to='/recomendation'
                                        className={setActive}>
                                        Recommendation
                                    </NavLink>
                                </>
                            )}
                            {token && role === 'Customer' && (
                                <>
                                    <NavLink to='/' className={setActive}>
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to='/recomendation'
                                        className={setActive}>
                                        Recommendation
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <div className='items-center justify-between hidden gap-2 md:flex '>
                            {token && role === 'Customer' && (
                                <>
                                    <NavLink
                                        to='/carts'
                                        className='relative mx-2'>
                                        <IoIosNotifications
                                            size={20}
                                            className='hover:text-primary'
                                        />
                                        <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                                            1
                                        </span>
                                    </NavLink>
                                    <NavLink
                                        to='/carts'
                                        className='relative mx-3'>
                                        <FaShoppingCart
                                            size={20}
                                            className='hover:text-primary'
                                        />
                                        {carts && carts.length > 0 && (
                                            <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                                                {carts.length}
                                            </span>
                                        )}
                                    </NavLink>
                                    <DropdownButton
                                        profileImage={
                                            user.ava_image_url
                                                ? user.ava_image_url
                                                : profileImage
                                        }
                                        menuItems={
                                            menuItemsCustomer
                                        }></DropdownButton>
                                </>
                            )}
                            {token && role !== 'Customer' && (
                                <>
                                    <DropdownButton
                                        profileImage={
                                            user.ava_image_url
                                                ? user.ava_image_url
                                                : profileImage
                                        }
                                        menuItems={menuItems}></DropdownButton>
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
                        <div className='items-center justify-between gap-2 lg:hidden md:hidden '>
                            <AiOutlineMenu
                                size={35}
                                onClick={() =>
                                    setIsOpenNavMobile(!isOpenNavMobile)
                                }
                                className='fixed bg-transparent  top-4 right-4 z-[99] md:hidden text-dark '
                            />
                        </div>
                    </div>
                </div>
                {isOpenNavMobile && (
                    <>
                        <div className='fixed left-0 z-20 flex flex-col items-center justify-center w-full h-screen bg-white/90 '>
                            <NavLink
                                to='/'
                                className='w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold'>
                                <span className='pl-4'>Home</span>
                            </NavLink>
                            <NavLink
                                to='/recomendation'
                                className='w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold'>
                                <span className='pl-4'>Recommendation</span>
                            </NavLink>
                            <NavLink
                                to='/carts'
                                className='w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold'>
                                <span className='pl-4'>Carts</span>
                            </NavLink>
                            <NavLink
                                to='/login'
                                className='w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold'>
                                <span className='pl-4'>Log In</span>
                            </NavLink>
                            <NavLink
                                to='/register'
                                className='w-[75%] flex justify-center items-center  shadow-lg bg-light shadow-secondary dark:shadow-light m-2 p-2 cursor-pointer hover:scale-110 ease-in duration-200 rounded-full font-semibold'>
                                <span className='pl-4'>Sign Up</span>
                            </NavLink>
                        </div>
                    </>
                )}
            </nav>
        </>
    )
}

export default Header
