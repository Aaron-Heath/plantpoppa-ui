import React from 'react'
import LoginToggle from '../../../LoginToggle'
import Auth from '../../../../utils/auth'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { provideButtonLoadingToggle } from '../../../../utils/providers'
import { LOGIN } from '../../../../schemas/api-requests'
import useLogin from '../../../../auth/hooks/mutations/useLogin'
import { useFormik } from 'formik'



export default function LoginForm() {
    const navigate = useNavigate();
    const loginMutation = useLogin()

    const [badLogin, setBadLogin] = useState(false);
    
    const [error, setError] = useState(false);

    const timeOutDelay = 800;
    const loginBtnId = "login";

    const loadingToggle = provideButtonLoadingToggle(loginBtnId);

    // Error handlers
    // const handleError = () => {

    //     setTimeout(() => {
    //         setError(true);
    //         loadingToggle(false);
    //     }, timeOutDelay);
    // }

    // const handleBadLogin = () => {

    //     setTimeout(() => {
    //         setBadLogin(true);
    //         loadingToggle(false);
    //     }, timeOutDelay);
    // }
    
    const handleSubmit = async (payload) => {
       
        const result = await loginMutation.mutateAsync({...formik.values})

        if(result.status >= 200 && result.status < 300) {
            navigate("/app")
        }
    }

    const formik = useFormik({
        initialValues:{
            'email': '',
            'password': ''
        },
        onSubmit: handleSubmit
    });

    // const handleEdit = async (e) => {
    //     if (badLogin) {setBadLogin(false)};
    //     if (error) {setError(false)};
    // }
    console.log(loginMutation)

  return (
    <>
          <form className='signup-login-form' onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <div className='row'>
            <div className='col'>
                <input type="text" id="email" onChange={formik.handleChange} defaultValue={formik.values.email} className='form-control' placeholder="Email"/>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <input type="password" id="password" onChange={formik.handleChange} defaultValue={formik.values.password} className='form-control' placeholder="Password"/>
            </div>
        </div>
        {loginMutation.isError && loginMutation.error.status === 401 ? <p className='errorText'>Invalid username or password.</p> : <></>}
        {loginMutation.isError && loginMutation.error.status > 401 ? <p className='errorText'>Something went wrong. Please try again.</p> : <></>}
        <div className='row d-flex justify-content-center' >
            <button id="login" className='btn btn-primary btn-login-signup' type='submit'>
                <span className='btn-text'>Login</span>
            </button>
        </div>
        <LoginToggle pagePath={'/login'}/>
    </form>
    </>
  )
}
