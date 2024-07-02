import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'

import { getAllOrders } from '@utils/services/sellerServices.js'
import { useDebounce } from 'use-debounce'
import { useUser } from '@context/userContext.jsx'

const SellerOrdersPage = () => {
    const { user, refreshUser } = useUser()
    const [orders, setOrders] = useState([])
    const [take, setTake] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [totalOrder, setTotalOrder] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue] = useDebounce(search, 1000)
    const [status_pengiriman, setStatus_pengiriman] = useState('')
    const [showEditStatus, setShowEditStatus] = useState(false)
    const toggleshowEditStatus = () => {
        setShowEditStatus(!showEditStatus)
    }
    const handleUpdateStatusKirim = async (sellerId, newStatus) => {
        try {
            await activateSeller(orderId, newStatus)
            setOrders(
                orders.map((order) =>
                    order.id === orderId
                        ? { ...order, is_active: newStatus }
                        : order
                )
            )
        } catch (error) {
            console.error('Error Updating Seller Status', error)
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders(page, take, searchValue)
            setOrders(response.orders)
            setTotalOrder(response.total_orders)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Order', error)
        }
    }

    useEffect(() => {
        refreshUser()
        fetchOrders()
    }, [page, take, searchValue])

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Orders
                    </h1>
                </div>
                <div className='mt-5 basis-[85%] '>
                    <div></div>
                    <div className='overflow-x-auto'>
                        <div className='flex justify-between w-full'>
                            <div className='px-2'>
                                <select
                                    name='take'
                                    id='take'
                                    value={take}
                                    onChange={(e) => setTake(e.target.value)}
                                    className={` px-1 py-1 text-sm  rounded text-slate-700 bg-white mr-2 my-0 md:my-1 border`}>
                                    <option value='10'>10</option>
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                </select>
                                <label htmlFor='take'>Data Per Page</label>
                            </div>
                            <div className='px-2 '>
                                <input
                                    type='text'
                                    className='px-2 py-1 mb-2 font-light text-black border-2 rounded-lg w-52 md:w-full'
                                    placeholder='Search...'
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-white border rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Order Id
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Product name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Total Harga
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Status Order
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Status Kirim
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalOrder === 0 ? (
                                    <tr className='text-black border-b'>
                                        <td className='px-6 py-4'>
                                            No Data Orders
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {orders.map((order, index) => (
                                            <tr
                                                className='text-black bg-white border-b '
                                                key={index}>
                                                <td className='px-6 py-4'>
                                                    {order?.id}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {order?.Product?.nama}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {order?.total_harga.toLocaleString(
                                                        'id-Id'
                                                    )}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {order.status_order ===
                                                        'PENDING' && (
                                                        <span className='font-extrabold text-gray-500'>
                                                            {order.status_order}
                                                        </span>
                                                    )}
                                                    {order.status_order ===
                                                        'SUKSES' && (
                                                        <span className='font-extrabold text-green-500'>
                                                            {order.status_order}
                                                        </span>
                                                    )}{' '}
                                                    {order.status_order ===
                                                        'CANCEL' && (
                                                        <span className='font-extrabold text-red-500'>
                                                            {order.status_order}
                                                        </span>
                                                    )}{' '}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {order.status_pengiriman ===
                                                        'PENDING' && (
                                                        <span className='font-extrabold text-gray-500'>
                                                            Belum Dikirim
                                                        </span>
                                                    )}
                                                    {order.status_pengiriman ===
                                                        'PROSES' && (
                                                        <span className='font-extrabold text-yellow-500'>
                                                            Sedang Dikirim
                                                        </span>
                                                    )}
                                                    {order.status_pengiriman ===
                                                        'SUKSES' && (
                                                        <span className='font-extrabold text-green-500'>
                                                            Berhasil Diterima
                                                        </span>
                                                    )}
                                                    {order.status_pengiriman ===
                                                        'CANCEL' && (
                                                        <span className='font-extrabold text-red-500'>
                                                            Orderan Di Cancel
                                                        </span>
                                                    )}{' '}
                                                </td>
                                                <td className='px-6 py-4 md:flex'>
                                                    <Link
                                                        type='button'
                                                        to={
                                                            user.is_active
                                                                ? `/my-dashboard/seller/orders/detail/${order.id}`
                                                                : null
                                                        }
                                                        className={`p-1 mx-2 text-white rounded-lg  hover:bg-sky-700 ${!user.is_active ? 'bg-sky-900' : 'bg-sky-600'}`}>
                                                        Detail
                                                    </Link>
                                                    {order.status_order ===
                                                        'SUKSES' && (
                                                        <Link
                                                            type='button'
                                                            to={
                                                                user.is_active
                                                                    ? `/my-dashboard/seller/orders/update/${order.id}`
                                                                    : null
                                                            }
                                                            className={`p-1 mx-2 text-white rounded-lg  hover:bg-yellow-700 ${!user.is_active ? 'bg-yellow-900' : 'bg-yellow-500'}`}>
                                                            Update
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                        {totalPage > 1 && (
                            <>
                                <div className='mt-4 space-x-3 text-right'>
                                    <button
                                        className='px-2 py-1 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                                        onClick={() => handlePrev()}
                                        disabled={page === 1}>
                                        Prev
                                    </button>

                                    <span>{page}</span>

                                    <button
                                        className={`bg-primary mb-2 text-white font-semibold px-2 py-1 hover:bg-secondary rounded-md  disabled:bg-orange-700`}
                                        onClick={() => handleNext()}
                                        disabled={
                                            page === totalPage ||
                                            page > totalPage
                                        }>
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default SellerOrdersPage
