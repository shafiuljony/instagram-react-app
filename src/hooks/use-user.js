import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/Firebase";

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            //we need a function that we call (firebase service) that gets the user data based on the id
            const [user] = await getUserByUserId(userId);
            setActiveUser(user || {});
        }
        if(userId) {
            getUserObjByUserId();
        }
    },[userId]);

    // console.log('activeUser', activeUser);

    return { user: activeUser };
}