import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "@pages/Home"
import About from "@pages/About"
const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Home}></Route>
      <Route path="/about" Component={About}></Route>
    </Routes>
  )
}

export default App
