import { FileSearch } from "@phosphor-icons/react"
import React from "react"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto ">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <FileSearch size={32} className="text-primary" />
        <h3 className="text-3xl font-bold text-primary">Page Not Found</h3>
        <button
          className="underline transition-all text-primary hover:text-secondary "
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
