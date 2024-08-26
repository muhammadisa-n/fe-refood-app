import React, { useEffect, useState, useRef } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { PiUsersThreeBold } from 'react-icons/pi'
import { PiMoneyWavyBold } from 'react-icons/pi'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ZAxis,
    ScatterChart,
    Legend,
    CartesianGrid,
    Scatter,
    BarChart,
    Bar,
} from 'recharts'
import DashboardLayout from '@layouts/DashboardLayout'
import moment from 'moment-timezone'
import {
    countProduct as countProductSeller,
    countOrder,
    countPendapatan,
} from '@utils/services/sellerServices.js'
import {
    countProduct as countProductAdmin,
    countSeller,
    countCustomer,
} from '@utils/services/adminServices.js'
import { jwtDecode } from 'jwt-decode'
import { NavLink } from 'react-router-dom'
import { useUser } from '@context/userContext.jsx'
import { reportIncomeSeller } from '../../utils/services/sellerServices'

const MyDashboardPage = () => {
    const { user, refreshUser } = useUser()
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const decoded = jwtDecode(token)
    const [countProductText, setCountProductText] = useState(0)
    const [countSellerText, setCountSellerText] = useState(0)
    const [countCustomerText, setCountCustomerText] = useState(0)
    const [countOrderText, setCountOrderText] = useState(0)
    const [countPendapatanText, setCountPendapatanText] = useState(0)
    const [pendapatanDataBulan, setPendapatanDataBulan] = useState([])
    const [datagrafikPendapatan, setDataGrafikPendapatan] = useState([])
    const tableRef = useRef()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const fetchReportData = async () => {
        try {
            const decoded = jwtDecode(token)
            if (decoded.user_role === 'Seller') {
                const response = await reportIncomeSeller(startDate, endDate)
                setDataGrafikPendapatan(response.dataPendapatan || [])
            }
        } catch (error) {
            console.error('Error Fetching Report Sales', error)
        }
    }
    const amountProduct = async () => {
        try {
            const decoded = jwtDecode(token)
            if (decoded.user_role === 'Admin') {
                const response = await countProductAdmin()
                setCountProductText(response.total_product)
            } else {
                const response = await countProductSeller()
                setCountProductText(response.total_product)
            }
        } catch (error) {
            console.error(error.mssage)
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
            console.error(error.mssage)
        }
    }
    const amountOrder = async () => {
        try {
            const decoded = jwtDecode(token)
            if (decoded.user_role === 'Seller') {
                const dataOrder = await countOrder()
                const dataPendapatan = await countPendapatan()
                setCountPendapatanText(dataPendapatan.total_pendapatan)
                setCountOrderText(dataOrder.total_order)
            }
        } catch (error) {
            console.error(error.mssage)
        }
    }

    useEffect(() => {
        if (token) {
            refreshUser()
            amountProduct()
            amountOrder()
            amountSellerAndCustomer()
            fetchReportData()
        }
    }, [token])
    const formatDate = (date) => moment(date).format('DD MMM YYYY')

    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Dashboard
                    </h1>
                    {decoded.user_role === 'Seller' && (
                        <>
                            {user.link_map_alamat_toko === null &&
                                user.status === null && (
                                    <div
                                        className={`flex items-center p-4 mb-2  rounded-lg  text-primary bg-secondary mt-3`}
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
                                            Akun Anda Belum Aktif,{' '}
                                            <NavLink
                                                to='/my-dashboard/seller/activate'
                                                className='text-sm font-medium text-blue-900 underline'>
                                                Klik Disini
                                            </NavLink>{' '}
                                            Untuk Verifikasi Seller
                                        </div>
                                    </div>
                                )}
                            {user.link_map_alamat_toko !== null &&
                                user.status === null && (
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
                                            Verifikasi Sedang Diproses
                                        </div>
                                    </div>
                                )}
                            {user.link_map_alamat_toko !== null &&
                                user.status === 'Ditolak' && (
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
                                            Verifikasi Kamu Ditolak, Pastikan
                                            Memasukkan Data Yang Benar,{' '}
                                            <NavLink
                                                to='/my-dashboard/seller/activate'
                                                className='text-sm font-medium text-blue-900 underline'>
                                                Klik Disini
                                            </NavLink>{' '}
                                            Untuk Verifikasi Ulang
                                        </div>
                                    </div>
                                )}
                        </>
                    )}
                </div>
                <div className='container py-4 mx-auto'>
                    {/* card */}
                    {decoded.user_role === 'Seller' ? (
                        <>
                            <div className='flex flex-wrap '>
                                <div className='w-full  mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Product
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            {countProductText}
                                        </h1>
                                    </div>
                                    <AiFillProduct
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                                <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Order
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            {countOrderText}
                                        </h1>
                                    </div>
                                    <AiFillProduct
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                                <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Pendapatan
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            RP.{' '}
                                            {countPendapatanText.toLocaleString(
                                                'ID-id'
                                            )}
                                        </h1>
                                    </div>
                                    <PiMoneyWavyBold
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                            </div>
                            <div className='mt-5 basis-[85%]'>
                                <div className='mx-auto mt-10'>
                                    <h1 className='mb-10 text-3xl font-semibold text-primary '>
                                        Grafik Total Pendapatan
                                    </h1>
                                    <LineChart
                                        width={800}
                                        height={500}
                                        data={datagrafikPendapatan}>
                                        <Line
                                            name='Total Pendapatan'
                                            dataKey='_sum.total_pembayaran'
                                            stroke='green'
                                        />
                                        <XAxis
                                            stroke='black'
                                            dataKey='waktu_transaksi'
                                            tickFormatter={formatDate}
                                            height={70}
                                        />
                                        <YAxis
                                            name='Total Pendapatan'
                                            stroke='black'
                                        />
                                        <Tooltip
                                            labelFormatter={(value) =>
                                                formatDate(value)
                                            }
                                            formatter={(value) => [
                                                `Rp ${value.toLocaleString('id-ID')}`,
                                                'Total Pendapatan',
                                            ]}
                                        />
                                    </LineChart>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-wrap '>
                                <div className='w-full  mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Product
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            {countProductText}
                                        </h1>
                                    </div>
                                    <AiFillProduct
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                                <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Seller
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            {countSellerText}
                                        </h1>
                                    </div>
                                    <FaUsers
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                                <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                                    <div>
                                        <h2 className='text-base font-bold leading-3 text-primary '>
                                            Total Customer
                                        </h2>
                                        <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                            {countCustomerText}
                                        </h1>
                                    </div>
                                    <PiUsersThreeBold
                                        fontSize={28}
                                        className='text-black'
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyDashboardPage
