import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import * as ROUTES from "./constants/routes";
import { Suspense, lazy } from 'react'

const Login = lazy(() => import("./pages/Login"))
const SignUp = lazy(() => import("./pages/SignUp"))

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Route>
    )
  )

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;
