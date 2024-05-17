import React, { useContext } from "react"
import { FaRegBell } from "react-icons/fa"
import defaultProfileImg from "@assets/userdefault.png"
import AuthContext from "@context/authContext"
const TopBar = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="hidden md:flex items-center justify-end h-[70px] px-6 shadow-lg ">
      <div className="relative flex items-center gap-4">
        <div className="flex items-center gap-3 pr-6 border-r-[1px] border-white">
          <FaRegBell></FaRegBell>
        </div>
        <div className="flex items-center gap-3">
          <p>{user?.fullname}</p>
          <div className="w-[40px] h-[40px] rounded-full  flex items-center justify-center relative bg-primary ">
            <img src={defaultProfileImg} className="rounded-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
