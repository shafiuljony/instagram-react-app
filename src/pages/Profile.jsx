import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getUserByUsername } from "../services/Firebase";
import * as ROUTES from "../constants/routes";


export default function Profile() {
    const { username } = useParams();
    // console.log(username);

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [userExists, setUserExists] = useState(false);

    useEffect(()=>{
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            console.log(user, 'user');
            if(user.length > 0){
                setUser(user[0]);
                setUserExists(true);
            }else{
                navigate(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists();
        // console.log(user, 'user');
    },[username, navigate])


    return userExists ? (
        <div className="bg-gray-background">
            <div className="mx-auto max-w-screen-lg">
                this is {user.fullName} &apos;s profile
            </div>
        </div>
    ): null;
}