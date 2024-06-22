import React, { createContext, useState, useContext } from 'react'
import { getAllCarts } from '@utils/services/customerServices.js'

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [carts, setCart] = useState([])
    const token = localStorage.getItem('access_token') || ''
    const refreshCart = async () => {
        if (token !== '') {
            const response = await getAllCarts()
            setCart(response)
        }
    }

    return (
        <CartContext.Provider value={{ carts, refreshCart }}>
            {children}
        </CartContext.Provider>
    )
}
