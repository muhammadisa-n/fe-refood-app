import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import { getDetailCustomer } from '@utils/services/adminServices'
import profileImage from '@assets/userdefault.png'
const AdminDetailCustomerPage = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState([])
    const [customerNotFound, setCustomertNotFound] = useState(false)

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getDetailCustomer(id)
                setCustomer(response)
            } catch (error) {
                if (error.status_code === 404) {
                    setCustomertNotFound(true)
                }
            }
        }
        fetchCustomer()
    }, [id])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Detail Customer
                    </h1>
                </div>
                {customerNotFound ? (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <h5 className='text-2xl text-center'>
                            Customer Not Found
                        </h5>
                    </div>
                ) : (
                    <div className='pb-4 mt-5'>
                        <div className='flex flex-col max-w-full mt-10'>
                            <div className='container px-4 py-8 mx-auto'>
                                <div className='w-full mx-auto bg-white rounded-lg shadow-md'>
                                    <div
                                        className={`justify-between md:flex  w-full`}>
                                        <div className='px-4 py-8'>
                                            <img
                                                className='object-cover w-full h-48 rounded-full md:w-48'
                                                src={
                                                    customer?.ava_image_url
                                                        ? customer.ava_image_url
                                                        : profileImage
                                                }
                                                alt='Profil-image'
                                            />
                                        </div>
                                        <div className='flex items-start px-4 py-8'>
                                            <div>
                                                <h2 className='text-2xl font-semibold text-gray-800'>
                                                    {customer?.nama}
                                                </h2>
                                                <p className='mt-2 text-gray-600'>
                                                    Email: {customer?.email}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Phone: {customer?.no_hp}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Address:{' '}
                                                    {`${customer?.alamat}, ${customer?.kelurahan} ${customer?.kecamatan}, ${customer?.kota}, ${customer?.provinsi}, ${customer?.kode_pos}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdminDetailCustomerPage
