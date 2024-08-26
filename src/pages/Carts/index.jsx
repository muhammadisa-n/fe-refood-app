import React, { useEffect, useState } from 'react'
import { useCart } from '@context/CartContext'
import CartItem from '@components/CartItem/index.jsx'
import MainLayout from '@layouts/MainLayout'
import { useNavigate } from 'react-router-dom'

const CartsPage = () => {
    const { carts, refreshCart } = useCart()

    const navigate = useNavigate()

    return (
        <MainLayout>
            <div className='max-w-screen-lg py-8 mx-auto'>
                {carts.length === 0 ? (
                    <div className='flex items-center justify-center max-w-full'>
                        <div>
                            <h5 className='text-4xl text-center text-slate-400'>
                                Your Cart is Empty
                            </h5>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='mb-8 text-4xl font-bold text-primary '>
                            Carts Page
                        </h1>
                        {carts.map((cart) => (
                            <div
                                className='px-2 py-2 my-2 border rounded-sm'
                                key={cart.id}>
                                <CartItem cartItems={cart.CartItems} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default CartsPage
