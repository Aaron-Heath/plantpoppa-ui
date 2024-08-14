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

  const buttonClassName = 'bold';
  const buttonColor = 'button-accent'; 
  // Button functions as login/logout depending on the Auth.loggedIn() status.
  const buttonProps = Auth.loggedIn()?
  {
    text: "Logout",
    onClick: handleLogoutClick,
    className: buttonClassName,
    buttonColor: buttonColor
  } :
  {
    text:"Login",
    onClick: handleLoginClick,
    className: buttonClassName,
    buttonColor: buttonColor
  }
  return (
    <header className='landing-header navbar'>
        <CustomButton {...buttonProps}/>
    </header>
  )
}
