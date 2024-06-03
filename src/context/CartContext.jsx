import React, { createContext, useState, useContext } from 'react'
import {
    addCart,
    deleteCart,
    getAllCarts,
} from '@utils/services/cartServices.js'

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [carts, setCart] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const refreshCart = async () => {
        if (token) {
            const response = await getAllCarts([])
            setCart(response)
        }
    }

    const addToCart = async (productId) => {
        try {
            if (token) {
                const response = await addCart(productId)
                return response
                getAllCart()
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const removeCart = async (productId) => {
        if (token) {
            const response = await deleteCart(productId)
            await refreshCart()
            return response
        }
    }

    return (
        <CartContext.Provider
            value={{ carts, refreshCart, addToCart, removeCart }}>
            {children}
        </CartContext.Provider>
    )
}
