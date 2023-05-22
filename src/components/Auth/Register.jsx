import React, { useCallback, useState } from "react"
import { fetchSignUp } from '../../helpers/ApiCalls'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const { register, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = useCallback(async (data) => {
    setConfirmPassword("");
    setErrorMessage([]);
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password
      };

      if (data.password === data.confirmpassword) {
        await fetchSignUp(body);
        reset({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        navigate("/e-Rescue", {replace: true})
      } else if (data.confirmpassword === "") {
        setConfirmPassword(`can't be blank`);
      } else {
        setConfirmPassword("Password confirmation not match");
      }
    } catch (e) {
      console.log(e.response.data.errors)
      setErrorMessage(e.response.data.errors);
      console.log(errorMessage)
    }
  }, []);

  return (
    <div className="form-container register-container">
      <form className='bg-[#fff] flex flex-col items-center justify-center py-0 px-[50px] h-full text-center' onSubmit={handleSubmit(submitForm)}>
        <h1 className="font-bold m-0 mb-[15px] text-3xl">Register</h1>
        <p className="text-red-600">{errorMessage.name ? `Name ${errorMessage.name}` : ``}</p>
        <input
          {...register("name")}
          placeholder="Name"
          className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#318167]'
        />
        <p className="text-red-600">{errorMessage.email ? `Email ${errorMessage.email}` : ``}</p>
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#318167]'
        />
        <p className="text-red-600">{errorMessage.password ? `Password ${errorMessage.password}` : ``}</p>
        <p className="text-red-600">{confirmPassword}</p>
        <input
          {...register("password")}
          placeholder="Password"
          minlength="8"
          type="password"
          className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#318167]'
        />
        <input
          {...register("confirmpassword")}
          placeholder="Password confirmation"
          type="password"
          className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#318167]'
        />

        <button
          className="relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none"
        >Register
        </button>
      </form>
    </div>
  )
}
