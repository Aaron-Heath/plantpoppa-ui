import React from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'

export default function index({ pagePath }) {

    const navigate = useNavigate();
    const signupPath = '/signup';
    const loginPath = '/login';

    const handleClick = (e) => {
        e.preventDefault();

        if(e.target.matches("#login-btn")) {
            window.location.pathname = loginPath
            return;
        }

        if (e.target.matches("#register-btn")) {
            window.location.pathname = signupPath;
            return;
        }
    }

    const handleNavigate =(e) => {
        console.log(pagePath);
        e.preventDefault();
        navigate(pagePath == loginPath ? signupPath : loginPath);
        return;
    }

    switch(pagePath) {
        case loginPath:
        return (
            <div className='login-signup-redirect'>
                <p>Don't have an account?</p>
                <a href={signupPath} onClick={handleNavigate}>Sign Up Here</a>
            </div>
        )
        default:
            return (
            <div className='login-signup-redirect'>
                <p>Already have an account?</p>
                <a href={loginPath} onClick={handleNavigate}>Login Here</a>
            </div>
            )
    }
}
