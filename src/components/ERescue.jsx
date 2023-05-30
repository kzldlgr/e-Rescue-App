import React, { useContext } from 'react'
import Map from './Layout/Map'
import Sidebar from './Layout/Sidebar/Sidebar'
import Reports from './Layout/Reports/Reports'
import { ApiContext } from '../context/ApiContext'
import Profile from './Layout/User/Profile'
import { ClientContext } from '../context/ClientContext'

export default function ERescue() {

  const { user, auth } = useContext(ApiContext);
  const { initialView } = useContext(ClientContext)
  

  return (
    <div className='relative'>
      <Map />
      <Sidebar />
      <Reports />
      <Profile />
    </div>
  )
}
