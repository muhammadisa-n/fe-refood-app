import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'
import { MdOutlineFoodBank } from 'react-icons/md'
import { BiFoodMenu } from 'react-icons/bi'
import { BiCategory } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'
import { logout } from '@utils/services/authServices.js'
import { jwtDecode } from 'jwt-decode'
const SideBar = () => {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const navigate = useNavigate()
    const decoded = jwtDecode(token)
    const HandleLogout = async () => {
        await logout()
        localStorage.removeItem('access_token')
        setToken(null)
        navigate('/')
    }

    return (
        <div className='hidden h-screen px-6 md:block bg-primary'>
            <div className='flex items-center justify-center px-4 border-b py-7'>
                <h1 className='text-xl font-extrabold leading-6 text-center text-white cursor-pointer'>
                    My Dashboard
                </h1>
            </div>
            <Link
                className='flex items-center gap-4 py-5 text-white border-b'
                to='/my-dashboard'>
                <FaTachometerAlt />
                <p className='text-base leading-5 text-white '>Dashboard</p>
            </Link>
            {decoded.user_role === 'Admin' ? (
                <>
                    <div className='pt-4 border-b border-white/40'>
                        <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                            Products
                        </p>
                        <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/products'
                                className='flex items-center gap-3'>
                                <MdOutlineFoodBank className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    List Products
                                </p>
                            </Link>
                        </div>
                        <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                            Category
                        </p>
                        <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/category'
                                className='flex items-center gap-3'>
                                <BiCategory className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    List Category
                                </p>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='pt-4 border-b border-white/40'>
                        <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                            Products
                        </p>
                        <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/seller/products'
                                className='flex items-center gap-3'>
                                <MdOutlineFoodBank className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    My Products
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className='pt-4 border-b border-white/40'>
                        <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                            Orders
                        </p>
                        <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/seller/orders'
                                className='flex items-center gap-3'>
                                <BiFoodMenu className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    Orders
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className='pt-4 border-b border-white/40'>
                        <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                            Profile
                        </p>
                        <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/profile'
                                className='flex items-center gap-3'>
                                <CgProfile className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    My Profile
                                </p>
                            </Link>
                        </div>
                    </div>
                </>
            )}
            <div className='pt-4 border-b border-white/40'>
                <div className='flex items-center justify-between gap-3 py-4 cursor-pointer'>
                    <button
                        onClick={HandleLogout}
                        className='flex items-center gap-3'>
                        <CiLogout className='text-white' />
                        <p className='text-base leading-5 text-white'>Logout</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
