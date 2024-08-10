import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/pages/login'
import Home from './components/pages/home'
import SignupPage from './components/pages/signup'
import AppHome from './components/pages/application/apphome/index.jsx'
import NewPlant from './components/pages/application/newplant/index.jsx'
import UserPlantPage from './components/pages/application/userplantpage/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <SignupPage/>
      },
      {
        path: '/app',
        element: <AppHome/>
      },
      {
        path:'/app/newplant',
        element:<NewPlant/>
      },
      {
        path: '/app/myplants/:uuid',
        element: <UserPlantPage/>
      }
    ]
  }

]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
    {/* <App /> */}
  </React.StrictMode>,
)
