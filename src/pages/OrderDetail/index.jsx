import React, { useState, useEffect } from 'react'
import MainLayout from '@layouts/MainLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailOrder } from '@utils/services/customerServices'
import moment from 'moment'
const OrderDetailPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [orderNotFound, setOrderNotFound] = useState(false)
    const navigate = useNavigate()
    const [showTransactionDetails, setShowTransactionDetails] = useState(false)

    const toggleTransactionDetails = () => {
        setShowTransactionDetails(!showTransactionDetails)
    }
    const fetchOrder = async () => {
        try {
            const response = await getDetailOrder(id)
            setOrder(response)
            console.log(response)
        } catch (error) {
            if (error.status_code === 404) {
                setOrderNotFound(true)
            }
        }
    }
    useEffect(() => {
        fetchOrder()
    }, [id])
    return (
        <MainLayout>
            {orderNotFound ? (
                <div className='flex items-center justify-center max-w-full min-h-screen'>
                    <div>
                        <h5 className='text-4xl text-center text-slate-400'>
                            Data Order Not Found
                        </h5>
                    </div>
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
                                <p>Nama: {order.Customer?.nama}</p>
                                <p>Nomor Handphone: {order.Customer?.no_hp}</p>
                                <p>Alamat: {order.alamat_pengiriman}</p>
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
                                    {order.status_pengiriman === 'PENDING' && (
                                        <span className='font-extrabold text-gray-500'>
                                            Belum Dikirim
                                        </span>
                                    )}
                                    {order.status_pengiriman === 'PROSES' && (
                                        <span className='font-extrabold text-yellow-500'>
                                            Sedang Dikirim
                                        </span>
                                    )}
                                    {order.status_pengiriman === 'SUKSES' && (
                                        <span className='font-extrabold text-green-500'>
                                            Sudah Dikirim
                                        </span>
                                    )}{' '}
                                    {order.status_pengiriman === 'GAGAL' && (
                                        <span className='font-extrabold text-red-500'>
                                            GAGAL
                                        </span>
                                    )}{' '}
                                </p>
                                <p>
                                    Total Harga:{' '}
                                    {order.total_harga?.toLocaleString('id-Id')}
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
                                        {order.Transaction.transaction_id ? (
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
                                                Anda Belum Melakukan Transaksi
                                            </h2>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    )
}

export default OrderDetailPage
