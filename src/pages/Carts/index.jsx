import React, { useEffect } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useCart } from '@context/CartContext'

const CartsPage = () => {
    const { carts, refreshCart } = useCart()
    useEffect(() => {
        refreshCart()
    }, [])
    return (
        <>
            <Header />
            <div className='flex items-center justify-center max-w-full min-h-screen bg-light'>
                <div>
                    <h1 className='text-3xl font-semibold text-primary font-inter'>
                        Ini Carts Page
                        {carts?.map((cart, index) => (
                            <>
                                <p key={index}>cart.productId</p>
                            </>
                        ))}
                    </h1>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CartsPage
