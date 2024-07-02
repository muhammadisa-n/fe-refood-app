import React, { useState, useEffect } from 'react'
import MainLayout from '@layouts/MainLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    getDetailOrder,
    UpdateOrderTransaction,
} from '@utils/services/customerServices'
import axiosJWT from '../../utils/services/axiosJWT'
import { FaWhatsapp } from 'react-icons/fa'
const CheckOutPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [orderNotFound, setOrderNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const fetchOrder = async () => {
        try {
            const response = await getDetailOrder(id)
            setOrder(response)
            setTokenTransaction(response.token_transaction)
        } catch (error) {
            if (error.status_code === 404) {
                setOrderNotFound(true)
            }
        }
    }
    useEffect(() => {
        fetchOrder()
        console.log(order)
    }, [id])

    const handleCheckOut = () => {
        setIsLoading(true)
        window.snap.pay(order?.token_transaction, {
            onSuccess: async (result) => {
                const data = {
                    status_order: 'SUKSES',
                    transaction_id: result.transaction_id,
                    tipe_pembayaran: result.payment_type,
                    status_transaksi: result.transaction_status,
                    total_pembayaran: parseInt(result.gross_amount),
                    waktu_transaksi: new Date(result.transaction_time),
                }
                try {
                    await UpdateOrderTransaction(result.order_id, data)
                } catch (error) {
                    console.error(error.message)
                    setIsLoading(false)
                } finally {
                    setIsLoading(false)
                    fetchOrder()
                }
            },
            onPending: async (result) => {
                const data = {
                    status_order: 'PENDING',
                    transaction_id: result.transaction_id,
                    tipe_pembayaran: result.payment_type,
                    status_transaksi: result.transaction_status,
                    total_pembayaran: parseInt(result.gross_amount),
                    waktu_transaksi: new Date(result.transaction_time),
                }
                try {
                    await UpdateOrderTransaction(result.order_id, data)
                } catch (error) {
                    console.error(error.message)
                    setIsLoading(false)
                } finally {
                    setIsLoading(false)
                    fetchOrder()
                }
            },
            onError: async (result) => {
                const data = {
                    status_order: 'GAGAL',
                    transaction_id: result.transaction_id,
                    tipe_pembayaran: result.payment_type,
                    status_transaksi: result.transaction_status,
                    total_pembayaran: parseInt(result.gross_amount),
                    waktu_transaksi: new Date(result.transaction_time),
                }
                try {
                    await UpdateOrderTransaction(result.order_id, data)
                } catch (error) {
                    console.error(error.message)
                    setIsLoading(false)
                } finally {
                    setIsLoading(false)
                    fetchOrder()
                }
            },
            onClose: function () {
                console.log('closed the popup without finishing the payment')
                setIsLoading(false)
            },
        })
    }
    useEffect(() => {
        const midtransURL = 'https://app.sandbox.midtrans.com/snap/snap.js'
        let scriptTag = document.createElement('script')
        scriptTag.src = midtransURL

        const midtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY
        scriptTag.setAttribute('data-client-key', midtransClientKey)
        document.body.appendChild(scriptTag)
        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])
    const convertPhoneNumber = (phoneNumber) => {
        if (phoneNumber?.startsWith('08')) {
            return '62' + phoneNumber.slice(1)
        }
        return phoneNumber
    }
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
                <div className='flex flex-col items-center min-h-screen py-10 bg-gray-100'>
                    <div className='flex flex-col w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg md:flex-row'>
                        <div className='mb-4 md:w-3/4 md:pr-4 md:mb-0'>
                            <h1 className='mb-4 text-2xl font-bold'>
                                Checkout
                            </h1>
                            <div className='mb-4'>
                                <img
                                    src={order.Product?.image_url}
                                    alt='product-image'
                                    className='w-full h-auto md:w-[500px] object-cover  mb-4 rounded-lg shadow-md'
                                />
                                <h2 className='text-lg font-semibold'>
                                    {order.Product?.nama}
                                </h2>
                                <p className='mt-2 text-xl font-bold'>
                                    Harga Satuan: Rp{' '}
                                    {order.Product?.harga.toLocaleString(
                                        'id-Id'
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Bagian Kanan - Detail Pesanan */}
                        <div className='md:w-1/4 md:pl-4'>
                            <h1 className='mb-4 text-2xl font-bold'>
                                Detail Pesanan
                            </h1>
                            <div className='mb-4'>
                                <h2 className='text-lg font-semibold'>
                                    Informasi Pelanggan
                                </h2>
                                <p>Nama: {order.Customer?.nama}</p>
                                <p>No Hp: {order.Customer?.no_hp}</p>
                                <p>Alamat:{order.alamat_pengiriman}</p>
                                <p>Jumlah Pesanan:{order.total_produk}</p>
                            </div>
                            <div className='mb-4'>
                                <h2 className='text-lg font-semibold'>
                                    Total Pembayaran
                                </h2>
                                <p className='text-xl font-bold'>
                                    Rp{' '}
                                    {order.total_harga?.toLocaleString('id-Id')}
                                </p>
                            </div>
                            {order.status_order !== 'SUKSES' ? (
                                <button
                                    disabled={isLoading}
                                    className={`w-full py-2 font-semibold text-white rounded-lg bg-primary ${isLoading ? 'bg-orange-800' : ''}`}
                                    onClick={() => handleCheckOut()}>
                                    Bayar
                                </button>
                            ) : (
                                <>
                                    <button
                                        className='w-full py-2 font-semibold text-white bg-green-800 rounded-lg'
                                        disabled={true}>
                                        Sudah Dibayar
                                    </button>
                                    <a
                                        type='button'
                                        href={`https://wa.me/${convertPhoneNumber(order.Product?.Seller?.no_hp)}?text=Halo,%20saya%20${order.Customer?.nama}%20Telah Melakukan%20Pembayaran%20Produk%20${order.Product?.nama},%20Mohon%20Untuk%20Segera%20Diproses`}
                                        className='inline-flex w-full py-2 mt-2 font-semibold text-white bg-green-500 rounded-lg'
                                        target='_blank'>
                                        <FaWhatsapp
                                            size={24}
                                            className='mx-2'
                                        />
                                        Hubungi Penjual
                                    </a>
                                </>
                            )}
                            <Link
                                to={`${isLoading === true ? '' : '/my-orders'}`}
                                className='inline-block w-full py-2 mt-4 font-semibold text-center text-white bg-black rounded-lg'>
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default CheckOutPage
