import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import { getDetailOrder } from '@utils/services/sellerServices'
import moment from 'moment-timezone'
const SellerDetailOrdersPage = () => {
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
                                    <p>Nama: {order.Customer?.nama}</p>
                                    <p>Nomor HP: {order.Customer?.no_hp}</p>
                                    <p>
                                        Status Order:{' '}
                                        {order.status_order === 'PENDING' && (
                                            <span className='font-extrabold text-gray-500'>
                                                {order.status_order}
                                            </span>
                                        )}
                                        {order.status_order === 'SUKSES' && (
                                            <span className='font-extrabold text-green-500'>
                                                {order.status_order}
                                            </span>
                                        )}{' '}
                                        {order.status_order === 'SELESAI' && (
                                            <span className='font-extrabold text-green-500'>
                                                Selesai Diproses
                                            </span>
                                        )}{' '}
                                        {order.status_order === 'PROSES' && (
                                            <span className='font-extrabold text-yellow-500'>
                                                Sedang Diproses
                                            </span>
                                        )}{' '}
                                        {order.status_order === 'CANCEL' && (
                                            <span className='font-extrabold text-red-500'>
                                                {order.status_order}
                                            </span>
                                        )}{' '}
                                    </p>
                                    <p>
                                        Status Transaksi:{' '}
                                        {order.status_transaksi === 'PAID' && (
                                            <span className='font-extrabold text-green-500'>
                                                {order.status_transaksi}
                                            </span>
                                        )}
                                        {order.status_transaksi ===
                                            'PENDING' && (
                                            <span className='font-extrabold text-gray-500'>
                                                {order.status_transaksi}
                                            </span>
                                        )}
                                        {order.status_transaksi === 'FAIL' && (
                                            <span className='font-extrabold text-red-500'>
                                                {order.status_transaksi}
                                            </span>
                                        )}{' '}
                                        {order.status_transaksi ===
                                            'CANCEL' && (
                                            <span className='font-extrabold text-red-500'>
                                                {order.status_transaksi}
                                            </span>
                                        )}{' '}
                                    </p>
                                    <p>Jenis Layanan: {order?.jenis_layanan}</p>
                                    <p>
                                        Waktu Order:{' '}
                                        {moment(order?.created_at).format(
                                            ' DD-MM-YYYY HH:mm:ss'
                                        )}
                                    </p>

                                    {order.waktu_transaksi !== null && (
                                        <p>
                                            Waktu Transaksi:{' '}
                                            {moment(order?.waktu_transaksi)
                                                .tz('Asia/Jakarta')
                                                .format('DD-MM-YYYY HH:mm:ss')}
                                        </p>
                                    )}
                                    <p>Products: {order.Product?.nama}</p>
                                    <table className='min-w-full bg-white border border-primary'>
                                        <thead className='text-white bg-primary'>
                                            <tr className=''>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Image
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Nama Produk
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Quantity
                                                </th>
                                                <th className='px-4 py-2 border border-gray-200'>
                                                    Harga
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.OrderProducts?.map(
                                                (item) => (
                                                    <>
                                                        <tr
                                                            key={
                                                                item.Product?.id
                                                            }>
                                                            <td className='px-4 py-2 border border-gray-200'>
                                                                <img
                                                                    src={
                                                                        item
                                                                            .Product
                                                                            .image_url
                                                                    }
                                                                    alt={
                                                                        item
                                                                            .Product
                                                                            .nama
                                                                    }
                                                                    className='object-cover w-16 h-16 rounded '
                                                                />
                                                            </td>
                                                            <td className='px-4 py-2 border border-gray-200'>
                                                                {
                                                                    item.Product
                                                                        .nama
                                                                }
                                                            </td>
                                                            <td className='px-4 py-2 border border-gray-200'>
                                                                {item.quantity}
                                                            </td>
                                                            <td className='px-4 py-2 border border-gray-200'>
                                                                Rp.
                                                                {item.Product.harga?.toLocaleString(
                                                                    'id-ID'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            )}
                                            <tr>
                                                <td
                                                    className='px-4 py-2 border border-gray-200'
                                                    colSpan='3'
                                                    rowSpan='2'>
                                                    Total
                                                </td>
                                                <td className='px-4 py-2 border border-gray-200'>
                                                    Total Produk :{' '}
                                                    {order.total_produk}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='px-4 py-2 border border-gray-200'>
                                                    Total Harga: Rp.
                                                    {order.total_harga?.toLocaleString(
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
