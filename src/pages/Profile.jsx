import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getUserByUsername } from "../services/Firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile/UserProfile";

export default function Profile() {
    const { username } = useParams();
    // console.log(username);

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [userExists, setUserExists] = useState(false);

    useEffect(()=>{
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            // console.log(user, 'user');
            if(user.length > 0){
                setUser(user[0]);
                setUserExists(true);
            }else{
                navigate(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists();
    },[username, navigate])


    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ): null;
}


//user?.username is not working in this case