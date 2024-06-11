import React from 'react'
import RoutesPage from './Routes'
import { CartProvider } from '@context/CartContext'
const App = () => {
    return (
        <CartProvider>
            <RoutesPage />
        </CartProvider>
    )
}

export default App
