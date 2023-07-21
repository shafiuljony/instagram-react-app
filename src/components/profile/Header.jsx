import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/Firebase';
import UserContext from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';


export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername
  }
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center items-center">
          {profileUsername ? (
            <img
              className="rounded-full h-40 w-40 flex cursor-pointer"
              alt={`${fullName} profile picture`}
              title='add profile picture'
              src={`/images/avatars/${profileUsername}.jpg`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          ) : (
            <Skeleton circle height={150} width={150} count={1} />
          )}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4">{profileUsername}</p>
            {activeBtnFollow && isFollowingProfile === null ? (
              <Skeleton count={1} width={80} height={32} />
            ) : (
              activeBtnFollow && (
                <button
                  className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  type="button"
                  onClick={handleToggleFollow}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleToggleFollow();
                    }
                  }}
                >
                  {isFollowingProfile ? 'Unfollow' : 'Follow'}
                </button>
              )
            )}
          </div>
          <div className="container flex mt-4">
            {!followers || !following ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10">
                  <span className="font-bold">{photosCount}</span> photos
                </p>
                <p className="mr-10">
                  <span className="font-bold">{followerCount}</span>
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </p>
                <p className="mr-10">
                  <span className="font-bold">{following?.length}</span> following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
          </div>
        </div>
      </div>
      <div className='mt-8 flex justify-start flex-col'>
          <svg className='cursor-pointer' ti xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100"><path d="M453-446v136q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T513-310v-136h137q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T650-506H513v-144q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T453-650v144H310q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T310-446h143Zm27.266 366q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/><title>add new post</title></svg>
          <p className='font-medium ml-8'>New</p>
      </div>
    </>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
};