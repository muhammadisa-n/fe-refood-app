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

const MyDashboardPage = () => {
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
        } catch (error) {
            console.error('Error : ', error)
        }
    }

    useEffect(() => {
        if (token) {
            amountProduct()
            amountSellerAndCustomer()
        }
    }, [token])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Dashboard
                    </h1>
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
                                    <h1 className='text-xl font-bold text-gray-600 mt-2'>
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
                                    <h2 className='text-base font-bold leading-3 text-primary  '>
                                        Total Orders
                                    </h2>
                                    <h1 className='text-xl font-bold text-gray-600 mt-2'>
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
                                    <h1 className='text-xl font-bold text-gray-600 mt-2'>
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
