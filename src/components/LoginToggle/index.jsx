import React from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'

export default function index({ pagePath }) {

    const navigate = useNavigate();
    const signupPath = '/signup';
    const loginPath = '/login';

    const handleNavigate =(e) => {
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
