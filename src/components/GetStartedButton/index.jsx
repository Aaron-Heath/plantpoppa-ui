import React from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function GetStartedButton() {
    const navigate = useNavigate();

const handleClick = (e) => {
    navigate('/signup');
    return;
}
  return (
    <div className='get-started bold offwhite clickable' onClick={handleClick}>
    Get started. It's FREE
    </div>
  )
}
