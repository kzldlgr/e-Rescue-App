import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../../context/ApiContext";

export default function Newsletter() {

  const [toggleRequest, setToggleRequest] = useState(false);
  const { user } = useContext(ApiContext)
  return (
    <>
      <div className='absolute bottom-0 right-0 mb-10 mr-10 text-center justify-center z-30'>
        <button className={toggleRequest ? 'hidden' : 'relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'}
          onClick={() => { setToggleRequest(!toggleRequest) }}
        >Request
        </button>
      </div>
      <div className={toggleRequest ? 'fixed inset-x-0 bottom-0 mb-10 mr-96 m-auto w-[800px] text-center justify-center rounded-lg ease-in-out duration-500' : 'fixed left-[100%]'}>
        <div onClick={() => { setToggleRequest(!toggleRequest) }}>
          <FontAwesomeIcon icon={faX} className="absolute right-[-0] p-2" />
        </div>
        <form className="rounded-lg border border-[#4bb6b7] bg-[#fff] shadow-2xl p-10 m-auto">
          <label className="text-[#4bb6b7] text-2xl">Ask for responders near by...</label>
          <div className="flex relative">
            <FontAwesomeIcon icon={faLocation} className="absolute top-8 pl-2 text-gray-500 text-xl" />
            <input
              className='bg-[#eee] rounded-lg border-none py-[12px] w-full px-8 focus:outline-[#4bb6b7] mt-4'
              type="text"
              placeholder="Current Location"
              disabled
            />
          </div>
          <div className="flex w-full gap-6">
            <input
              className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] mt-[12px] w-[60%] focus:outline-[#4bb6b7]'
              type="text"
              placeholder="Vehicle"
            />
            <input
              className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] mt-[12px] w-[60%] focus:outline-[#4bb6b7]'
              type="Number"
              placeholder="Contact No."
            />
          </div>
          <textarea
            className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] w-full focus:outline-[#4bb6b7] resize-none'
            type="text"
            placeholder="Problem/Description"
          />
          <button className='relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold py-[10px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
          >Send request now
          </button>
        </form>
      </div>
    </>
  )
}
