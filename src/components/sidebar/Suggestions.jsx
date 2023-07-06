import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { getSuggestedProfiles } from '../../services/Firebase';



export default function Suggestions({userId, following}) {
    const [ profiles, setProfiles ] = useState(null);

    // go and get the suggested profiles

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }
        console.log('userId', userId);
        if (userId) {
            suggestedProfiles();
        }
    }, [userId]);
    // hint: use the firebase service (call using userId)
    // getSuggestedProfiles
    //call the async function getSuggestedProfiles
    //store it in state
    //go ahead and render (wait on the profiles as in 'skeleton')
    return !profiles ? (
        <Skeleton count={10} height={150} className="mt-5" />) : profiles.length > 0 ? (
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                    <p className='font-bold text-gray-base'>Suggestions for you</p>
                </div>
                <div className="mt-4 grid grid-5">
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            userDocId={profile.docId}
                            userName={profile.userName}
                            profileId={profile.userId}
                            userId={userId}
                        />
                    ))}
                </div>
            </div>
        ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array
}