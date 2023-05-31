import React, { useContext } from 'react'
import Avatar from '../../../assets/images/avatar2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faHistory, faPersonRunning, faPhoneVolume, faLocation, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { ApiContext } from '../../../context/ApiContext';
import { ClientContext } from '../../../context/ClientContext';

export default function Sidebar() {

  const { user } = useContext(ApiContext);
  const { profilePanel, setProfilePanel, sidePanel, historyPanel, setHistoryPanel, setSidePanel } = useContext(ClientContext);

  return (
    <div className={sidePanel ? 'fixed left-[-100%] ' : 'fixed left-0 top-0 w-[20%] h-full border-r border-r-white bg-[#fafffa] ease-in-out duration-300 z-20'}>
      <div className='flex flex-col'>
        <div className="w-full h-[250px] bg-[#4bb6b7]" >
          <h1 className='text-2xl leading-10 m-0 drop-shadow-lg text-white font-bold px-4 py-1'>e-Rescue</h1>
          <div className='p-4'>
            <img src={Avatar} alt="/" className=' w-32 h-32 rounded-full border border-white bg-contain mb-4' />
            <div className='flex flex-row-2 text-white'>
              <h1 className='p-1 font-bold text-2xl whitespace-nowrap drop-shadow-lg'>{user && user.first_name + " " + user.last_name}</h1>
              <div className='hover:text-black' onClick={() => {
                setProfilePanel(!profilePanel),
                  setSidePanel(!sidePanel)
              }}>
                <FontAwesomeIcon icon={faPen} className='p-2 ml-2' />
              </div>
            </div>
          </div>
        </div>
        <ul className='p-4 text-black text-xl'>
          <li className='p-4 whitespace-nowrap' onClick={() => {
            setHistoryPanel(!historyPanel),
              setSidePanel(!sidePanel)
          }}><FontAwesomeIcon icon={faHistory} className='mr-2' />History</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faBullhorn} className='mr-2' />Announcements</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faPhoneVolume} className='mr-2' />Support</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faPersonRunning} className='mr-2' />Responders</li>
          <li className='p-4 whitespace-nowrap'><FontAwesomeIcon icon={faLocation} className='mr-2' />My Locations</li>
        </ul>
      </div>
    </div>
  )
}
