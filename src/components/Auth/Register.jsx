import { useCallback, useContext, useState } from "react"
import { fetchSignUp } from '../../helpers/ApiCalls'
import { useForm } from "react-hook-form";
import { ClientContext } from "../../context/ClientContext";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Register() {

  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setPanel } = useContext(ClientContext);

  const submitForm = useCallback(async (data) => {
    setConfirmPassword("");
    setErrorMessage([]);
    console.log(data)
    try {
      const body = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        mobile_no: data.mobileNo,
        password: data.password
      };

      if (data.password === data.confirmpassword) {
        await fetchSignUp(body);
        reset({
          firstName: "",
          lastName: "",
          email: "",
          mobileNo: "",
          password: "",
          confirmpassword: "",
        });
        setPanel(false)
      } else if (data.confirmpassword === "") {
        setConfirmPassword(`Confirmation can't be blank`);
      } else if (data.confirmpassword !== data.password) {
        setConfirmPassword("Confirmation not match");
      } else {
        setConfirmPassword('')
      }
    } catch (e) {
      console.log(e)
      setErrorMessage(e.response.data.errors);
      if (data.confirmpassword === "") {
        setConfirmPassword(`Confirmation can't be blank`);
      } else if (data.confirmpassword !== data.password) {
        setConfirmPassword("Confirmation not match");
      } else {
        setConfirmPassword('')
      }
    }
  }, []);

  return (
    <div className="form-container register-container">
      <form className='bg-[#fff] flex flex-col items-center justify-center w-full px-52 h-full text-center' onSubmit={handleSubmit(submitForm)}>
        <h1 className="font-bold m-0 mb-[15px] text-3xl">Register</h1>

        <div className="flex relative w-full gap-4">
          <div className="flex-col w-full">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className={errorMessage.first_name ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-[15px] my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-[15px] my-3 w-full focus:outline-[#318167] focus:border-none'}
            />
            <p className="text-red-600">{errorMessage.first_name ? `First name ${errorMessage.first_name}` : ``}</p>
          </div>

          <div className="flex-col w-full">
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className={errorMessage.last_name ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-[15px] my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-[15px] my-3 w-full focus:outline-[#318167] focus:border-none'}
            />
            <p className="text-red-600">{errorMessage.last_name ? `Last name ${errorMessage.last_name}` : ``}</p>
          </div>
        </div>

        <div className="flex-col relative w-full">
          <FontAwesomeIcon icon={faEnvelope} className="absolute top-7 pl-3 text-gray-500 text-xl" />
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className={errorMessage.email ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#318167] focus:border-none'}
          />
          <p className="text-red-600">{errorMessage.email ? `Email ${errorMessage.email}` : ``}</p>
        </div>


        <div className="flex-col relative w-full">
          <span className="absolute top-0 pl-2 text-gray-500 text-md">+63</span>
          <input
            {...register("mobileNo")}
            type="tel"
            placeholder="Mobile No."
            className={errorMessage.mobile_no ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#318167] focus:border-none'}
          />
          <p className="text-red-600">{errorMessage.mobile_no ? `Mobile No. ${errorMessage.mobile_no}` : ``}</p>
        </div>


        <div className="flex-col relative w-full">
          <FontAwesomeIcon icon={faLock} className="absolute top-7 pl-3 text-gray-500 text-xl" />
          <input
            {...register("password")}
            placeholder="Password"
            minLength="8"
            type="password"
            className={errorMessage.password_digest ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#318167] focus:border-none'}
          />
          <p className="text-red-600">{errorMessage.password_digest ? `Password ${errorMessage.password_digest}` : ``}</p>
        </div>


        <div className="flex-col relative w-full">
          <FontAwesomeIcon icon={faLock} className="absolute top-7 pl-3 text-gray-500 text-xl" />
          <input
            {...register("confirmpassword")}
            placeholder="Password confirmation"
            type="password"
            className={confirmPassword ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#318167] focus:border-none'}
          />
          <p className="text-red-600">{confirmPassword}</p>
        </div>

        <button
          className="relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-3 px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none"
        >Register
        </button>
      </form>
    </div>
  )
}
