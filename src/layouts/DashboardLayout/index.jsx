import React, { useState } from 'react'
import SideBar from '@components/SideBar'
import TopBar from '@components/TopBar'

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='flex'>
            <div
                className={`${isSidebarOpen ? '' : 'hidden'}  md:basis-[12%] md:block  h-[100vh]`}>
                <SideBar />
            </div>
            <div className='basis-[100%] md:basis-[88%]  h-[100vh] overflow-scroll'>
                <TopBar toggleSidebar={toggleSidebar} />
                {/* Content here */}
                {children}
            </div>
            <div className='fixed top-0 left-0 z-50 md:hidden'></div>
        </div>
    )
}

export default DashboardLayout
