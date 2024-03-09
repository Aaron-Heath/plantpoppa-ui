import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginRegister from './components/pages/LoginRegister.jsx';
import Home from './components/pages/home'
import SignupPage from './components/pages/signup'

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
      element: <LoginRegister/>
    },
    {
      path: "/signup",
      element: <SignupPage/>
    }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>,
)
