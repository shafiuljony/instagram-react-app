import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/Firebase";

export default function usePhotos() {

    const [photos, setPhotos] = useState(null);

    // const {
    //     user: { uid: userId = '' }
    // } = useContext(UserContext);

    const { user } = useContext(UserContext);
    const userId = user ? user.uid :'';

// console.log('userId', userId);
    useEffect(() => {
        async function getTimelinePhotos() {

            //example: [2,1,5] <- 2 being raphel
            const [{following}] = await getUserByUserId(userId)
            // console.log('following', following);
            let followedUserPhotos = [];

            // does the user actually follow people?
            if(following.length > 0){
                followedUserPhotos = await getPhotos(userId, following);
            }

            // re-arrange array to be newest photos first by dateCreated
            followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }
        // console.log(userId);
        getTimelinePhotos();
    },[userId]);

    return { photos };
}