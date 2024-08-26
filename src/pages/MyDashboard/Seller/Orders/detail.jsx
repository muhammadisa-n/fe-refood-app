import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import { getDetailOrder } from '@utils/services/sellerServices'
import moment from 'moment-timezone'
const SellerDetailOrdersPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [orderNotFound, setOrderNotFound] = useState(false)
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
                                    <p>Name Customer: {order.Customer?.nama}</p>
                                    <p>Nomor HP: {order.Customer?.no_hp}</p>
                                    <p>
                                        Status Order:{' '}
                                        <span
                                            className={`font-extrabold ${order.status_order === 'PENDING' ? 'text-gray-500' : order.status_order === 'PROSES' ? 'text-yellow-500' : order.status_order === 'SUKSES' ? 'text-green-500' : 'text-red-500'}`}>
                                            {order.status_order}
                                        </span>
                                    </p>
                                    <p>
                                        Status Transaksi:{' '}
                                        <span
                                            className={`font-extrabold ${order.status_transaksi === 'PAID' ? 'text-green-500' : order.status_transaksi === 'PENDING' ? 'text-gray-500' : 'text-red-500'}`}>
                                            {order.status_transaksi}
                                        </span>
                                    </p>

                                    {order?.jenis_layanan && (
                                        <p>
                                            Jenis Layanan: {order.jenis_layanan}
                                        </p>
                                    )}
                                    <p>
                                        Waktu Order:{' '}
                                        {moment(order?.created_at)
                                            .tz('Asia/Jakarta')
                                            .format('DD-MM-YYYY HH:mm:ss')}
                                    </p>
                                    {order.waktu_transaksi && (
                                        <p>
                                            Waktu Transaksi:{' '}
                                            {moment(order?.waktu_transaksi)
                                                .tz('Asia/Jakarta')
                                                .format('DD-MM-YYYY HH:mm:ss')}
                                        </p>
                                    )}

                                    {order.status_order === 'PROSES' &&
                                        order.status_transaksi === 'PAID' && (
                                            <button
                                                className='px-2 py-2 mt-4 text-white rounded-md bg-primary'
                                                onClick={() =>
                                                    handleUpdateStatus(order.id)
                                                }>
                                                Pesanan Selesai
                                            </button>
                                        )}

                                    <div className='mt-2 mb-2'>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    '/my-dashboard/seller/orders'
                                                )
                                            }
                                            className='px-3 py-1 mx-auto text-white rounded-lg bg-primary'>
                                            Back
                                        </button>
                                    </div>

                                    <table className='min-w-full bg-white border border-primary'>
                                        <thead className='text-white bg-primary'>
                                            <tr>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    No
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Image
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Product Name
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Harga Satuan
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Total Produk
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Total Harga
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.OrderItems?.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td className='px-4 py-2 text-center border border-gray-200'>
                                                            {index + 1}
                                                        </td>
                                                        <td className='px-4 py-2 border border-gray-200'>
                                                            <img
                                                                src={
                                                                    item.Product
                                                                        .image_url
                                                                }
                                                                alt={
                                                                    item.Product
                                                                        .nama
                                                                }
                                                                className='object-cover w-16 h-16 rounded '
                                                            />
                                                        </td>
                                                        <td className='px-4 py-2 text-center border border-gray-200'>
                                                            {item.Product.nama}
                                                        </td>
                                                        <td className='px-4 py-2 text-center border border-gray-200'>
                                                            Rp.{' '}
                                                            {item.Product.harga?.toLocaleString(
                                                                'id-ID'
                                                            )}
                                                        </td>
                                                        <td className='px-4 py-2 text-center border border-gray-200'>
                                                            {
                                                                item.sub_total_produk
                                                            }
                                                        </td>

                                                        <td className='px-4 py-2 text-center border border-gray-200'>
                                                            Rp.{' '}
                                                            {item.sub_total_harga?.toLocaleString(
                                                                'id-ID'
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr>
                                                <td
                                                    className='px-4 py-2 text-center border border-gray-200'
                                                    colSpan='4'>
                                                    Total
                                                </td>
                                                <td className='px-4 py-2 text-center border border-gray-200'>
                                                    Total Produk:{' '}
                                                    {order.total_produk}
                                                </td>
                                                <td className='px-4 py-2 text-center border border-gray-200'>
                                                    Total Pembayaran: Rp.{' '}
                                                    {order.total_pembayaran?.toLocaleString(
                                                        'id-ID'
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
