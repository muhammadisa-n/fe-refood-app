import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IsAdmin from '@utils/middleware/IsAdmin'
import IsLoggedIn from '@utils/middleware/IsLoggedIn'
import IsSeller from '@utils/middleware/IsSeller'
import IsCustomer from '@utils/middleware/IsCustomer'
import IsAdminAndSeller from '@utils/middleware/IsAdminAndSeller'
import HomePage from '@pages/Home'
import LoginPage from '@pages/Login'
import RegisterPage from '@pages/Register'
import NotFoundPage from '@pages/NotFound'
import RecommendationPage from '@pages/Recommendation'
import CartsPage from '@pages/Carts'
import MyProfilePage from '@pages/MyProfile'
import MyOrderPage from '@pages/MyOrders'
import AccessForbiddenPage from '@pages/AccesForbidden'
import VerificationEmailPage from '@pages/VerificationEmail'
import ForgotPasswordPage from '@pages/ForgotPassword'
import ResetPasswordPage from '@pages/ResetPassword'
import MyDashboardPage from '@pages/MyDashboard'
import DashboardProfilePage from '@pages/MyDashboard/MyProfile'
import SellerProductsPage from '@pages/MyDashboard/Seller/Products'
import SellerCreateProductPage from '@pages/MyDashboard/Seller/Products/create'
import SellerUpdateProductPage from '@pages/MyDashboard/Seller/Products/update'
import SellerOrdersPage from '@pages/MyDashboard/Seller/Orders'
import AdminProductsPage from '@pages/MyDashboard/Admin/Products'
import AdminDetailProductPage from '@pages/MyDashboard/Admin/Products/detail'
import DetailProductPage from '@pages/DetailProduct'
import AdminCategoryPage from '@pages/MyDashboard/Admin/Category'
import AdminCreateCategoryPage from '@pages/MyDashboard/Admin/Category/create'
import AdminUpdateCategoryPage from '@pages/MyDashboard/Admin/Category/update'
import ScrollToTop from '@utils/ScrollToTop'
import VerificationSellerPage from '@pages/MyDashboard/Seller/VerificationSeller'
import AdminSellerListPage from '@pages/MyDashboard/Admin/User/Seller'
import AdminDetailSellerPage from '@pages/MyDashboard/Admin/User/Seller/detail'
const RoutesPage = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* PublicRoute */}
                <Route exact path='/' element={<HomePage />} />
                <Route
                    path='/product/detail/:id'
                    element={<DetailProductPage />}
                />
                <Route
                    path='/recommendation'
                    element={<RecommendationPage />}
                />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/verification-email'
                    element={<VerificationEmailPage />}
                />{' '}
                <Route
                    path='/forgot-password'
                    element={<ForgotPasswordPage />}
                />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
                {/* Protected Routes */}
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
                                <MyProfilePage />
                            </IsCustomer>
                        }
                    />
                    {/* Seller And Admin Route */}
                    <Route
                        path='/my-dashboard'
                        element={
                            <IsAdminAndSeller>
                                <MyDashboardPage />
                            </IsAdminAndSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/profile'
                        element={
                            <IsAdminAndSeller>
                                <DashboardProfilePage />
                            </IsAdminAndSeller>
                        }
                    />
                    {/* End Seller And Admin Route */}
                    {/* Selle Route*/}
                    <Route
                        path='/my-dashboard/seller/products'
                        element={
                            <IsSeller>
                                <SellerProductsPage />
                            </IsSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/seller/products/create'
                        element={<SellerCreateProductPage />}
                    />
                    <Route
                        path='/my-dashboard/seller/activate'
                        element={<VerificationSellerPage />}
                    />
                    <Route
                        path='/my-dashboard/seller/products/update/:id'
                        element={<SellerUpdateProductPage />}
                    />
                    <Route
                        path='/my-dashboard/seller/orders'
                        element={
                            <IsSeller>
                                <SellerOrdersPage />
                            </IsSeller>
                        }
                    />
                </Route>
                {/*End Seller Routes*/}
                {/*Admin Routes*/}
                <Route
                    path='/my-dashboard/admin/products'
                    element={
                        <IsAdmin>
                            <AdminProductsPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/sellers'
                    element={
                        <IsAdmin>
                            <AdminSellerListPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/sellers/detail/:id'
                    element={
                        <IsAdmin>
                            <AdminDetailSellerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/products/detail/:id'
                    element={
                        <IsAdmin>
                            <AdminDetailProductPage />
                        </IsAdmin>
                    }
                />{' '}
                <Route
                    path='/my-dashboard/admin/category'
                    element={
                        <IsAdmin>
                            <AdminCategoryPage />
                        </IsAdmin>
                    }
                />{' '}
                <Route
                    path='/my-dashboard/admin/category/create'
                    element={
                        <IsAdmin>
                            <AdminCreateCategoryPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/category/update/:id'
                    element={
                        <IsAdmin>
                            <AdminUpdateCategoryPage />
                        </IsAdmin>
                    }
                />
                {/*End Admin Routes*/}
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
