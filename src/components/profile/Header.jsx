import { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/Firebase";


export default function Header({ photosCount, profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    username: profileUsername
}, followerCount, setFollowerCount}){

    const { user } = useUser();

    const [isFollowingProfile, setIsFollowingProfile] = useState(false);

    useEffect(()=> {
        const isLoggedUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        }

        if(user.username && profileUserId){
            isLoggedUserFollowingProfile();
        }
    },[user.username, profileUserId])


    return (
        <h1>Header</h1>
    )
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        username: PropTypes.string,
    }).isRequired,
}