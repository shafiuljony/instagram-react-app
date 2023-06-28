import { useState, useEffect, useContext } from "react";
import userContext from "../context/user";
import { getUserByUserId } from "../services/Firebase";

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(userContext);

    useEffect(() => {
        async function getUserObjByUserId() {
            //we need a function that we call (firebase service) that gets the user data based on the id
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if(user?.uid) {
            getUserObjByUserId();
        }
    },[user]);

    return { user: activeUser };
}