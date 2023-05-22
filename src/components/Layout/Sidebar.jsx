import React from 'react'
import Avatar from '../../assets/images/avatar2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faHistory, faPersonRunning, faPhoneVolume, faLocation, faBullhorn } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <div className='fixed left-0 top-0 w-[20%] h-full border-r border-r-white bg-white ease-in-out duration-300  max-md:left-[-100%] z-20'>
      <div className='flex flex-col'>
        <div className="w-full h-[250px] bg-[#2e5e6d66]" >
          <h1 className='w-full text-3xl font-bold text-[#4bb6b7] px-4'>e-Rescue</h1>
          <div className='mt-0 p-4'>
            <img src={Avatar} alt="/" className=' w-32 h-32 rounded-full border border-white bg-contain mb-4' />
            <div className='flex flex-row-2'>
              <h1 className='p-1 font-bold text-2xl whitespace-nowrap'>Kazel Deligero</h1>
              <FontAwesomeIcon icon={faPen} className='p-2 ml-2' />
            </div>
          </div>
        </div>
        <ul className='p-4 text-black text-xl'>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faHistory} className='mr-2' />History</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faBullhorn} className='mr-2' />Announcements</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faPhoneVolume} className='mr-2' />Support</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faPersonRunning} className='mr-2' />Responders</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faLocation} className='mr-2' />My Locations</li>
        </ul>
      </div>
    </div>
  )
}
