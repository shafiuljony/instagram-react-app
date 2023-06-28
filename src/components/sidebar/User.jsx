import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



const  User = ({userName, fullName}) => 
    !userName || !fullName ? (
    <Skeleton count={1} height={61} /> 
    ) : (
        <Link to={`/p/${userName}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center col-sapn-1">
                <img src={`/images/avatars/${userName}.jpg`} alt="" className='rounded-full w-16 flex mr-3' />
            </div>
            <div className='col-span-3'>
                <p className="font-bold text-sm">{userName}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    )

export default User;

User.propTypes = {
    userName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
};