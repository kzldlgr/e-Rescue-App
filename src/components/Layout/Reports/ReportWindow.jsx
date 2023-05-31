import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../../assets/images/avatar2.png'
import { ClientContext } from '../../../context/ClientContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { ApiContext } from '../../../context/ApiContext'
import { fetchReports, updateResponder } from '../../../helpers/ApiCalls'



export default function ReportWindow() {

    const { setInitialView, reports, userCoords, setReports } = useContext(ClientContext)
    const { setSelectedReport, user, auth } = useContext(ApiContext)
    const [reportPanel, setReportPanel] = useState(true)

    useEffect(() => {
        fetch();
    }, [])

    const fetch = async () => {
        const res = await fetchReports(user, auth);
        setReports(res)
    }


    return (
        <div className={reports ? 'fixed top-2 right-0 w-[20%] ease-in-out duration-300  max-md:left-[-100%] z-20' : 'fixed top-0 right-[-100%]'}>
            {reports && reports.map((report) => {
                return (

                    <div className="card p-6" key={report.id}>
                        <div className='flex flex-row gap-2'>
                            <img src={Avatar} alt="/" className='relative w-12 h-12 rounded-full border border-white ' />
                            <div className='flex flex-col'>
                                <label className='font-bold'>{report.name}</label>
                                <label className='text-sm'>+63{report.contact_no}</label>
                            </div>
                        </div>
                        <div className='flex flex-col p-2'>
                            <div className='truncate'>
                                <label>Vehicle: {report.vehicle}</label>
                            </div>
                            <div className='truncate'>
                                <label>Problem: {report.description}</label>
                            </div>
                            <div className='truncate'>
                                <FontAwesomeIcon icon={faLocation} />
                                <label className='text-sm font-bold'>{report.current_location}</label>
                            </div>
                        </div>
                        <div className='relative text-center align-center m-auto'>
                            {reportPanel ? <button
                                className='text-white rounded border border-white bg-red-500 px-2 py-1 tracking-[1px] ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
                                onClick={() => {
                                    setSelectedReport([report])
                                    setInitialView({
                                        latitude: report.latitude,
                                        longitude: report.longitude,
                                        zoom: 16
                                    })
                                    setReportPanel(false)
                                    const body = {
                                        id: report.id,
                                        responder_id: user.id,
                                        status: true
                                    }
                                    updateResponder(body, auth)
                                }}
                            >Respond</button>
                                : <button
                                    className='text-white rounded border border-white bg-green-500 px-2 py-1 tracking-[1px] ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
                                    onClick={() => {
                                        const body = {
                                            id: report.id,
                                            responder_id: user.id,
                                            status: true
                                        }
                                        updateResponder(body, auth);
                                        fetch();
                                        setReportPanel(true);
                                        setInitialView({
                                            latitude: userCoords.latitude,
                                            longitude: userCoords.longitude,
                                            zoom: 16
                                        })


                                    }}
                                >Done
                                </button>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
