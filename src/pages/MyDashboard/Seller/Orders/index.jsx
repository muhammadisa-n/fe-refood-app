import React from "react"
import DashboardLayout from "@layouts/DashboardLayout"
const SellerOrders = () => {
  return (
    <DashboardLayout>
      <div className="px-6 pt-6 ">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-primary">My Orders</h1>
        </div>
        <div className="grid grid-cols-4 gap-5 pb-4 mt-5 ">
          {/* content here */}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SellerOrders
