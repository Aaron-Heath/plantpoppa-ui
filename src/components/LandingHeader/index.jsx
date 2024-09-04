import React from 'react'
import './style.css'
import CustomButton from '../CustomButton'
import Auth from '../../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function LandingHeader() {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
      navigate('login');
  }

  const handleLogoutClick = (e) => {
    Auth.logout();
    navigate('/login');
  }

  const handleAppClick = (e) => {
    navigate('/app')
  }

  const handleHome = () => {
    navigate('/')
  }

  const buttonClassName = 'bold';
  const buttonColor = 'button-accent'; 
  // Button functions as login/logout depending on the Auth.loggedIn() status.
  let buttonProps;

  if(!Auth.loggedIn()) {
    buttonProps =   {
      text:"Login",
      onClick: handleLoginClick,
      className: buttonClassName,
      buttonColor: buttonColor
    }
  } else if (Auth.loggedIn() && window.location.pathname === "/") {
    buttonProps = {
      text: "App",
      onClick: handleAppClick,
      className: buttonClassName,
      buttonColor: buttonColor
    }
  } else {
    buttonProps = {
      text: "Logout",
      onClick: handleLogoutClick,
      className: buttonClassName,
      buttonColor: buttonColor
    }
  }
  
  return (
    <header className='landing-header navbar'>
        <p className='brand accent-orange clickable' onClick={handleHome}>PlantPoppa</p>
        <CustomButton {...buttonProps}/>
    </header>
  )
}
