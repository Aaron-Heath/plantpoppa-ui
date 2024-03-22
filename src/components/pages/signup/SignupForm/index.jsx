import React from 'react'
import './style.css'

import LoginToggle from '../../../LoginToggle'

export default function SignupForm() {
    // TODO: Connect to backend for register request
    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value,
            zip: document.getElementById("zip").value
        }
        console.log(signupData);

        // Beginning of error handling
        if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.password) {
            alert("Must provide required fields");
            return;
        }

        const response = await fetch('/api/user/',{
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData),
        });

        console.log(await response.json());
    } 

  return (
    <form className='signup-login-form'>
        <h2>Sign Up</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="First Name" id="firstname" required/>
            </div>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Last Name" id="lastname" required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Email" id="email" required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Phone" id="phone"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" id="zip" className='form-control' placeholder="ZIP Code*" />
                <label className='form-caption' htmlFor="zip">*ZIP code is only used for plant data.</label>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" className='form-control' placeholder="Password" id="password" required/>
            </div>
        </div>
        <div className='row d-flex justify-content-center' >
            <button id="submit" className='btn btn-primary' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
        <LoginToggle/>      
    </form>
  )
}
