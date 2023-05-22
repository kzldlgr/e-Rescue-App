import React from "react"
import Home from './components/Auth/Home'
import { Routes, Route, Navigate } from "react-router-dom"
import ERescue from "./components/ERescue"


function App() {

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
      <Route path="/" element={<Home />} />
      <Route path="/e-Rescue" element={<ERescue />} />
    </Routes>
  )
}

export default App
