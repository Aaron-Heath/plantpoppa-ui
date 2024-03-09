import React from 'react'
import './style.css'

import LoginToggle from '../../../LoginToggle'

export default function SignupForm() {
    // TODO: Connect to backend for register request

  return (
    <form className='signup-login-form'>
        <h2>Register</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="First Name"/>
            </div>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Last Name"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Email"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Phone"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" id="zip" className='form-control' placeholder="ZIP Code*"/>
                <label className='form-caption' for="zip">*ZIP code is only used for plant data.</label>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Password"/>
            </div>
        </div>
        <div className='row d-flex justify-content-center' >
            <button id="submit" className='btn btn-primary' type='submit'>Register</button>
        </div>
        <LoginToggle/>      
    </form>
  )
}
