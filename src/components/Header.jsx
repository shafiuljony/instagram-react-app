import { useContext } from "react"

import UserContext from "../context/user";

import * as ROUTES from '../constants/routes';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Logo from '../assets/images/logo.png';

export default function Header() {
    const {user} = useContext(UserContext);
    const auth = getAuth();
    console.log('user', user);
    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full ">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img src={Logo}></img>
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items gap-8">
                        {user ? (
                            <>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                                <button type="button"
                                title="Sign Out"
                                onClick={() => signOut(auth)}
                                onKeyDown={(event)=> {
                                    if(event.key === 'Enter') {
                                        signOut(auth);
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>

                                </button>
                                <div className="flex items-center text-center space-x-4">
                                    <Link to={'/p/${user.dispalyName}'}>
                                        <img src={`/images/avatars/${user.displayName}.jpg`} alt={`${user.displayName} profile picture`} className="rounded-full h-8 w-8 flex"/>
                                    </Link>
                                </div>
                            </>
                        ): (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}