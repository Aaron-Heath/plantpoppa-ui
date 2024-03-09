import React from 'react'

import './style.css'

export default function index() {
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

    switch(window.location) {
        case loginPath:
           return (
            <>
            <button onClick={handleClick} className='btn login-toggle current' id="login-btn">Login</button>
            <button onClick={handleClick} className='btn login-toggle' id="register-btn">Register</button>
            </>
           );
        
           default:
            return (
                <>
                <button onClick={handleClick} className='btn login-toggle' id="login-btn">Login</button>
                <button onClick={handleClick} className='btn login-toggle current' id="register-btn">Register</button>
                </>
            );
    }
}
