import React, { useState } from 'react'
import './style.css'

import LoginToggle from '../../../LoginToggle'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {

    const navigate = useNavigate();
    const [partialInput, setPartialInput] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqPath = import.meta.env.VITE_REACT_APP_AUTH_API + "/api/user/register";

        const signupData = {
            firstname: document.getElementById("firstname"),
            lastname: document.getElementById("lastname"),
            email: document.getElementById("email"),
            password: document.getElementById("password"),
            phone: document.getElementById("phone").value,
            zip: document.getElementById("zip").value
        }

        // Checking for missing required inputs
        console.log(isPartial());
        if (isPartial()) return;

        try {
            const response = await fetch(reqPath,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData),
                redirect: "follow",
            });
    
            const data = await response.json();
            navigate('/login');
        } catch (error) {
            setError(true);
        }

    } 

    const handleEdit = (e) => {
        if (partialInput) {setPartialInput(false)};
        if(error) {setError(false)}
    }

    const isPartial = () => {
        let count = 0;
        const requiredElements = {
            firstname: document.getElementById("firstname"),
            lastname: document.getElementById("lastname"),
            email: document.getElementById("email"),
            password: document.getElementById("password"),
        }

        for (let key in requiredElements) {
            let element = requiredElements[key];
            if (!element.value) {
                element.classList.add("missing");
                count ++;
            } else {
                element.classList.remove("missing");
            }


        }
        const partial = count > 0;
        if (partial) setPartialInput(true);
        return partial
    }

  return (
    <form className='signup-login-form'>
        <h2>Sign Up</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="First Name" id="firstname" required/>
            </div>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Last Name" id="lastname" required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Email" id="email" required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Phone" id="phone"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} id="zip" className='form-control' placeholder="ZIP Code*" />
                <label className='form-caption' htmlFor="zip">*ZIP code is only used for plant data.</label>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="password" onChange={handleEdit} className='form-control' placeholder="Password" id="password" required/>
            </div>
        </div>
        {partialInput ? <p className='errorText'>Please fill required fields.</p> :<></>}
        {error ? <p className='errorText'>Something went wrong. Please try again.</p> :<></>}
        <div className='row d-flex justify-content-center' >
            <button id="submit" className='btn btn-primary' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
        <LoginToggle/>      
    </form>
  )
}
