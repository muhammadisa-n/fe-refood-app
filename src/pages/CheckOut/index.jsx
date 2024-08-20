import React, { useState, useEffect } from 'react'
import MainLayout from '@layouts/MainLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailOrder, updateOrder } from '@utils/services/customerServices'
import { FaWhatsapp } from 'react-icons/fa'

const CheckOutPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [orderNotFound, setOrderNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [jenisLayanan, setJenisLayanan] = useState('')
    const navigate = useNavigate()

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

    useEffect(() => {
        fetchOrder()
    }, [id])

    const handleCheckOut = () => {
        setIsLoading(true)
        window.snap.pay(order?.token_transaction, {
            onSuccess: async (result) => {
                const data = {
                    status_transaksi: 'PAID',
                    tipe_pembayaran: result.payment_type,
                    waktu_transaksi: new Date(result.transaction_time),
                    token_transaction: null,
                    jenis_layanan: jenisLayanan,
                }
                try {
                    await updateOrder(result.order_id, data)
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
                    status_transaksi: 'PENDING',
                    tipe_pembayaran: result.payment_type,
                    jenis_layanan: jenisLayanan,
                }
                try {
                    await updateOrder(result.order_id, data)
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
                    status_order: 'CANCEL',
                    status_transaksi: 'FAIL',
                    tipe_pembayaran: result.payment_type,
                    waktu_transaksi: new Date(result.transaction_time),
                    token_transaction: null,
                    jenis_layanan: jenisLayanan,
                }
                try {
                    await updateOrder(result.order_id, data)
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
        // const midtransURL = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const midtransURL = 'https://app.midtrans.com/snap/snap.js'
        let scriptTag = document.createElement('script')
        scriptTag.src = midtransURL
        const midtransClientKey = import.meta.env.PROD_MIDTRANS_CLIENT_KEY
        // const midtransClientKey = import.meta.env.DEV_MIDTRANS_CLIENT_KEY
        scriptTag.setAttribute('data-client-key', midtransClientKey)
        document.body.appendChild(scriptTag)
        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])

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
                            {order.OrderProducts?.map((item, index) => (
                                <div
                                    className='flex items-center justify-between py-4 border-b'
                                    key={index}>
                                    <div className='flex items-center'>
                                        <img
                                            src={item.Product?.image_url}
                                            className='object-cover w-16 h-16 mr-4 rounded-lg'
                                        />
                                        <div>
                                            <h2 className='text-lg font-semibold'>
                                                {item.Product?.nama}
                                            </h2>
                                            <p className='text-gray-500'>
                                                Rp{' '}
                                                {item.Product?.harga?.toLocaleString(
                                                    'id-ID'
                                                )}
                                            </p>
                                            <p className='text-gray-600'>
                                                Jumlah: x{item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bagian Kanan - Detail Pesanan */}
                        <div className='md:w-1/4 md:pl-4'>
                            <div className='mb-4'>
                                <h2 className='mt-10 text-lg font-semibold'>
                                    Informasi Pelanggan
                                </h2>
                                <p>Nama: {order.Customer?.nama}</p>
                                <p>No Hp: {order.Customer?.no_hp}</p>
                                <p>Total Produk:{order.total_produk}</p>
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
                            <div className='mb-4'>
                                <h2 className='text-lg font-semibold'>
                                    Pilihan Layanan
                                </h2>
                                <select
                                    disabled={order.status_transaksi === 'PAID'}
                                    value={jenisLayanan}
                                    onChange={(e) =>
                                        setJenisLayanan(e.target.value)
                                    }
                                    className='w-full py-2 mt-2 border rounded-lg'>
                                    <option value='Makan di Tempat'>
                                        Makan di Tempat
                                    </option>
                                    <option value='Ambil di Tempat'>
                                        Ambil di Tempat
                                    </option>
                                </select>
                            </div>
                            {order.status_transaksi !== 'PAID' ? (
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
