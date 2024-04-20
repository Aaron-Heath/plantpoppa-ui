import React from 'react'
import LoginToggle from '../../../LoginToggle'
import Auth from '../../../../utils/auth'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'



export default function LoginForm() {
    const navigate = useNavigate();
    const [badLogin, setBadLogin] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqPath = import.meta.env.VITE_REACT_APP_AUTH_API + "/auth/basic";

        // get data
        const payload = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        
        try {
            const response = await fetch(reqPath,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                redirect: "follow",
            }
        );

        if (response.status != 200) {
            setBadLogin(true);
        }

        const data = await response.json();
        Auth.login(data.jwt);
        navigate('/app');
            
        } catch (error) {
            console.log(error);
        }





    }

    const handleEdit = async (e) => {
        if (badLogin) {setBadLogin(false)};
        if (error) {setError(false)};
    }

  return (
    <div>
          <form className='signup-login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" id="email" onChange={handleEdit} className='form-control' placeholder="Email"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="password" id="password" onChange={handleEdit} className='form-control' placeholder="Password"/>
            </div>
        </div>
        {badLogin ? <p className='errorText'>Invalid username or password.</p> : <></>}
        {error ? <p className='errorText'>Something went wrong. Please try again.</p> : <></>}
        <div className='row d-flex justify-content-center' >
            <button id="login" className='btn btn-primary' type='submit'>Login</button>
        </div>
        
        <LoginToggle pagePath={'/login'}/>
    </form>
    </div>
  )
}
