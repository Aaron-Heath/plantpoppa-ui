import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function LoginButton() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate('login');
    }

  return (
    <div id="login-btn" onClick={handleClick}>
      Login
    </div>
  )
}
