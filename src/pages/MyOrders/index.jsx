import React from 'react'
import MainLayout from '@layouts/MainLayout'

const MyOrderPage = () => {
    return (
        <MainLayout>
            <div className='flex items-center justify-center max-w-full min-h-screen '>
                <div>
                    <h5 className='text-center text-slate-400 text-4xl'>
                        Your Orders is Empty
                    </h5>
                </div>
            </div>
        </MainLayout>
    )
}

export default MyOrderPage
