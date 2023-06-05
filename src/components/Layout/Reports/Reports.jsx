import { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../../context/ApiContext";
import { ClientContext } from "../../../context/ClientContext";
import { useForm } from "react-hook-form";
import { cancelReport, fetchReports, getHistory, sendReport } from "../../../helpers/ApiCalls";

const ws = new WebSocket("wss:https://e-rescue-api.onrender.com/cable")

export default function Reports() {

  const { user, auth } = useContext(ApiContext);
  const [toggleRequest, setToggleRequest] = useState(false)
  const { address, userCoords, setPing, ping, setInitialView, setReports, setHistory } = useContext(ClientContext)
  const [errorMessage, setErrorMessage] = useState([]);
  const [newReport, setNewReport] = useState();
  const [guid, setGuid] = useState();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      address: address.Match_addr,
      mobileNo: "",
      vehicle: "",
      description: ""

    }
  })


  ws.onopen = () => {
    console.log("Connected to websocket server / Reports Channel")
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "ReportsChannel"

        }),
      })
    )
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirms_subscription") return;
    if (data.identifier) {
      if (data.message) {
        const message = data.message;
        setReports([{ ...message, message }])
      }
    }
  }

  useEffect(() => {
    fetch();
  }, [])

  const fetch = async () => {
    const res = await fetchReports(user, auth);
    const history = await getHistory(auth)
    setHistory(history.data)
    setReports(res)
  }


  const submitForm = useCallback(async (data) => {
    try {
      const body = {
        user_id: user.id,
        email: user.email,
        name: user.first_name + " " + user.last_name,
        current_location: data.address,
        longitude: userCoords.longitude,
        latitude: userCoords.latitude,
        vehicle: data.vehicle,
        contact_no: data.mobileNo,
        description: data.description
      }
      if (data.vehicle && data.mobileNo && data.description) {
        const res = await sendReport(auth, body)
        fetch();
        setNewReport(res.data.report)
        setPing(true)
        setToggleRequest(false)
        setErrorMessage({})
        setInitialView({
          longitude: userCoords.longitude,
          latitude: userCoords.latitude,
          zoom: 16
        })
      } else {
        const res = await sendReport(auth, body)
      }
    } catch (e) {
      setErrorMessage(e.response.data.errors)
    }
  })

  const cancelSubmit = async () => {
    await cancelReport(newReport, auth)
    setPing(false)
    fetchReports();
  }
  return (
    <>
      <div className='absolute bottom-0 right-0 mb-10 mr-10 text-center justify-center z-30 '>
        <button className={toggleRequest ? 'hidden' : 'relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-3 px-[80px] tracking-[1px] ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'}
          onClick={() => { setToggleRequest(!toggleRequest) }}
        >{ping ? 'Looking for responder nearby' : 'Request'}
        </button>
      </div>
      <div className={toggleRequest ? 'fixed inset-x-0 bottom-0 mb-10 mr-96 m-auto w-[800px] text-center justify-center rounded-lg ease-in-out duration-500 text-black' : 'fixed left-[100%]'}>
        <div onClick={() => { setToggleRequest(!toggleRequest) }}>
          <FontAwesomeIcon icon={faX} className="absolute right-[-0] p-2 " />
        </div>
        <form className="rounded-lg border border-[#4bb6b7] bg-[#fff] shadow-2xl p-10 m-auto" onSubmit={handleSubmit(submitForm)}>
          <label className="text-[#4bb6b7] text-2xl">Ask for responders near by...</label>
          <p>Guid: {guid}</p>
          <div className="flex relative mt-3">
            <FontAwesomeIcon icon={faLocation} className="absolute top-8 pl-3 text-gray-500 text-xl" />
            <input
              {...register("address")}
              className='bg-[#eee] rounded-lg border-none py-3 w-full px-10 mt-4'
              type="text"
              placeholder="Current Location"
              readOnly
            />
          </div>
          <div className="flex w-full gap-6 mt-3">
            <div className="flex-col w-full">
              <p className="text-red-600 absolute bg-white ml-2">{errorMessage.vehicle ? `Vehicle type ${errorMessage.vehicle}` : ''}</p>
              <input
                {...register("vehicle")}
                className={errorMessage.vehicle ? 'bg-white rounded-lg border-red-500 border py-3 px-5 mt-3 w-full focus:outline-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-none py-3 px-5 mt-3 w-full focus:outline-[#4bb6b7]'}
                type="text"
                placeholder="Vehicle type"
              />
            </div>
            <div className="flex-col  w-full">
              <div className="flex-col relative w-full">
                <p className="text-red-600 absolute bg-white ml-2">{errorMessage.contact_no ? `Contact no. ${errorMessage.contact_no}` : ''}</p>
                <span className="absolute top-0 pl-2 text-gray-500 text-md">+63</span>
                <input
                  {...register("mobileNo")}
                  className={errorMessage.contact_no ? 'bg-white rounded-lg border-red-500 border py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-none py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7]'}
                  type="Number"
                  placeholder="Contact No."
                />
              </div>
            </div>
          </div>
          <div className="flex w-full mt-3 mb-7">
            <p className="text-red-600 absolute bg-white ml-2">{errorMessage.description ? `Description ${errorMessage.description}` : ''}</p>
            <textarea
              {...register("description")}
              className={errorMessage.description ? 'bg-white rounded-lg border-red-500 border py-3 px-5 my-3 w-full focus:outline-[#4bb6b7] resize-none' : 'bg-[#eee] rounded-lg border-none py-3 px-5 my-3 w-full focus:outline-[#4bb6b7] resize-none'}
              type="text"
              placeholder="Problem/Description"
            />
          </div>
          {ping ? <div></div> :
            <button className='relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold py-[10px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
            >Send request now
            </button>
          }
          {ping ?
            <label
              className='relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold py-[10px] px-[80px]  tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
              onClick={cancelSubmit}
            >Cancel
            </label>
            : <div></div>}
        </form>

      </div>
    </>
  )
}
