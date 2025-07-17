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
import DetailProductPage from '@pages/DetailProduct'
import AdminCategoryPage from '@pages/MyDashboard/Admin/Category'
import AdminCreateCategoryPage from '@pages/MyDashboard/Admin/Category/create'
import AdminUpdateCategoryPage from '@pages/MyDashboard/Admin/Category/update'
import ScrollToTop from '@utils/ScrollToTop'
import VerificationSellerPage from '@pages/MyDashboard/Seller/VerificationSeller'
import AdminCustomerListPage from '@pages/MyDashboard/Admin/User/Customer'
import CheckOutPage from '@pages/CheckOut'
import OrderDetailPage from '@pages/OrderDetail'
import SellerDetailOrdersPage from '@pages/MyDashboard/Seller/Orders/detail'
import SellerUpdateOrderPage from '@pages/MyDashboard/Seller/Orders/update'
import AdminDetailCustomerPage from '@pages/MyDashboard/Admin/User/Customer/detail'
import ProductsByPage from './pages/ProductsBy'
import SellerReportSalesPage from './pages/MyDashboard/Seller/Reports/salesReport'
import SellerReportIncomePage from './pages/MyDashboard/Seller/Reports/incomeReport'
import AdminVerificationSellerPage from './pages/MyDashboard/Admin/User/VerificationSeller'
import AdminChangeStatuslSellerPage from './pages/MyDashboard/Admin/User/VerificationSeller/update'
import AdminDataSellerPage from './pages/MyDashboard/Admin/DataSeller'
import AdminDetailDataSellerPage from './pages/MyDashboard/Admin/DataSeller/detail'
import AdminDetailProductPage from './pages/MyDashboard/Admin/DataSeller/detailproduct'

const RoutesPage = () => {
    return (
        <BrowserRouter basename="/refood">
            <ScrollToTop />
            <Routes>
                {/* PublicRoute */}
                <Route exact path='/' element={<HomePage />} />
                <Route
                    path='/product/detail/:id'
                    element={<DetailProductPage />}
                />
                <Route path='/products' element={<ProductsByPage />} />
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
                    <Route
                        path='/recommendation'
                        element={<RecommendationPage />}
                    />
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
                        path='/my-orders/detail/:id'
                        element={
                            <IsCustomer>
                                <OrderDetailPage />
                            </IsCustomer>
                        }
                    />
                    <Route
                        path='/my-orders/checkout/:id'
                        element={
                            <IsCustomer>
                                <CheckOutPage />
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
                        path='/my-dashboard/seller/report-sales'
                        element={
                            <IsSeller>
                                <SellerReportSalesPage />
                            </IsSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/seller/report-income'
                        element={
                            <IsSeller>
                                <SellerReportIncomePage />
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
                    <Route
                        path='/my-dashboard/seller/orders/detail/:id'
                        element={
                            <IsSeller>
                                <SellerDetailOrdersPage />
                            </IsSeller>
                        }
                    />
                    <Route
                        path='/my-dashboard/seller/orders/update/:id'
                        element={
                            <IsSeller>
                                <SellerUpdateOrderPage />
                            </IsSeller>
                        }
                    />
                </Route>
                {/*End Seller Routes*/}
                {/*Admin Routes*/}
                <Route
                    path='/my-dashboard/admin/data-sellers'
                    element={
                        <IsAdmin>
                            <AdminDataSellerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/verify-sellers'
                    element={
                        <IsAdmin>
                            <AdminVerificationSellerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/customers'
                    element={
                        <IsAdmin>
                            <AdminCustomerListPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/customers/detail/:id'
                    element={
                        <IsAdmin>
                            <AdminDetailCustomerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/verify-sellers/:id'
                    element={
                        <IsAdmin>
                            <AdminChangeStatuslSellerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/data-sellers/:id'
                    element={
                        <IsAdmin>
                            <AdminDetailDataSellerPage />
                        </IsAdmin>
                    }
                />
                <Route
                    path='/my-dashboard/admin/data-sellers/products/:id'
                    element={
                        <IsAdmin>
                            <AdminDetailProductPage />
                        </IsAdmin>
                    }
                />
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
