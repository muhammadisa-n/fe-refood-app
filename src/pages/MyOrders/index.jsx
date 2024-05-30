import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'

const MyOrderPage = () => {
    return (
        <>
            <Header />
            <div className='flex items-center justify-center max-w-full min-h-screen bg-light'>
                <div>
                    <h1 className='text-3xl font-semibold text-primary font-inter'>
                        Ini My Order Page
                    </h1>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyOrderPage
