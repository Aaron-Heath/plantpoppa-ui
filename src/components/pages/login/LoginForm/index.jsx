import React from 'react'
import LoginToggle from '../../../LoginToggle'
import Auth from '../../../../utils/auth'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { provideButtonLoadingToggle } from '../../../../utils/providers'
import { LOGIN } from '../../../../schemas/api-requests'



export default function LoginForm() {
    const navigate = useNavigate();
    const [badLogin, setBadLogin] = useState(false);
    const [error, setError] = useState(false);

    const timeOutDelay = 800;
    const loginBtnId = "login";

    const loadingToggle = provideButtonLoadingToggle(loginBtnId);

    // Error handlers
    const handleError = () => {

        setTimeout(() => {
            setError(true);
            loadingToggle(false);
        }, timeOutDelay);
    }

    const handleBadLogin = () => {

        setTimeout(() => {
            setBadLogin(true);
            loadingToggle(false);
        }, timeOutDelay);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBadLogin(false);
        setError(false);
        loadingToggle(true);
        let response;

        
        // get data
        const payload = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        
        try {
        response = await LOGIN(payload);

        if (response.status == 401) {
            handleBadLogin();
            return;
        }

        // Successful login
        if(response.status === 200){
            const data = await response.json();
            Auth.login(data.token);
            navigate('/app');
            return;
        } else {
            throw new Error("Something went wrong.");
        } 

            
        } catch (error) {
            // No response
            if(!response) {
                handleError();
                return;
            }
            if (response.status != 404) {
                handleError();
                return;
            }
        }
    }

    const handleEdit = async (e) => {
        if (badLogin) {setBadLogin(false)};
        if (error) {setError(false)};
    }

  return (
    <>
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
            <button id="login" className='btn btn-primary btn-login-signup' type='submit'>
                <span className='btn-text'>Login</span>
                </button>
        </div>
        <LoginToggle pagePath={'/login'}/>
    </form>
    </>
  )
}
