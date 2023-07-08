import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
    const [followed, setFollowed] = useState(false);

    async function handlefollowUser() {
        setFollowed(true);

        //firebase: create 2 services(function)
        //update the following array of logged i user (in the case my profile)

        //update the followers array of the user who has been followed 
    }

    return !followed ? (
        <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-between">
                <img className="rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} alt="" />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <button className="font-bold text-xs text-blue-medium" type="button"
            onClick={()  => console.log('Follow this user!')}>
                Follow
            </button>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    userDocId: PropTypes.string,
    username: PropTypes.string,
    profileId: PropTypes.string,
    userId: PropTypes.string
}