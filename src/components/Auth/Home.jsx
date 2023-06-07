import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Login from './Login'
import "./Home.css"
import Register from './Register'
import { ClientContext } from '../../context/ClientContext'

export default function SignIn() {

  const {panel, setPanel} = useContext(ClientContext)

  return (
    <div className="flex flex-col bg-[#f6f5f7] justify-center items-center overflow-hidden h-[100vh]" id="index">
      <div className={panel ? "container right-panel-active" : "container"} id="container">
        <Register />
        <Login />
        <div className="overlay-container">
          <div className="overlay bg-[url(src/assets/images/giphy1.gif)] bg-no-repeat bg-cover">
            <div className="overlay-panel overlay-left">
              <h1 className="text-5xl leading-10 m-0 drop-shadow-lg text-[#4bb6b7]">e-Rescue</h1>
              <p className='my-6'>if Yout have an account, login here and send help if you needed.</p>
              <button className="relative rounded-[20px] border-2 border-[#fff] bg-[#e0e0e036] text-[#fff] text-base font-bold m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none" onClick={()=> setPanel(!panel)}>Login
                <FontAwesomeIcon icon={faArrowRight} className="absolute right-5 p-1 ease-in-out duration-300" />
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-5xl leading-10 m-0 drop-shadow-lg text-[#4bb6b7]">Hello Traveller</h1>
              <p className='my-6'>Having trouble while travelling? Use e-Rescue now to get help anywhere you are.</p>
              <button className="relative rounded-[20px] border-2 border-[#fff] bg-[#e0e0e036] text-[#fff] text-base font-bold m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none" onClick={()=> setPanel(!panel)}>Register
                <FontAwesomeIcon icon={faArrowLeft} className="absolute left-5 p-1 ease-in-out duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
