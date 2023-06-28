import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Iphonewithapp from "../assets/images/iphone-with-profile.jpg";
import Logo from "../assets/images/logo.png";
import * as ROUTES from "../constants/routes";
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doseUsernameExist } from "../services/Firebase";
import { db } from "../lib/firebase";

export default function SignUp(){
    const navigate = useNavigate();

    const [userName,setUserName] = useState('');
    const [fullName,setFullName] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');

    const [error, setError] = useState("");

    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async(event) => {
        event.preventDefault();

        const auth = getAuth();
        const usernameExists = await doseUsernameExist(userName)
        if(!usernameExists.length){
            try {
                const { user } = await createUserWithEmailAndPassword(auth, emailAddress, password);

                navigate(ROUTES.DASHBOARD);

                //authentication
                //-> emailAddress & password & username(displayName)
                await updateProfile(user, {
                    displayName: userName
                })


                //firebase user collection ( create a document)
                await db.collection('users').add({
                    userId: user.uid,
                    userName: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });


            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            }
        }else {
            setError('That user Name is already exists');
        }    

    };

    useEffect(() => {
        document.title = 'SignUp - Instagram';
    },[navigate])

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

                    <form onSubmit={handleSignUp} method="POST">
                        <input 
                            aria-label="Enter your user name"
                            type="text"
                            placeholder="User name"   
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                            onChange={({ target }) => setUserName(target.value)}    
                            value={userName}
                        />
                        <input 
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full name"   
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}    
                        />
                        <input 
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"   
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
                            onChange={({ target }) => setEmailAddress(target.value)} 
                            value={ emailAddress}   
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
                            Sign Up
                        </button>
                    </form>        
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white border border-gray-primary rounded p-4">
                    <p className="text-sm">Have an account?{` `}
                        <Link to={ROUTES.LOGIN}className="font-bold text-blue-medium">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}