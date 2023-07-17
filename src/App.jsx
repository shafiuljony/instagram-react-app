import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom'
import * as ROUTES from "./constants/routes";
import { Suspense, lazy } from 'react'
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/ProtectedRoute';

const Login = lazy(() => import("./pages/Login"))
const SignUp = lazy(() => import("./pages/SignUp"))
const NotFound = lazy(() => import("./pages/Not-found"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<p>Loading...</p>}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            {/* <Route element={<ProtectedRoute/>}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> 
            </Route> */}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </UserContext.Provider>
  )
}

export default App;
