import React from 'react'
import { AiFillProduct } from 'react-icons/ai'
import DashboardLayout from '@layouts/DashboardLayout'

const MyDashboard = () => {
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Dashboard
                    </h1>
                </div>
                <div className='grid grid-cols-4 gap-5 pb-4 mt-5 '>
                    {/* card */}
                    <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                        <div>
                            <h2 className='text-base font-bold leading-3 text-primary '>
                                Total Products
                            </h2>
                            <h1 className='text-xl font-bold text-gray-600'>
                                50
                            </h1>
                        </div>
                        <AiFillProduct fontSize={28} className='text-black' />
                    </div>
                    <div className='h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out '>
                        <div>
                            <h2 className='text-base font-bold leading-3 text-primary '>
                                Total Orders
                            </h2>
                            <h1 className='text-xl font-bold text-gray-600'>
                                50
                            </h1>
                        </div>
                        <AiFillProduct fontSize={28} className='text-black' />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyDashboard
