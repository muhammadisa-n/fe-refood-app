import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DashboardLayout from "@layouts/DashboardLayout"
const CreateProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const navigate = useNavigate()
  const [errorMessage, SetErrorMessage] = useState("")
  return (
    <>
      <DashboardLayout>
        <div className="px-6 pt-6 ">
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold text-primary">
              Create Product
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-5 pb-4 mt-5 ">
            {/* content here */}
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default CreateProduct
