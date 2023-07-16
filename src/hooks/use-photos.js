import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/Firebase";

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = "" }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            //example: [2,1,5] <- 2 being raphel
            const followingUserIds = await getUserByUserId(userId)
            let followedUserPhotos = [];

            // does the user actually follow people?
            if(following.length > 0){
                followedUserPhotos = await getPhotos(userId, followingUserIds);
            }

        }

        console.log(userId);
        // getTimelinePhotos();
    },[]);
}