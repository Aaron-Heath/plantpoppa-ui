import React, { useState, useEffect } from 'react'
import './style.css'

import LoginToggle from '../../../LoginToggle'
import { useNavigate } from 'react-router-dom'
import { provideButtonLoadingToggle } from '../../../../utils/providers';
import { REGISTER_USER } from '../../../../schemas/api-requests';
import Auth from '../../../../utils/auth';

export default function SignupForm() {

    const navigate = useNavigate();
    useEffect(() => {
        if(Auth.loggedIn()) navigate('/app');
    });

    const [partialInput, setPartialInput] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signupBtnId = "submit";
    const loadingToggle = provideButtonLoadingToggle(signupBtnId);

    const FORM_FIELDS = {
        FIRST_NAME: "firstName",
        LAST_NAME: "lastName",
        EMAIL: "email",
        PASSWORD: "password",
        PHONE: "phone",
        ZIP: "zip"
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        loadingToggle(true);
        
        const payload = {
            firstName: document.getElementById(FORM_FIELDS.FIRST_NAME).value,
            lastName: document.getElementById(FORM_FIELDS.LAST_NAME).value,
            email: document.getElementById(FORM_FIELDS.EMAIL).value,
            password: document.getElementById(FORM_FIELDS.PASSWORD).value,
            phone: document.getElementById(FORM_FIELDS.PHONE).value,
            zip: document.getElementById(FORM_FIELDS.ZIP).value
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
            firstname: document.getElementById(FORM_FIELDS.FIRST_NAME),
            lastname: document.getElementById(FORM_FIELDS.LAST_NAME),
            email: document.getElementById(FORM_FIELDS.EMAIL),
            password: document.getElementById(FORM_FIELDS.LAST_NAME),
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
                <input type="text" onChange={handleEdit} className='form-control' placeholder="First Name" id={FORM_FIELDS.FIRST_NAME} required/>
            </div>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Last Name" id={FORM_FIELDS.LAST_NAME} required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Email" id={FORM_FIELDS.EMAIL} required/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} className='form-control' placeholder="Phone" id={FORM_FIELDS.PHONE}/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="text" onChange={handleEdit} id={FORM_FIELDS.ZIP} className='form-control' placeholder="ZIP Code*" />
                <label className='form-caption' htmlFor="zip">*ZIP code is only used for plant data.</label>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="password" onChange={handleEdit} className='form-control' placeholder="Password" id={FORM_FIELDS.PASSWORD} required/>
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
