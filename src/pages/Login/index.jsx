import React, { useState, useContext } from "react"
import Header from "@components/Header"
import Footer from "@components/Footer"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import InputForm from "@components/InputForm"
import Button from "@components/Button"
import AlertMessage from "@components/AlertMessage"
import axios from "axios"
import AuthContext from "../../context/authContext"
const LoginPage = () => {
  const { getLoggedIn } = useContext(AuthContext)
  const location = useLocation()
  const [message, setMessage] = useState(
    location.state ? location.state.message : ""
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [errorMessage, SetErrorMessage] = useState("")
  const HandleLogin = async (e) => {
    e.preventDefault()
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}` + "auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(async (response) => {
        if (response.data.userdata.user_role !== "Customer") {
          await getLoggedIn()
          navigate("/my-dashboard")
        } else {
          await getLoggedIn()
          navigate("/")
        }
      })
      .catch((error) => {
        if (error.response) {
          SetErrorMessage(error.response.data.message)
        }
      })
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-xl px-4 py-16 bg-white">
          <h1 className="mb-2 text-3xl font-semibold text-center text-primary ">
            Log In
          </h1>
          <p className="mb-8 font-medium text-center text-primary">
            Welcome,Please Enter Your Details
          </p>
          {errorMessage && (
            <AlertMessage
              colorBg="text-red-800 bg-red-50"
              onClick={() => SetErrorMessage("")}
              colorBtn="bg-red-50 text-red-500"
            >
              {errorMessage}
            </AlertMessage>
          )}
          {message && (
            <AlertMessage
              colorBg="text-green-800 bg-green-50"
              onClick={() => setMessage("")}
              colorBtn="bg-green-50 text-green-500"
            >
              {message}
            </AlertMessage>
          )}
          <form onSubmit={HandleLogin}>
            <InputForm
              label="Email"
              name="email"
              placeholder="example@mail.com"
              type="email"
              value={email}
              OnChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              label="Password"
              name="password"
              placeholder="********"
              type="password"
              value={password}
              OnChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full mb-2 text-center">
              <p className="text-base font-medium text-black">
                Doesn't Have Account ?
                <NavLink className="font-bold text-primary " to="/register">
                  Register Now
                </NavLink>
              </p>
            </div>
            <Button classname="w-full bg-primary">Sign In </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
