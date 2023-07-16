import { createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'
import * as ROUTES from "./constants/routes";
import { Suspense, lazy } from 'react'
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/Protected.route';

const Login = lazy(() => import("./pages/Login"))
const SignUp = lazy(() => import("./pages/SignUp"))
const NotFound = lazy(() => import("./pages/Not-found"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

function App() {
  const { user } = useAuthListener();
  const router = createBrowserRouter([
    {
      path: ROUTES.LOGIN,
      element: <Login />
    },
    {
      path: ROUTES.SIGN_UP,
      element: <SignUp />

    },
    {
      path: ROUTES.NOT_FOUND,
      errorElement: <NotFound />
    },  
      
  ]
  )

  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={router} />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Suspense>
    </UserContext.Provider>
  )
}

export default App;
