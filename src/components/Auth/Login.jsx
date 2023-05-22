import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { fetchSignIn } from '../../helpers/ApiCalls';
import "./Home.css";

export default function Login() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const handleSignIn = useCallback(async (data) => {
        setErrorMessage([]);

        if (data.email === "") {
            setErrorMessage("Username can't be blank")
        } else if (data.password === "") {
            setErrorMessage("Password can't be blank")
        } else {
            try {
                let checkData = await fetchSignIn(data);
                if (checkData.status === 200) {
                    navigate("/e-Rescue", { replace: true });
                }
            } catch (e) {
                setErrorMessage(e.response.data.errors);
            }
        }
    }, []);


    return (
        <div className="form-container login-container">
            <form className='bg-[#fff] flex flex-col items-center justify-center py-0 px-[50px] h-full text-center' onSubmit={handleSubmit((data) => {
                handleSignIn(data); reset({ password: "" });
            })} >
                <h1 className="font-bold m-0 mb-[24px] text-3xl mt-24">Login</h1>
                <p className="text-red-600">{errorMessage}</p>
                <input
                    {...register('email')}
                    className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#4bb6b7]'
                    type="email"
                    placeholder="Email"
                />
                <input
                    {...register('password')}
                    className='bg-[#eee] rounded-lg border-none py-[12px] px-[15px] my-[12px] mx-[0px] w-[60%] focus:outline-[#4bb6b7]'
                    type="password"
                    placeholder="Password"
                />
                <div className="flex justify-around w-[60%] h-[50px] items-center">
                    <div className="flex items-center justify-center">
                        <input className="accent-[#333] w-[12px] h-[12px] hover:text-[#4bb6b7]" type="checkbox" name="checkbox" id="checkbox" />
                        <label className="select-none pl-[5px]">Remember me</label>
                    </div>
                    <div className="pass-link">
                        <label className='hover:text-[#4bb6b7]'>Forgot password?</label>
                    </div>
                </div>
                <button className="relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-[12px] px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none">Login</button>
                <span>or use your account</span>
                <div className="my-[20px] mx-0 ">
                    <FontAwesomeIcon icon={faFacebook} className='inline-flex rounded-[50%] w-[40px] h-[40px] my-0 mx-[5px] items-center justify-center hover:ease-in-out duration-300 text-white bg-black hover:border hover:border-[#00f6fb]' />
                    <FontAwesomeIcon icon={faGoogle} className='inline-flex rounded-[50%] w-[40px] h-[40px] my-0 mx-[5px] items-center justify-center hover:ease-in-out duration-300 text-white bg-black  hover:border hover:border-[#00f6fb] ml-8' />
                    <FontAwesomeIcon icon={faLinkedin} className='inline-flex rounded-[50%] w-[40px] h-[40px] my-0 mx-[5px] items-center justify-center hover:ease-in-out duration-300 text-white bg-black  hover:border hover:border-[#00f6fb] ml-8' />
                </div>
            </form>
        </div>
    )
}
