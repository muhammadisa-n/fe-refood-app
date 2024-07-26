import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import AlertMessage from '@components/AlertMessage/index.jsx'
import Button from '@components/Button/index.jsx'
import Swal from 'sweetalert2'
import { getDetailOrder } from '@utils/services/sellerServices'
import { UpdateStatusOrder } from '@utils/services/sellerServices'

const SellerUpdateOrderPage = () => {
    const { id } = useParams()
    const [selectedStatusOrder, setSelectedStatusOrder] = useState('')
    const navigate = useNavigate()
    const [errorMessage, SetErrorMessage] = useState('')
    const [orderNotFound, setOrderNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await getDetailOrder(id)
                setSelectedStatusOrder(order.status_order)
            } catch (error) {
                if (error.status_code === 404) {
                    setOrderNotFound(true)
                }
                console.error(error)
            }
        }
        fetchOrder()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            status_order: selectedStatusOrder,
        }
        try {
            const response = await UpdateStatusOrder(id, data)
            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 2000,
            })
            navigate('/my-dashboard/seller/orders')
        } catch (error) {
            SetErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <DashboardLayout>
                <div className='px-6 pt-6 '>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-semibold text-primary'>
                            Update Status Order
                        </h1>
                    </div>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/seller/orders'
                            className='px-2 py-2 text-white bg-red-500 rounded-lg'>
                            Back
                        </Link>
                    </div>
                    <div className=' w-[60%] items-center justify-center pb-4 mt-5 '>
                        {errorMessage && (
                            <AlertMessage
                                colorBg='text-red-800 bg-red-50'
                                onClick={() => SetErrorMessage('')}
                                colorBtn='bg-red-50 text-red-500'>
                                {errorMessage}
                            </AlertMessage>
                        )}
                        {orderNotFound === true ? (
                            <>
                                <div
                                    className={`flex items-center p-4 mb-4  rounded-lg  text-red-800 bg-red-50`}
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
                                        Order Not Found
                                    </div>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <div className='mb-6'>
                                    <label
                                        htmlFor='status_pengiriman'
                                        className='block mb-2 text-sm font-bold text-slate-700'>
                                        Status Order
                                    </label>
                                    <select
                                        name='status_order'
                                        id='status_order'
                                        value={selectedStatusOrder}
                                        onChange={(e) =>
                                            setSelectedStatusOrder(
                                                e.target.value
                                            )
                                        }
                                        disabled={isLoading}
                                        className={`w-full px-3 py-2 text-sm border rounded text-slate-700 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                        {selectedStatusOrder === 'PENDING' && (
                                            <>
                                                <option
                                                    value={selectedStatusOrder}>
                                                    PENDING
                                                </option>
                                                <option value='PROSES'>
                                                    PROSES
                                                </option>
                                            </>
                                        )}
                                        {selectedStatusOrder === 'PROSES' && (
                                            <>
                                                <option
                                                    value={selectedStatusOrder}>
                                                    PROSES
                                                </option>
                                                <option value='PENDING'>
                                                    PENDING
                                                </option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <Button
                                    disabled={isLoading}
                                    classname={`w-[30%] bg-primary relative ${isLoading ? 'opacity-50' : ''}`}>
                                    {isLoading ? (
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
                                        </div>
                                    ) : (
                                        'Update Status'
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default SellerUpdateOrderPage
