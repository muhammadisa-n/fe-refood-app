import React from "react"
import SideBar from "@components/SideBar"
import Header from "@components/Header"
import Footer from "@components/Footer"
const SellerOrders = () => {
  return (
    <>
      <Header />
      <SideBar>
        <div className="flex flex-col max-w-full min-h-screen mt-10">
          <div className="mx-3 ">
            <p className="text-3xl font-bold text-primary">Orders</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-10">
            <h5>Ini Halaman orders</h5>
          </div>
        </div>
      </SideBar>
      <Footer />
    </>
  )
}

export default SellerOrders
