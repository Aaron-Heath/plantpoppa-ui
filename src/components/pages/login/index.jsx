import React from 'react'
import LoginForm from './LoginForm'
import Auth from '../../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function index() {
  const navigate = useNavigate();
  useEffect(() => {
    if(Auth.loggedIn()) navigate('/app')
  })
  return (
    <>
    <h2 className='logo large-font'>PlantPoppa</h2>
    <div className='d-flex justify-content-center'>
        <LoginForm/>
    </div>
    </>
  )
}
