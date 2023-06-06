import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../../../assets/images/avatar2.png'
import { ClientContext } from '../../../../context/ClientContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons'
import { ApiContext } from '../../../../context/ApiContext'


export default function History() {

  const { historyPanel, setHistoryPanel, sidePanel, setSidePanel, history } = useContext(ClientContext)
  const { user } = useContext(ApiContext)

  return (
    <div className={historyPanel ? 'fixed left-0 top-0 w-[35%] h-[100vh] border-r border-r-white bg-[#fafffa] ease-in-out duration-300  max-md:left-[-100%] z-20' : 'fixed left-[-100%]'}>
      <div className='flex flex-col h-[250px] bg-[#4bb6b7]'>
        <div className='relative m-atuo w-[10%] pl-6 hover:translate-x-3 text-black '
          onClick={() => {
            setHistoryPanel(!historyPanel),
              setSidePanel(!sidePanel)
          }}>
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl my-5 drop-shadow-lg text-white font-bold text-start" />
        </div>
        <div className='m-auto relative'>
          <img src={Avatar} alt="/" className='relative w-32 h-32 rounded-full border border-white ' />
          <FontAwesomeIcon icon={faCamera} className="absolute bottom-0 right-0 m-auto rounded-full border-white border p-2 text-xl bg-white text-[#4bb6b7]" />
        </div>
      </div>
      <div className='p-10 h-[100%]  hover:overflow-y-scroll overflow-y-hidden overflow-x-hidden scrollbar'>
          <label className="text-[#4bb6b7] text-3xl">Report history</label>
          {history != [] && history.map((hist) => {
            return (
              < ul className='' key={hist.id}>
                <li className='text-sm text-end'>{hist.created_at}</li>
                <li className='text-sm'>{hist.current_location}</li>
                <li className='text-sm'>{hist.vehicle}</li>
                <li className='text-sm'>{hist.description}</li>
              </ul>)
          })}
      </div>
    </div >
  )
}
