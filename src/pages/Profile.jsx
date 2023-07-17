import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getUserByUsername } from "../services/Firebase";
import * as ROUTES from "../constants/routes";
export default function Profile() {
    const { username } = useParams();
    const navigate = useNavigate()

    const [user, setUser] = useState(second)

    const [userExists, setUserExists] = useState(false);

    useEffect(()=>{
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            if(user.length > 0){
                setUserExists(true);
            }else{
                setUserExists(false);
                navigate(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists();
    },[username, navigate])


    return userExists ? (
        <div className="bg-gray-background">
            <div className="mx-auto max-w-screen-lg">
                {username}
            </div>
        </div>
    ): null;
}