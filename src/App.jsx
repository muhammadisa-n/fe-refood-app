import React, { useLayoutEffect } from 'react'
import RoutesPage from './Routes'
import { CartProvider } from '@context/CartContext'
import { useLocation } from 'react-router-dom'
const App = () => {
    return (
        <CartProvider>
            <RoutesPage />
        </CartProvider>
    )
}

export default App
