import React from 'react'
import LoginToggle from '../../../LoginToggle'
import './style.css'

export default function LoginForm() {
    //TODO: Handle form submit

  return (
    <div>
          <form className='signup-login-form'>
        <h2>Login</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Email"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Password"/>
            </div>
        </div>
        <div className='row d-flex justify-content-center' >
            <button id="login" className='btn btn-primary' type='submit'>Login</button>
        </div>
        <LoginToggle pagePath={'/login'}/>
    </form>
    </div>
  )
}
