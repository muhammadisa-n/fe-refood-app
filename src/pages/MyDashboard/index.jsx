import React from "react"
import Header from "@components/Header"
import Footer from "@components/Footer"
import SideBar from "@components/SideBar"
import { Link } from "react-router-dom"
import { BowlFood, ListBullets } from "@phosphor-icons/react"
const MyDashboard = () => {
  return (
    <>
      <Header />
      <SideBar>
        <div className="flex flex-col max-w-full min-h-screen mt-10">
          <div className="mx-3 ">
            <p className="text-3xl font-bold text-primary">My Dashboard</p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-10">
            <div className="w-full  px-2 mb-4">
              <div className="bg-white border border-primary rounded-lg shadow-md h-full p-4">
                <div className="flex items-center mb-4">
                  <div className="text-xs font-semibold text-primary uppercase">
                    Jumlah Product
                  </div>
                  <div className="ml-auto">
                    <BowlFood size={32} className="text-primary" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">40</div>
              </div>
            </div>
            <div className="w-full  px-2 mb-4">
              <div className="bg-white border border-primary rounded-lg shadow-md h-full p-4">
                <div className="flex items-center mb-4">
                  <div className="text-xs font-semibold text-primary uppercase">
                    Jumlah Pesanan
                  </div>
                  <div className="ml-auto">
                    <ListBullets size={32} className="text-primary" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">40</div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      <Footer />
    </>
  )
}

export default MyDashboard
