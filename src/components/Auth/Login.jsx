import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { fetchSignIn, getHistory, saveCoords } from '../../helpers/ApiCalls';
import "./Home.css";
import { ApiContext } from '../../context/ApiContext';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ClientContext } from '../../context/ClientContext';



export default function Login() {

    const navigate = useNavigate();
    const { setUser, setAuth } = useContext(ApiContext)
    const { setAddress, userCoords, setHistory } = useContext(ClientContext)
    const [errorMessage, setErrorMessage] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const handleSignIn = useCallback(async (data) => {
        setErrorMessage([]);
        const body = {
            email: data.email,
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
            status: true
        };
        if (data.email === "" && data.password === "") {
            setErrorMessage({
                email: `Email can't be blank`,
                password: `Password can't be blank`
            })
        } else if (data.email === "") {
            setErrorMessage({ email: "Email can't be blank" })
        } else if (data.password === "") {
            setErrorMessage({ password: "Password can't be blank" })
        } else {
            try {
                let checkData = await fetchSignIn(data);
                if (checkData.status === 200) {
                    let header = checkData.headers.get('Authorization')
                    setAuth(JSON.parse(sessionStorage.getItem("auth")))
                    setUser(JSON.parse(sessionStorage.getItem("user")))
                    setAddress(JSON.parse(sessionStorage.getItem("currentLocation")))
                    const history = await getHistory(header)
                    setHistory(history.data)
                    saveCoords(body)
                    navigate("/e-Rescue", { replace: true });
                }
            } catch (e) {
                setErrorMessage({ error: e.response.data.errors });
            }
        }
    }, []);


    return (
        <div className="form-container login-container">
            <form className='bg-[#fff] flex flex-col items-center justify-center px-52 h-full text-center gap-2' onSubmit={handleSubmit((data) => {
                handleSignIn(data); reset({ password: "" });
            })} >
                <h1 className="font-bold m-0 mb-[24px] text-3xl mt-24">Login</h1>
                <div className="flex-col relative w-full">
                    <FontAwesomeIcon icon={faEnvelope} className="absolute top-7 pl-3 text-gray-500 text-xl  " />
                    <input
                        {...register('email')}
                        className={errorMessage.email ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-none'}
                        type="email"
                        placeholder="Email"
                    />
                    <p className="text-red-500 m-0">{errorMessage.email ? errorMessage.email : ""}</p>
                </div>
                <div className="flex-col relative w-full mt-5">
                    <FontAwesomeIcon icon={faLock} className="absolute top-7 pl-3 text-gray-500 text-xl" />
                    <input
                        {...register('password')}
                        className={errorMessage.password ? 'bg-[#eee] rounded-lg border-l-4 border-red-500 border py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-[#4bb6b7]' : 'bg-[#eee] rounded-lg border-l-4 border-black py-3 px-10 my-3 w-full focus:outline-[#4bb6b7] focus:border-none'}
                        type="password"
                        placeholder="Password"
                    />
                    <p className="text-red-500 m-0">{errorMessage.password ? errorMessage.password : ""}</p>
                    <p className="text-red-500 m-0">{errorMessage.error ? errorMessage.error : ""}</p>
                </div>
                <div className="flex justify-around w-full h-[50px] items-center">
                    <div className="flex items-center justify-center">
                        <input className="accent-[#333] w-3 h-3 hover:text-[#4bb6b7]" type="checkbox" name="checkbox" id="checkbox" />
                        <label className="select-none pl-[5px]">Remember me</label>
                    </div>
                    <div className="pass-link">
                        <label className='hover:text-[#4bb6b7]'>Forgot password?</label>
                    </div>
                </div>
                <button className="relative rounded-[20px] border-2 border-[#4bb6b7] bg-[#4bb6b7] text-[#fff] text-base font-bold m-[10px] py-3 px-[80px] tracking-[1px] capitalize ease-in-out duration-300 hover:tracking-[3px] active:scale-[0.95] focus:outline-none">Login</button>
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
