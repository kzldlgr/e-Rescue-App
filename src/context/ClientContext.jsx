import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ClientContext = createContext({});

export const ClientContextProvider = ({ children }) => {

    const [panel, setPanel] = useState(false);
    const [profilePanel, setProfilePanel] = useState(false);
    const [address, setAddress] = useState(JSON.parse(sessionStorage.getItem("currentLocation")));
    const [ping, setPing] = useState(false);
    const [reports, setReports] = useState([])
    const [userCoords, setUserCoords] = useState(JSON.parse(sessionStorage.getItem("userCoords")) ? JSON.parse(sessionStorage.getItem("userCoords")) : {});
    const [initialView, setInitialView] = useState(JSON.parse(sessionStorage.getItem("userCoords")) ? JSON.parse(sessionStorage.getItem("userCoords")) : {})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position)
            const loc = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 16
            }
            setUserCoords(loc)
            setInitialView(loc)
            sessionStorage.setItem("userCoords", JSON.stringify(loc))

            const response = await axios.get(
                `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson& featureTypes=PointAddress,StreetAddress&location=${loc.longitude}%2C${loc.latitude}`
            )
            sessionStorage.setItem("currentLocation", JSON.stringify(response.data.address))

        })
    }, [])

    return (
        <ClientContext.Provider value={{
            panel,
            setPanel,
            profilePanel,
            setProfilePanel,
            userCoords,
            setUserCoords,
            address,
            setAddress,
            ping,
            setPing,
            initialView,
            setInitialView,
            reports,
            setReports
        }}>
            {children}
        </ClientContext.Provider>
    )
}
