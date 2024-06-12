import React from 'react'
import RoutesPage from './Routes'
import { CartProvider } from '@context/CartContext'
import { UserProvider } from '@context/userContext.jsx'
const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <RoutesPage />
            </CartProvider>
        </UserProvider>
    )
}

export default App
