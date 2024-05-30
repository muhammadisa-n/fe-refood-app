import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/Home'
import LoginPage from '@pages/Login'
import RegisterPage from '@pages/Register'
import NotFoundPage from '@pages/NotFound'
import RecomendationPage from '@pages/Recomendation'
import CartsPage from '@pages/Carts'
import MyDashboard from '@pages/MyDashboard'
import IsLoggedIn from '@utils/middleware/IsLoggedIn'
import MyProfile from '@pages/MyProfile'
import MyOrderPage from '@pages/MyOrders'
import AccessForbiddenPage from '@pages/AccesForbidden'
import IsSeller from '@utils/middleware/IsSeller'
import IsCustomer from '@utils/middleware/IsCustomer'
import DashboardProfile from '@pages/MyDashboard/MyProfile'
import MyProducts from '@pages/MyDashboard/Seller/MyProducts'
import CreateProduct from '@pages/MyDashboard/Seller/MyProducts/create'
import EditProduct from '@pages/MyDashboard/Seller/MyProducts/edit'
import SellerOrders from '@pages/MyDashboard/Seller/Orders'
import IsAdminAndSeller from '@utils/middleware/IsAdminAndSeller'
const RoutesPage = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* PublicRoute */}
                <Route exact path='/' element={<HomePage />} />
                <Route path='/recomendation' element={<RecomendationPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                {/* Protectted Routes */}
                <Route element={<IsLoggedIn />}>
                    {/* Customer Route */}
                    <Route
                        path='/carts'
                        element={
                            <IsCustomer>
                                <CartsPage />
                            </IsCustomer>
                        }
                    />
                    <Route
                        path='/my-orders'
                        element={
                            <IsCustomer>
                                <MyOrderPage />
                            </IsCustomer>
                        }
                    />
                    <Route
                        path='/my-profile'
                        element={
                            <IsCustomer>
                                <MyProfile />
                            </IsCustomer>
                        }
                    />
                    {/* Seller And Admin Route */}
                    <Route
                        path='/my-dashboard'
                        element={
                            <IsAdminAndSeller>
                                <MyDashboard />
                            </IsAdminAndSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/profile'
                        element={
                            <IsAdminAndSeller>
                                <DashboardProfile />
                            </IsAdminAndSeller>
                        }
                    />
                    {/* SeLler Route */}
                    <Route
                        path='/my-dashboard/seller/products'
                        element={
                            <IsSeller>
                                <MyProducts />
                            </IsSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/seller/products/create'
                        element={<CreateProduct />}
                    />
                    <Route
                        path='/my-dashboard/seller/products/edit/:id'
                        element={<EditProduct />}
                    />
                    <Route
                        path='/my-dashboard/seller/orders'
                        element={
                            <IsSeller>
                                <SellerOrders />
                            </IsSeller>
                        }
                    />
                </Route>

                {/* Route Not Found  and Access Forbidden */}
                <Route
                    path='/access-forbidden'
                    element={<AccessForbiddenPage />}
                />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesPage
