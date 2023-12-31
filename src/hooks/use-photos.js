import { useState, useEffect }  from "react";
import { getPhotos } from "../services/Firebase";

export default function usePhotos(user) {

    const [photos, setPhotos] = useState(null);


    useEffect(() => {
        async function getTimelinePhotos() {

            //example: [2,1,5] <- 2 being raphel
            // console.log('following', following);
            
            // does the user actually follow people?
            if(user?.following?.length > 0){
                const followedUserPhotos = await getPhotos(user?.userId, user?.following)
                // re-arrange array to be newest photos first by dateCreated
                followedUserPhotos.sort((a,b)=> b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }

        }
        // console.log(userId);
        getTimelinePhotos();
    },[user?.userId, user?.following]);

    return { photos };
}