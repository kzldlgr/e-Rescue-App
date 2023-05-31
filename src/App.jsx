import React from "react"
import Home from './components/Auth/Home'
import { Routes, Route, Navigate } from "react-router-dom"
import ERescue from "./components/ERescue"
import { ApiContextProvider } from "./context/ApiContext"
import { ClientContextProvider } from "./context/ClientContext"

function App() {

  return (
    <ClientContextProvider>
      <ApiContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/e-Rescue" element={<ERescue />}>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </ApiContextProvider>
    </ClientContextProvider>
  )
}

export default App