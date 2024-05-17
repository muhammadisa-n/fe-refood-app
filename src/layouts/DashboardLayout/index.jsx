import React from "react"
import SideBar from "@components/SideBar"
import TopBar from "@components/TopBar"

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="basis-[12%]  h-[100vh]">
        <SideBar />
      </div>
      <div className="basis-[88%]  h-[100vh] overflow-scroll">
        <TopBar />
        {/* Content here */}
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
