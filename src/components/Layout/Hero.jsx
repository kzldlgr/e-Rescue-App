import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// const TOKEN = process.env.REACT_APP_TOKEN

export default function Hero() {

    const [viewPort, setViewPort] = useState({
        latitude: 14.6515,
        longitude: 121.0493,
        zoom: 15,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewPort({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }, [])

    Map.accessToken = 'pk.eyJ1Ijoia3psZGxncjI2IiwiYSI6ImNsaHNvMTNnbjMwYTIzcXBiYjJrcm1lczMifQ.DXawEG9u_BB8ITWYPZwWUQ'

    return (
        <div className='text-white'>
            <div className='w-screen h-screen text-center justify-center'>
                <ReactMapGL
                    {...viewPort}
                    mapboxAccessToken="pk.eyJ1Ijoia3psZGxncjI2IiwiYSI6ImNsaHNvMTNnbjMwYTIzcXBiYjJrcm1lczMifQ.DXawEG9u_BB8ITWYPZwWUQ"
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/kzldlgr26/clhz0f2ds00b701pg9xnybong"
                >
                    <Marker
                        {...viewPort}
                        anchor='bottom'
                    >
                        <FontAwesomeIcon icon={faLocationDot} className='bouncing-pin text-red-500 w-8 h-8' />
                    </Marker>
                </ReactMapGL>
            </div>
        </div>
    )
}
