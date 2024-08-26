import React, { useState, useEffect } from 'react'
import MainLayout from '@layouts/MainLayout'
import { getAllOrder } from '@utils/services/customerServices'
import OrderItem from '@components/OrderItem/index.jsx'

const MyOrderPage = () => {
    const [orders, serOrders] = useState([])
    const fetchOrders = async () => {
        const response = await getAllOrder()

        serOrders(response)
    }
    useEffect(() => {
        fetchOrders()
    }, [])
    return (
        <MainLayout>
            {orders.length === 0 ? (
                <div className='flex items-center justify-center max-w-full min-h-screen'>
                    <div>
                        <h5 className='text-4xl text-center text-slate-400'>
                            Your Orders is Empty
                        </h5>
                    </div>
                </div>
            ) : (
                <div className='container min-h-screen py-10 mx-auto'>
                    <div className='flex flex-wrap'>
                        {orders.map((order) => (
                            <OrderItem
                                key={order.id}
                                imgSrc={order.OrderItems[0].Product.image_url}
                                orderId={order.id}
                                productName={
                                    order.OrderItems.length > 1
                                        ? `${order.OrderItems[0].Product.nama} ...`
                                        : order.OrderItems[0].Product.nama
                                }
                                totalHarga={order.total_pembayaran}
                                totalProduct={order.total_produk}
                                statusTransaksi={order.status_transaksi}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default MyOrderPage
