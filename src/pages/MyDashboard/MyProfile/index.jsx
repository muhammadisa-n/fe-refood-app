import React, { useEffect, useState } from "react"
import DashboardLayout from "@layouts/DashboardLayout"
import axios from "axios"
import ImgDefault from "@assets/userdefault.png"
const DashboardProfile = () => {
  const [user, setUser] = useState()
  const getUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}` + "user/get",
      { withCredentials: true }
    )
    setUser(response.data.user)
  }
  useEffect(() => {
    getUser()
  }, [])

  return (
    <DashboardLayout>
      <div className="px-6 pt-6 ">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-primary">My Profile</h1>
        </div>
        <div className="pb-4 mt-5 ">
          <div className="flex flex-col max-w-full min-h-screen mt-10">
            <div className="container px-4 py-8 mx-auto">
              <div className="w-[75%] mx-auto bg-white rounded-lg shadow-md">
                <div className="justify-between md:flex">
                  <div className="px-4 py-8">
                    <img
                      className="object-cover w-full h-48 md:w-48"
                      src={user?.image_url ? user.image_url : ImgDefault}
                      alt="Profile"
                    />
                  </div>
                  <div className="flex items-start px-4 py-8">
                    <div>
                      <div className="text-sm font-semibold tracking-wide uppercase text-primary">
                        My Profile
                      </div>
                      <h2 className="text-2xl font-semibold text-black">
                        {user?.fullname}
                      </h2>
                      <p className="mt-2 text-gray-600">Email: {user?.email}</p>
                      <p className="mt-2 text-gray-600">Phone: {user?.no_hp}</p>
                      <p className="mt-2 text-gray-600">
                        Address:{" "}
                        {`${user?.address}, ${user?.district}, ${user?.city}, ${user?.province}, ${user?.postal_code}`}
                      </p>
                      {/* Add more profile information as needed */}
                    </div>
                    <div className="ml-auto">
                      <button className="px-4 py-2 text-white rounded bg-primary hover:bg-secondary focus:outline-none">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardProfile
