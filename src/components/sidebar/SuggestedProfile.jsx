import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from "../../services/Firebase";


export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
    
    const [followed, setFollowed] = useState(false);

    async function handlefollowUser() {
        setFollowed(true);

        //firebase: create 2 services(function)
        //update the following array of logged i user (in the case my profile)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        //update the followers array of the user who has been followed 
        await updateFollowedUserFollowers(profileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-between">
                <img 
                    className="rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} 
                    alt="" 
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button 
                className="font-bold text-xs text-blue-medium" 
                type="button"
                onClick={handlefollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
    }

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string,
}