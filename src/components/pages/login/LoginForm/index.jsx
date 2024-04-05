import React from 'react'
import LoginToggle from '../../../LoginToggle'
import Auth from '../../../../utils/auth'

import { useNavigate } from 'react-router-dom'
import './style.css'



export default function LoginForm() {
    const navigate = useNavigate();



    //TODO: Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqPath = process.env.NODE_ENV === "production" ? 
        process.env.PP_AUTH_URL + "/auth/basic" : "/auth/basic";


        // get data
        const payload = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        const response = await fetch(reqPath,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                redirect: "follow",
            }
        )

        const data = await response.json();

        Auth.login(data.jwt);

        navigate('/app');


    }

  return (
    <div>
          <form className='signup-login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" id="email" className='form-control' placeholder="Email"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="password" id="password" className='form-control' placeholder="Password"/>
            </div>
        </div>
        <div className='row d-flex justify-content-center' >
            <button id="login" className='btn btn-primary' type='submit'>Login</button>
        </div>
        <LoginToggle pagePath={'/login'}/>
    </form>
    </div>
  )
}
