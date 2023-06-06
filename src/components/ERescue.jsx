import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Layout/Sidebar/Sidebar'
import Reports from './Layout/Reports/Reports'
import Profile from './Layout/Sidebar/components/Profile'
import { ClientContext } from '../context/ClientContext'
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUserTie, faWrench } from '@fortawesome/free-solid-svg-icons'
import ReportWindow from './Layout/Reports/ReportWindow'
import History from './Layout/Sidebar/components/History'
import { ApiContext } from '../context/ApiContext'
import { fetchUsers } from '../helpers/ApiCalls'

const ws = new WebSocket("ws://localhost:3000/cable")
const MapboxToken = import.meta.env.VITE_MAP_BOX_TOKEN

export default function ERescue() {


  const { initialView, setInitialView, reports, userCoords, ping } = useContext(ClientContext)
  const { onlineUsers, setOnlineUsers, user, auth } = useContext(ApiContext)
  const [guid, setGuid] = useState();


  ws.onopen = () => {
    console.log("Connected to websocket server / User Channel")
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "UsersChannel"
        }),
      })
    )
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirms_subscription") return;
    if (data.identifier) {
      if (data.message) {
        const message = data.message;
        setOnlineUsers([{ ...message, message }])
      }
    }
  }

  ws.onerror = (e) => {
    console.log(e)
  }

  useEffect(() => {
    fetchOnlineUsers();
  }, [])

  const fetchOnlineUsers = async () => {
    const online = await fetchUsers(auth)
    setOnlineUsers(online.filter((ol) => ol.email !== user.email))
  }

  return (
    <div className='relative'>
      <Sidebar />
      <Profile />
      <History />
      <div className='text-white z-0'>
        <ReactMapGL
          {...initialView}
          mapboxAccessToken={MapboxToken}
          style={{ width: '100vw', height: '100vh' }}
          onMove={(e) => setInitialView(e.initialView)}
          mapStyle="mapbox://styles/kzldlgr26/clhz0f2ds00b701pg9xnybong"
        >
          <Marker
            {...userCoords}
            anchor='center'
          >
            <span className="relative inline-flex h-96 w-96 mt-[-50px] justify-center items-center self-center origin-center">
              <span className={ping ? 'animate-ping absolute inset-0 h-full w-full rounded-full bg-sky-400 opacity-75' : ''}></span>
              <FontAwesomeIcon icon={faLocationDot} className='relative inline-flex bouncing-pin text-red-500 w-8 h-8 ' />
            </span>
          </Marker>

          {reports && reports.map((report, index) => {
            return (
              <Marker
                key={index}
                longitude={report.longitude}
                latitude={report.latitude}
                anchor='center'
              >
                <span
                  className="relative inline-flex h-16 w-16 mt-[-50px] justify-center items-center self-center origin-center">
                  <span className='animate-ping absolute inset-0 h-full w-full rounded-full bg-red-500 opacity-75'></span>
                  <FontAwesomeIcon icon={faWrench} className='absolute bottom-0 inline-flex bouncing-pin text-red-500 w-8 h-8' />
                </span>
              </Marker>
            )
          })}

          {onlineUsers && onlineUsers.map((user, index) => {
            return (
              <Marker
                key={index}
                longitude={user.longitude}
                latitude={user.latitude}
                anchor='center'
              >
                <span
                  className="relative inline-flex h-16 w-16 mt-[-50px] justify-center items-center self-center origin-center">
                  <FontAwesomeIcon icon={faUserTie} className='absolute bottom-0 inline-flex bouncing-pin text-red-500 w-8 h-8' />
                </span>
              </Marker>
            )
          })}

        </ReactMapGL>
      </div>
      <Reports />
      <ReportWindow />
    </div >
  )
}
