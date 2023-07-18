import { useState, useEffect} from "react";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

    // console.log(user, 'user');

    useEffect(() => {
        const auth = getAuth();
        const listener = onAuthStateChanged(auth ,(authUser) => {
            if(authUser) {
                // console.log(authUser, 'authUser');
                //we have a user...therefore we can store the user in localstorage
                localStorage.setItem('authyUser', JSON.stringify(authUser));
                setUser(authUser);
            }else{
                //we don't have an authUser,
                localStorage.removeItem("authUser");
                setUser(null);
            }
        });

        return () => listener();
    },[]);
    
    return { user };
}
