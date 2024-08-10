import React, { useState } from 'react'
import './style.css'

import LoginToggle from '../../../LoginToggle'
import { useNavigate } from 'react-router-dom'
import { provideButtonLoadingToggle } from '../../../../utils/providers';
import { REGISTER_USER } from '../../../../schemas/api-requests';

export default function SignupForm() {

    const navigate = useNavigate();
    const [partialInput, setPartialInput] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signupBtnId = "submit";
    const loadingToggle = provideButtonLoadingToggle(signupBtnId);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        loadingToggle(true);
        
        const payload = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value,
            zip: document.getElementById("zip").value
        }

        // Checking for missing required inputs
        if (isPartial()) {
            setTimeout(() => {
                loadingToggle(false);
            }, 500);

            return;

        }

        try {
            const response = await REGISTER_USER(payload); 

            if (response && response.status != 201) {
                const data = await response.json();
                setErrorMessage(data.message);
                setError(true);
                loadingToggle(false);
                return;
            }
    
            const data = await response.json();

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                loadingToggle(false);
                setError(true);
                setErrorMessage("Something went wrong. Please try again.")

            }, 800);

            return;
        }

        // Redirect to /login if all is well
        navigate('/login');
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
        {error ? <p className='errorText'>{errorMessage}</p> :<></>}
        <div className='row d-flex justify-content-center' >
            <button id="submit" className='btn btn-primary btn-login-signup' type='submit' onClick={handleSubmit}>
                <span className='btn-text'>Submit</span></button>
        </div>
        <LoginToggle/>      
    </form>
  )
}
