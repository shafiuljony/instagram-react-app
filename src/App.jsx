import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import * as ROUTES from "./constants/routes";
import { Suspense, lazy } from 'react'

const Login = lazy(() => import("./pages/Login"))
const SignUp = lazy(() => import("./pages/SignUp"))
const NotFound = lazy(() => import("./pages/Not-found"))

function App() {
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
      path: "/",
      errorElement: <NotFound />
    }  
      
  ]
  )

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;
