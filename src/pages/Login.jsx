import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Iphonewithapp from "../assets/images/iphone-with-profile.jpg";
import Logo from "../assets/images/logo.png";
import * as ROUTES from "../constants/routes";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export default function Login(){

    const navigate = useNavigate();
    const location = useLocation();
    const from  = location.state?.from?.pathname || '/';

    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('')

    const [error, setError] = useState("")
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try{
            await signInWithEmailAndPassword(auth,emailAddress, password);
            navigate(from, {replace: true })
        } catch (error){
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }


    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    },[])

    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src={Iphonewithapp} alt="iphone with instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src={Logo} alt="instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
                        <input 
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"   
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}    
                        />
                        <input 
                            aria-label="Enter your password address"
                            type="password"
                            placeholder="Password"   
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}    
                        />
                        <button 
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Log In
                        </button>
                    </form>        
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white border border-gray-primary rounded p-4">
                    <p className="text-sm">Don&apos;t have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}