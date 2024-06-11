import React, { useEffect, useState } from 'react'
import { useCart } from '@context/CartContext'
import CartItem from '@components/CartItem/index.jsx'
import MainLayout from '@layouts/MainLayout'
const CartsPage = () => {
    const { carts, refreshCart } = useCart()
    useEffect(() => {
        refreshCart()
    }, [])
    return (
        <MainLayout>
            {carts.length === 0 ? (
                <div className='flex items-center justify-center max-w-full min-h-screen'>
                    <div>
                        <h5 className='text-center text-slate-400 text-4xl'>
                            Your Cart is Empty
                        </h5>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-2 mx-10 my-10 md:grid-cols-5'>
                    {carts?.map((cart) => (
                        <CartItem
                            key={cart.id}
                            productId={cart.product_id}
                            imgSrc={cart.Product.product_url_image}
                            name={cart.Product.name}
                            totalPrice={cart.total_price}
                            quantity={cart.total_product}
                        />
                    ))}
                </div>
            )}
        </MainLayout>
    )
}

export default CartsPage
