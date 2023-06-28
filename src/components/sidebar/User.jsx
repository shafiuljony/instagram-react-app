import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



const  User = ({userName, fullName}) => 
    !userName || !fullName ? (
    <Skeleton count={1} height={61} /> 
    ) : (
        <Link to={`/p/${userName}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <p>{userName}</p>
        </Link>
    )

export default User;

User.propTypes = {
    userName: PropTypes.string,
    fullName: PropTypes.string
};