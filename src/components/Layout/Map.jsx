import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// const TOKEN = process.env.REACT_APP_TOKEN

export default function Map() {

    const [viewPort, setViewPort] = useState({
        latitude: 14.6515,
        longitude: 121.0493,
        zoom: 16,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewPort({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 16.
            })
        })
    }, [])



    // Map.accessToken = 'pk.eyJ1Ijoia3psZGxncjI2IiwiYSI6ImNsaHNvMTNnbjMwYTIzcXBiYjJrcm1lczMifQ.DXawEG9u_BB8ITWYPZwWUQ'

    return (
        <div className='text-white z-0'>
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
                        anchor='center'
                    >
                        <span className="relative inline-flex h-96 w-96 mt-[-50px] justify-center items-center self-center origin-center">
                            <span className="animate-ping absolute inset-0 h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <FontAwesomeIcon icon={faLocationDot} className='relative inline-flex bouncing-pin text-red-500 w-8 h-8 ' />
                        </span>
                    </Marker>
                    
                </ReactMapGL>
            </div>
        </div>
    )
}
