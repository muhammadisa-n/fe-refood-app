import React, { useEffect, useState } from 'react'
import { useCart } from '@context/CartContext'
import CartItem from '@components/CartItem/index.jsx'
import MainLayout from '@layouts/MainLayout'
import { deleteCart } from '@utils/services/customerServices'
import { createOrder } from '../../utils/services/customerServices'
import { useNavigate } from 'react-router-dom'
const CartsPage = () => {
    const { carts, refreshCart } = useCart()
    const navigate = useNavigate()
    const handleRemoveCart = async (productId) => {
        await deleteCart(productId)
        refreshCart()
    }

    const totalBelanja = carts.reduce(
        (total, item) => total + item.total_harga,
        0
    )

    const handleAddToOrder = async () => {
        const products = carts.map((cart) => ({
            product_id: cart.Product.id,
            quantity: cart.total_produk,
        }))
        const data = {
            products: products,
            total_harga: totalBelanja,
        }
        try {
            const response = await createOrder(data)
            navigate(`/my-orders/checkout/${response.dataOrder.id}`)
        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    return (
        <MainLayout>
            <div className='max-w-screen-lg py-8 mx-auto'>
                {carts.length === 0 ? (
                    <div className='flex items-center justify-center max-w-full '>
                        <div>
                            <h5 className='text-4xl text-center text-slate-400'>
                                Your Cart is Empty
                            </h5>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='mb-8 text-4xl font-bold text-primary'>
                            Carts Page
                        </h1>
                        {carts.map((cart) => (
                            <CartItem
                                key={cart.id}
                                product={cart.Product}
                                onRemove={handleRemoveCart}
                                total_harga={cart.total_harga}
                                total_produk={cart.total_produk}
                            />
                        ))}
                        <div className='flex items-center justify-between mt-8'>
                            <p className='text-xl font-semibold'>Total:</p>
                            <p className='text-xl font-semibold'>
                                Rp {totalBelanja.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div
                            className='flex justify-end mt-8'
                            onClick={() => handleAddToOrder()}>
                            <button className='px-4 py-2 text-white rounded-md bg-primary hover:bg-orange-600'>
                                Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default CartsPage
