import React, { useEffect, useState } from "react"
import Header from "@components/Header"
import Footer from "@components/Footer"
import axios from "axios"
import ImgDefault from "@assets/userdefault.png"
const MyProfile = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}` + "user/get",
        { withCredentials: true }
      )
      console.log(response.data.User)
      setUser(response.data.User)
    }
    getUser()
  }, [])
  return (
    <>
      <Header />
      <div className="flex flex-col max-w-full min-h-screen mt-10">
        <div className="container px-4 py-8 mx-auto">
          <div className="w-[75%] mx-auto bg-white rounded-lg shadow-md">
            <div className="justify-between md:flex">
              <div className="px-4 py-8">
                <img
                  className="object-cover w-full h-48 md:w-48"
                  src={user?.ava_image ? user.ava_image : ImgDefault}
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

      <Footer />
    </>
  )
}

export default MyProfile
