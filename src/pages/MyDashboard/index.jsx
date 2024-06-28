import React, { useEffect, useState } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { PiUsersThreeBold } from 'react-icons/pi'
import { MdOutlineFoodBank } from 'react-icons/md'
import DashboardLayout from '@layouts/DashboardLayout'
import { countProduct as countProductSeller } from '@utils/services/sellerServices.js'
import {
    countProduct as countProductAdmin,
    countSeller,
    countCustomer,
} from '@utils/services/adminServices.js'
import { jwtDecode } from 'jwt-decode'
import { NavLink } from 'react-router-dom'
import { useUser } from '@context/userContext.jsx'

const MyDashboardPage = () => {
    const { user, refreshUser } = useUser()
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const decoded = jwtDecode(token)
    const [countProduct, setCountProduct] = useState(0)
    const [countSellerText, setCountSellerText] = useState(0)
    const [countCustomerText, setCountCustomerText] = useState(0)

    const amountProduct = async () => {
        const decoded = jwtDecode(token)
        if (decoded.user_role === 'Admin') {
            const response = await countProductAdmin()
            setCountProduct(response.total_product)
        } else {
            const response = await countProductSeller()
            setCountProduct(response.total_product)
        }
    }
    const amountSellerAndCustomer = async () => {
        try {
            const decoded = jwtDecode(token)
            if (decoded.user_role === 'Admin') {
                const dataSeller = await countSeller()
                const dataCustomer = await countCustomer()
                setCountSellerText(dataSeller.total_seller)
                setCountCustomerText(dataCustomer.total_customer)
            }
        } catch (error) {}
    }

    useEffect(() => {
        if (token) {
            refreshUser()
            amountProduct()
            amountSellerAndCustomer()
        }
    }, [token])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Dashboard
                    </h1>
                    {decoded.user_role === 'Seller' && (
                        <>
                            {user?.link_map_toko === null &&
                                user.is_active === false && (
                                    <div
                                        className={`flex items-center p-4 mb-2  rounded-lg  text-red-800 bg-red-200 mt-3`}
                                        role='alert'>
                                        <svg
                                            className='flex-shrink-0 w-4 h-4'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'>
                                            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                                        </svg>
                                        <div className='text-sm font-medium ms-3'>
                                            Your Account is not Active,{' '}
                                            <NavLink
                                                to='/my-dashboard/seller/activate'
                                                className='text-sm font-medium text-blue-900 underline'>
                                                Click this
                                            </NavLink>{' '}
                                            To Activate Your Account
                                        </div>
                                    </div>
                                )}
                            {user.link_map_toko !== null &&
                                user.is_active === false && (
                                    <div
                                        className={`flex items-center p-4 mb-2  rounded-lg  text-yellow-800 bg-yellow-200 mt-3`}
                                        role='alert'>
                                        <svg
                                            className='flex-shrink-0 w-4 h-4'
                                            aria-hidden='true'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'>
                                            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                                        </svg>
                                        <div className='text-sm font-medium ms-3'>
                                            Your Verification On Process,{' '}
                                            <NavLink
                                                to='/my-dashboard/seller/activate'
                                                className='text-sm font-medium text-blue-900 underline'>
                                                Click This
                                            </NavLink>{' '}
                                            To Edit Your Activate Account
                                        </div>
                                    </div>
                                )}
                        </>
                    )}
                </div>
                <div className='grid grid-cols-4 gap-5 pb-4 mt-5 '>
                    {/* card */}
                    {decoded.user_role === 'Seller' ? (
                        <>
                            <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                <div>
                                    <h2 className='text-base font-bold leading-3 text-primary '>
                                        Total Products
                                    </h2>
                                    <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                        {countProduct}
                                    </h1>
                                </div>
                                <MdOutlineFoodBank
                                    fontSize={28}
                                    className='text-black'
                                />
                            </div>
                            <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                <div>
                                    <h2 className='text-base font-bold leading-3 text-primary '>
                                        Total Orders
                                    </h2>
                                    <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                        50
                                    </h1>
                                </div>
                                <AiFillProduct
                                    fontSize={28}
                                    className='text-black'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                <div>
                                    <h2 className='text-base font-bold leading-3 text-primary '>
                                        Total Products
                                    </h2>
                                    <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                        {countProduct}
                                    </h1>
                                </div>
                                <MdOutlineFoodBank
                                    fontSize={28}
                                    className='text-black'
                                />
                            </div>
                            <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                <div>
                                    <h2 className='text-base font-bold leading-3 text-primary '>
                                        Total Seller
                                    </h2>
                                    <h1 className='text-xl font-bold text-gray-600'>
                                        {countSellerText}
                                    </h1>
                                </div>
                                <FaUsers fontSize={28} className='text-black' />
                            </div>
                            <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                <div>
                                    <h2 className='text-base font-bold leading-3 text-primary '>
                                        Total Customer
                                    </h2>
                                    <h1 className='text-xl font-bold text-gray-600'>
                                        {countCustomerText}
                                    </h1>
                                </div>
                                <PiUsersThreeBold
                                    fontSize={28}
                                    className='text-black'
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyDashboardPage
