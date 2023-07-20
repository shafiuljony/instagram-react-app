import PropTypes from 'prop-types';
import { useLocation,Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';


export default function ProtectedRoute({user}) {

    // console.log('user',user);

   const location = useLocation();

    return user ? <Outlet />: <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace/>;
}

ProtectedRoute.propTypes = {
    user: PropTypes.object
}
