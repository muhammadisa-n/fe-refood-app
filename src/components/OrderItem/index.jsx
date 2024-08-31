import React from 'react'
import { Link } from 'react-router-dom'

const OrderItem = ({
    imgSrc,
    orderId,
    productName,
    totalHarga,
    totalProduct,

    statusTransaksi,
}) => {
    return (
        <div className='w-full px-4 lg:w-1/3 ' key={orderId}>
            <div className='flex mb-10 overflow-hidden shadow-lg rounded-xl'>
                <img
                    src={imgSrc}
                    alt='product-Image'
                    className='w-[150px] h-[150px] px-2 py-2 rounded-md'
                />
                <div className='px-4 py-4'>
                    <p className='text-xl font-semibold'>{productName}</p>
                    <p className='mt-2 text-sm'>
                        Total Bayar : Rp. {totalHarga}
                    </p>
                    <p className='mt-2 text-sm'>
                        Total Produk : {totalProduct}
                    </p>
                    <p className='mt-2 '>
                        Status :{' '}
                        {statusTransaksi === 'PENDING' ? (
                            <span className='px-2 py-1 text-base font-extrabold text-gray-500 rounded-lg'>
                                {statusTransaksi}
                            </span>
                        ) : (
                            ''
                        )}
                        {statusTransaksi === 'PAID' ? (
                            <span className='px-2 py-1 text-base font-extrabold text-green-500 rounded-lg'>
                                {statusTransaksi}
                            </span>
                        ) : (
                            ''
                        )}
                        {statusTransaksi === 'FAIL' ||
                        statusTransaksi === 'CANCEL' ? (
                            <span className='px-2 py-1 text-base font-extrabold text-red-500 rounded-lg'>
                                {statusTransaksi}
                            </span>
                        ) : (
                            ''
                        )}
                    </p>
                    <div className='flex justify-between gap-4 mt-5'>
                        <div>
                            <Link
                                to={`/my-orders/detail/${orderId}`}
                                className='px-2 py-1 mx-auto text-white bg-green-500 rounded-lg'>
                                Detail
                            </Link>
                        </div>
                        {statusTransaksi === 'PAID' ||
                        statusTransaksi === 'CANCEL' ||
                        statusTransaksi === 'FAIL' ? (
                            ''
                        ) : (
                            <div>
                                <Link
                                    to={`/my-orders/checkout/${orderId}`}
                                    className='px-2 py-1 mx-auto text-white rounded-lg bg-primary'>
                                    Bayar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem
