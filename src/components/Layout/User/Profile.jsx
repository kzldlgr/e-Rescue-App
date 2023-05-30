import { useCallback, useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiContext } from "../../../context/ApiContext";
import { ClientContext } from "../../../context/ClientContext";
import Avatar from '../../../assets/images/avatar2.png'
import { faArrowLeft, faCamera, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { patchProfile } from "../../../helpers/ApiCalls";

export default function Profile() {

  const { profilePanel, setProfilePanel, setPanel } = useContext(ClientContext)
  const { user, auth, updateUser } = useContext(ApiContext)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      mobileNo: user.mobile_no,
    }
  });


  const submitForm = useCallback(async (data) => {
    setConfirmPassword("");
    setErrorMessage([]);
    try {
      const body = {
        id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        mobile_no: data.mobileNo,
        password: data.password
      };

      if (data.password === "") {
        setConfirmPassword(`Password can't be blank`)
      } else if (data.password.length < 7) {
        setConfirmPassword(`Password to short`);
      } else if (data.confirmpassword === "") {
        setConfirmPassword(`Confirmation can't be blank`);
      } else if (data.confirmpassword !== data.password) {
        setConfirmPassword("Confirmation not match");
      } else if (data.password === data.confirmpassword) {
        const data = await patchProfile(auth, body);
        updateUser(data.data.user)
        reset({
          password: "",
          confirmpassword: "",
        });
        setPanel(false)
        setProfilePanel(false)
      } else {
        setConfirmPassword('')
      }
    } catch (e) {
      setErrorMessage(e.response.data.errors);
      if (data.password === "") {
        setConfirmPassword(`Password can't be blank`)
      } else if (data.password.length < 7) {
        setConfirmPassword(`Password to short`);
      } else if (data.confirmpassword === "") {
        setConfirmPassword(`Confirmation can't be blank`);
      } else if (data.confirmpassword !== data.password) {
        setConfirmPassword("Confirmation not match");
      } else {
        setConfirmPassword('')
      }
    }
  }, []);

  return (
    <>
      <div className={profilePanel ? 'fixed left-0 top-0 w-[35%] h-full border-r border-r-white bg-[#fafffa] ease-in-out duration-300  max-md:left-[-100%] z-20' : 'fixed left-[-100%]'}>
        <div className='flex flex-col h-[250px] bg-[#4bb6b7]'>
          <div className='relative m-atuo w-[10%] pl-6 hover:translate-x-3 text-black ' onClick={() => {
            setProfilePanel(!profilePanel), reset({
              password: "",
              confirmpassword: "",
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              mobileNo: user.mobile_no
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl my-5 drop-shadow-lg text-white font-bold text-start" />
          </div>
          <div className='m-auto relative'>
            <img src={Avatar} alt="/" className='relative w-32 h-32 rounded-full border border-white ' />
            <FontAwesomeIcon icon={faCamera} className="absolute bottom-0 right-0 m-auto rounded-full border-white border p-2 text-xl bg-white text-[#4bb6b7]" />
          </div>
        </div>
        <form className="p-10" onSubmit={handleSubmit(submitForm)}>
          <label className="text-[#4bb6b7] text-3xl">Edit Profile</label>
          <div className="flex w-full gap-6">
            <div className="flex-col w-full">
              <input
                {...register("firstName")}
                className={errorMessage.first_name ? 'bg-white rounded-lg border-l-4 border-red-600 border py-3 px-3 mt-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7] text-black' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-3 mt-3 w-full focus:outline-[#4bb6b7] focus:border-none text-black'}
                type="text"
                placeholder="First name"
              />
              <p className='text-red-500 ml-1'>{errorMessage.first_name ? `First name ${errorMessage.first_name}` : ''}</p>
            </div>
            <div className="flex-col w-full">
              <input
                {...register("lastName")}
                className={errorMessage.last_name ? 'bg-white rounded-lg border-l-4 border-red-500 border py-3 px-3 mt-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7] text-black' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-3 mt-3 w-full focus:outline-[#4bb6b7] focus:border-none text-black'}
                type="text"
                placeholder="Last name"
              />
              <p className='text-red-500 ml-1'>{errorMessage.last_name ? `Last name ${errorMessage.last_name}` : ''}</p>
            </div>
          </div>

          <div className="flex relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute top-8 pl-3 text-gray-500 text-xl" />
            <input
              {...register("email")}
              className='bg-[#eee] rounded-lg border-l-4 border-black py-3 w-full px-10 mt-4'
              type="text"
              placeholder="Email"
              readOnly
            />
          </div>

          <div className="flex-col relative">
            <span className="absolute top-1 pl-2 text-gray-500">+63</span>
            <input
              {...register("mobileNo")}
              className={errorMessage.mobile_no ? 'bg-white rounded-lg border-l-4 border-red-500 border py-3 w-full px-10 focus:outline-[#4bb6b7] focus:border-[#4bb6b7] mt-4' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 w-full px-10 focus:outline-[#4bb6b7] focus:border-none mt-4'}
              type="tel"
              placeholder="Mobile No."
            />
            <p className='text-red-500 ml-1'>{errorMessage.mobile_no ? `Mobile no. ${errorMessage.mobile_no}` : ''}</p>
          </div>
          <div className="flex relative w-full">
            <FontAwesomeIcon icon={faLock} className="absolute top-7 pl-3 text-gray-500 text-xl" />
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className={confirmPassword ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7] focus:border-none'}
            />
          </div>


          <div className="flex relative w-full">
            <FontAwesomeIcon icon={faLock} className="absolute top-7 pl-3 text-gray-500 text-xl" />
            <input
              {...register("confirmpassword")}
              placeholder="Password confirmation"
              type="password"
              className={confirmPassword ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 mt-3 w-full focus:outline-[#4bb6b7] focus:border-none'}
            />
          </div>
          <p className="text-red-500 ml-1">{confirmPassword}</p>

          <div className="flex px-24 m-auto justify-center items-center my-6">
            <button className='w-[50%] justify-center item-center rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold py-3 tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none'
            >update
            </button>
          </div>
        </form>
      </div >
    </>
  )
}
