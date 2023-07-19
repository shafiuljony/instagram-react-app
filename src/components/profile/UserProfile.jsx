import { useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUserPhotosByUsername } from '../../services/Firebase';
import PhotosCollection from './PhotosCollection';




export default function UserProfile({ user }) {

    const reducer = (state, newState) => ({ ...state, ...newState });

    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }
    const [{ profile, photosCollection, followerCount}, dispath] = useReducer(reducer, initialState);

    useEffect(()=> {
        async function getProfileInfoAndPhotos() {

            const photos = await getUserPhotosByUsername(user.username);

            dispath({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }
        getProfileInfoAndPhotos();
    },[user])

    return (
        <div>
            <Header 
                photosCount={ photosCollection ? photosCollection.length : 0 }
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispath}
            />
            <PhotosCollection  photos={photosCollection} />
        </div>
    )
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired
}