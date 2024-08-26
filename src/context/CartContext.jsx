import React, { createContext, useState, useContext } from 'react'
import { getAllCarts } from '@utils/services/customerServices.js'

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [carts, setCart] = useState([])
    const [cartsItems, setCartItems] = useState([])
    const token = localStorage.getItem('access_token') || ''
    const refreshCart = async () => {
        if (token !== '') {
            const response = await getAllCarts()
            setCart(response)
            const allCartItems = response.reduce((items, cart) => {
                return items.concat(cart.CartItems)
            }, [])
            setCartItems(allCartItems)
        }
    }

    return (
        <CartContext.Provider value={{ carts, refreshCart, cartsItems }}>
            {children}
        </CartContext.Provider>
    )
}
