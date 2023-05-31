import React, { useContext, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faWrench } from '@fortawesome/free-solid-svg-icons';
import { ClientContext } from '../../context/ClientContext';
import { ApiContext } from '../../context/ApiContext';
import axios from 'axios';

const ws = new WebSocket("ws://localhost:3000/cable")
// const TOKEN = process.env.REACT_APP_TOKEN
// Map.accessToken = 'pk.eyJ1Ijoia3psZGxncjI2IiwiYSI6ImNsaHNvMTNnbjMwYTIzcXBiYjJrcm1lczMifQ.DXawEG9u_BB8ITWYPZwWUQ'

export default function Map() {

    const { userCoords, ping, initialView, setInitialView, reports, setReports } = useContext(ClientContext);
    const { auth, onlineUsers, setOnlineUsers, user } = useContext(ApiContext);
    const [guid, setGuid] = useState("");

    ws.onopen = () => {
        console.log("Connected to websocket server")
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

    useEffect(() => {
        fetchUsersLoc();
    }, [])

    const fetchUsersLoc = async () => {
        let config = {
            headers: {
                'Authorization': auth,
            }
        }
        const response = await axios.get('http://localhost:3000/api/v1/user/loc', config);
        const data = response.data;
        setOnlineUsers(data)
    }


    return (
        <div className='text-white z-0'>
            <div className='w-screen h-screen text-center justify-center'>
                <ReactMapGL
                    {...initialView}
                    mapboxAccessToken="pk.eyJ1Ijoia3psZGxncjI2IiwiYSI6ImNsaHNvMTNnbjMwYTIzcXBiYjJrcm1lczMifQ.DXawEG9u_BB8ITWYPZwWUQ"
                    style={{ width: '100vw', height: '100vh' }}
                    onMove={(e) => setInitialView(e.initialView)}
                    mapStyle="mapbox://styles/kzldlgr26/clhz0f2ds00b701pg9xnybong"
                // mapStyle="mapbox://styles/mapbox/streets-v11"
                // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
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

                    {reports && reports.map((report) => {
                        return (
                            <Marker
                                key={report.id}
                                longitude={report.longitude}
                                latitude={report.latitude}
                                anchor='center'
                            >
                                <span className="relative inline-flex h-16 w-16 mt-[-50px] justify-center items-center self-center origin-center">
                                    <span className='animate-ping absolute inset-0 h-full w-full rounded-full bg-red-500 opacity-75'></span>
                                    <FontAwesomeIcon icon={faWrench} className='absolute bottom-0 inline-flex bouncing-pin text-red-500 w-8 h-8' />
                                </span>
                            </Marker>)
                    })}

                    {/* {onlineUsers && onlineUsers.map((online) => {
                        return (
                            <Marker
                                key={online.id}
                                longitude={online.longitude}
                                latitude={online.latitude}
                                anchor='center'
                            >
                            </Marker>)
                    })} */}
                    {/* 
                    <GeolocateControl
                        position='center'
                        onGeolocate={(e) => { setInitialView({ latitude: e.coords.latitude, longitude: e.coords.longitude, zoom: 16 }) }}
                    /> */}
                </ReactMapGL>
            </div>
        </div>
    )
}
