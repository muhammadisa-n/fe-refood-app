import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'
import { MdOutlineFoodBank } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { BiFoodMenu } from 'react-icons/bi'
import { BiCategory } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'
import { FcSalesPerformance } from 'react-icons/fc'
import { logout } from '@utils/services/authServices.js'
import { useUser } from '@context/userContext.jsx'
import { GiProfit } from 'react-icons/gi'
const SideBar = () => {
    const { role } = useUser()
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || ''
    )
    const navigate = useNavigate()
    const HandleLogout = async () => {
        await logout()
        localStorage.removeItem('access_token')
        setToken(null)
        navigate('/')
    }

    return (
        <div className='h-screen px-6 bg-primary'>
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
            {role === 'Admin' ? (
                <>
                    <div className='pt-4 border-white/40'>
                        <div className='flex items-center justify-between py-4 border-b cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/products'
                                className='flex items-center gap-3'>
                                <MdOutlineFoodBank className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    Products
                                </p>
                            </Link>
                        </div>
                        <p className='mt-2 text-xs leading-4 uppercase text-white/70 font-extralight'>
                            Category
                        </p>
                        <div className='flex items-center justify-between py-4 border-b cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/category'
                                className='flex items-center gap-3'>
                                <BiCategory className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    Category
                                </p>
                            </Link>
                        </div>
                        <p className='mt-2 text-xs leading-4 uppercase text-white/70 font-extralight'>
                            User Management
                        </p>
                        <div className='flex items-center justify-between py-2 cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/sellers'
                                className='flex items-center gap-3'>
                                <FaUsers className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    Seller
                                </p>
                            </Link>
                        </div>
                        <div className='flex items-center justify-between py-4 border-b cursor-pointer'>
                            <Link
                                to='/my-dashboard/admin/customers'
                                className='flex items-center gap-3'>
                                <FaUsers className='text-white' />
                                <p className='text-base leading-5 text-white'>
                                    Customer
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
                        <div className='flex items-center justify-between py-4 cursor-pointer'>
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
                        <div className='flex items-center justify-between py-4 cursor-pointer'>
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
                            REPORTS
                        </p>
                        <div className='flex items-center justify-between py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/seller/report-sales'
                                className='flex items-center gap-3'>
                                <FcSalesPerformance className='text-white bg-white' />
                                <p className='text-base leading-5 text-white'>
                                    Penjualan
                                </p>
                            </Link>
                        </div>
                        <div className='flex items-center justify-between py-4 cursor-pointer'>
                            <Link
                                to='/my-dashboard/seller/report-income'
                                className='flex items-center gap-3'>
                                <GiProfit className='text-white ' />
                                <p className='text-base leading-5 text-white'>
                                    Pendapatan
                                </p>
                            </Link>
                        </div>
                    </div>
                </>
            )}
            <div className='pt-4 border-b border-white/40'>
                <p className='text-xs leading-4 uppercase text-white/40 font-extralight '>
                    Profile
                </p>
                <div className='flex items-center justify-between py-4 cursor-pointer'>
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
            <div className='pt-4 border-b border-white/40'>
                <div className='flex items-center justify-between py-4 cursor-pointer'>
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
