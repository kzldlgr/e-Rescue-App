import React, { useContext, useEffect } from 'react'
import Map from './Layout/Map'
import Sidebar from './Layout/Sidebar/Sidebar'
import Reports from './Layout/Reports/Reports'
import { ApiContext } from '../context/ApiContext'
import Profile from './Layout/User/Profile'

export default function ERescue() {

  const { setUser } = useContext(ApiContext);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  return (
    <div className='relative'>
      <Map />
      <Sidebar />
      <Reports />
      <Profile />
    </div>
  )
}
