import React from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../utils/auth';
import './style.css'

export default function LoginButton() {
    const navigate = useNavigate();

    const handleLoginClick = (e) => {
        navigate('login');
    }

    const handleLogoutClick = (e) => {
      Auth.logout();
      navigate('/login');
    }
    
    return Auth.loggedIn() ? 
    <div id="login-btn" onClick={handleLogoutClick}>
      Logout
    </div>  
    : 
    <div id="login-btn" onClick={handleLoginClick}>
      Login
    </div>

}
