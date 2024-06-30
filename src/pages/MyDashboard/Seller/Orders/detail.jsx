import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import Swal from 'sweetalert2'
import { getAllOrders } from '@utils/services/sellerServices.js'
import { useDebounce } from 'use-debounce'
import { useUser } from '@context/userContext.jsx'
import { getDetailOrder } from '@utils/services/sellerServices'
import moment from 'moment'
const SellerDetailOrdersPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [orderNotFound, setOrderNotFound] = useState(false)
    const [showTransactionDetails, setShowTransactionDetails] = useState(false)

    const toggleTransactionDetails = () => {
        setShowTransactionDetails(!showTransactionDetails)
    }
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getDetailOrder(id)
                setOrder(response)
            } catch (error) {
                if (error.status_code === 404) {
                    setOrderNotFound(true)
                }
            }
        }
        fetchOrder()
    }, [id])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Detail Order
                    </h1>
                </div>
                {orderNotFound ? (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <h5 className='text-2xl text-center'>
                            Order Not Found
                        </h5>
                    </div>
                ) : (
                    <>
                        <div className='flex flex-col items-center min-h-screen py-10 '>
                            <div className='w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg'>
                                <div className='mb-4'>
                                    <h1 className='mb-4 text-2xl font-bold text-primary'>
                                        Order Detail
                                    </h1>
                                    <p>Order ID: {order.id}</p>
                                    <p>Nama Customer: {order.Customer?.nama}</p>
                                    <p>
                                        Nomor Handphone: {order.Customer?.no_hp}
                                    </p>
                                    <p>
                                        Alamat Pengiriman:{' '}
                                        {order.alamat_pengiriman}
                                    </p>
                                    <p>Nama Product: {order.Product?.nama}</p>
                                    <p>Jumlah Pesanan: {order.total_produk}</p>
                                    <p>
                                        Status Bayar:{' '}
                                        {order.status_bayar === 'PENDING' && (
                                            <span className='font-extrabold text-gray-500'>
                                                {order.status_bayar}
                                            </span>
                                        )}
                                        {order.status_bayar === 'SUKSES' && (
                                            <span className='font-extrabold text-green-500'>
                                                {order.status_bayar}
                                            </span>
                                        )}{' '}
                                        {order.status_bayar === 'GAGAL' && (
                                            <span className='font-extrabold text-red-500'>
                                                {order.status_bayar}
                                            </span>
                                        )}{' '}
                                    </p>
                                    <p>
                                        Status Pengiriman:{' '}
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
                                                Sudah Dikirim
                                            </span>
                                        )}{' '}
                                        {order.status_pengiriman ===
                                            'GAGAL' && (
                                            <span className='font-extrabold text-red-500'>
                                                GAGAL
                                            </span>
                                        )}{' '}
                                    </p>
                                    <p>
                                        Total Harga:{' '}
                                        {order.total_harga?.toLocaleString(
                                            'id-Id'
                                        )}
                                    </p>
                                </div>
                                {order.Transaction ? (
                                    <>
                                        <button
                                            onClick={toggleTransactionDetails}
                                            className='flex items-center justify-between w-full px-4 py-2 text-white transition duration-300 rounded-lg bg-primary hover:bg-orange-700'>
                                            <span>Detail Transaksi</span>
                                            <svg
                                                className={`w-6 h-6 transition-transform duration-300 ${showTransactionDetails ? 'transform rotate-180' : ''}`}
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M19 9l-7 7-7-7'
                                                />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    ''
                                )}
                                <div className='mb-4'>
                                    {showTransactionDetails && (
                                        <div className='mt-4'>
                                            {order.Transaction
                                                .transaction_id ? (
                                                <>
                                                    <h2 className='text-lg font-semibold'>
                                                        Informasi Transaksi
                                                    </h2>
                                                    <p>
                                                        ID Transaksi:{' '}
                                                        {
                                                            order.Transaction
                                                                ?.transaction_id
                                                        }
                                                    </p>
                                                    <p>
                                                        Waktu Transaksi:{' '}
                                                        {moment(
                                                            order.Transaction
                                                                ?.waktu_transaksi
                                                        ).format(
                                                            ' DD-MM-YYYY HH:mm:ss'
                                                        )}
                                                    </p>
                                                    <p>
                                                        Total Pembayaran:{' '}
                                                        {order.Transaction?.total_pembayaran?.toLocaleString(
                                                            'id-Id'
                                                        )}
                                                    </p>
                                                    <p>
                                                        Tipe Pembayaran:{' '}
                                                        {order.Transaction
                                                            ?.tipe_pembayaran ===
                                                            'bank_transfer' &&
                                                            'Bank Transfer'}
                                                    </p>
                                                    <p>
                                                        Status Transaksi:{' '}
                                                        {order.Transaction
                                                            ?.status_transaksi ===
                                                            'settlement' && (
                                                            <span className='font-extrabold text-green-500'>
                                                                SUCCESS
                                                            </span>
                                                        )}
                                                        {order.Transaction
                                                            ?.status_transaksi ===
                                                            'pending' && (
                                                            <span className='font-extrabold text-gray-500'>
                                                                PENDING
                                                            </span>
                                                        )}
                                                        {order.Transaction
                                                            ?.status_transaksi ===
                                                            'deny' && (
                                                            <span className='font-extrabold text-red-500'>
                                                                GAGAL
                                                            </span>
                                                        )}
                                                    </p>
                                                </>
                                            ) : (
                                                <h2 className='text-lg font-semibold'>
                                                    Anda Belum Melakukan
                                                    Transaksi
                                                </h2>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    )
}

export default SellerDetailOrdersPage
