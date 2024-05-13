import React from "react"
import RoutesPage from "./Routes"
import { AuthContextProvider } from "@context/authContext"

const App = () => {
  return (
    <AuthContextProvider>
      <RoutesPage />
    </AuthContextProvider>
  )
}

export default App
