import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "@pages/Home"
import LoginPage from "@pages/Login"
import RegisterPage from "@pages/Register"
import NotFoundPage from "@pages/NotFound"
import RecomendationPage from "@pages/Recomendation"
import CartsPage from "@pages/Carts"
import MyDashboard from "@pages/MyDashboard"
import IsLoggedIn from "@utils/middleware/IsLoggedIn"
import MyProducts from "@pages/Seller/MyProducts"
import SellerOrders from "@pages/Seller/Orders"
import MyProfile from "./pages/MyProfile"
const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PublicRoute */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/recomendation" element={<RecomendationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protectted Routes */}
        <Route element={<IsLoggedIn />}>
          <Route path="/my-dashboard" element={<MyDashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/my-dashboard/seller/my-products"
            element={<MyProducts />}
          />
          <Route
            path="/my-dashboard/seller/orders"
            element={<SellerOrders />}
          />
          <Route path="/carts" element={<CartsPage />} />
        </Route>
        {/* Route Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesPage
