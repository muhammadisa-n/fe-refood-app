import React from "react"
import Header from "@components/Header"
import SideBar from "@components/SideBar"
import Footer from "@components/Footer"

const MyProducts = () => {
  return (
    <>
      <Header />
      <SideBar>
        <div className="flex flex-col max-w-full min-h-screen mt-10">
          <div className="mx-3 ">
            <p className="text-3xl font-bold text-primary">My Products</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-10">
            <h5>Ini Halaman My Products</h5>
          </div>
        </div>
      </SideBar>
      <Footer />
    </>
  )
}

export default MyProducts
