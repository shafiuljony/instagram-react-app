import PropTypes from 'prop-types';
import { useLocation,Navigate, Outlet } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import useAuthListener from '../hooks/use-auth-listener';

export default function ProtectedRoute() {

    const {auth} = useAuthListener();
    location = useLocation();

    return (
        // <Route
        //     {...rest}
        //     render={({ location }) => {
        //         if (user) {
        //             return children;
        //         }

        //         if (!user) {
        //             return (
        //                 <Navigate
        //                     to={{
        //                         pathname: ROUTES.LOGIN,
        //                         state: { from: location }
        //                     }}
        //                 />
        //             );
        //         }

        //         return null;
        //     }}
        // />
        auth?.user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace/>
    );
}

ProtectedRoute.propTypes = {
    user: PropTypes.object
}
