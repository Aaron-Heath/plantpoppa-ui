import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginRegister from './pages/LoginRegister.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <div>Hello, World.</div>
      },
    {
      path: "/login",
      element: <LoginRegister/>
    },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>,
)
