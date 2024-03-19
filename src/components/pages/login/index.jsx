import React from 'react'
import LoginForm from './LoginForm'
import LandingFooter from '../../LandingFooter'
import LandingHeader from '../../LandingHeader'
import PageHeader from '../../pageheader'

export default function index() {
  return (
    <>
    <PageHeader/>
    <div className='d-flex justify-content-center'>
        <LoginForm/>
    </div>
    <LandingFooter/>
    </>
  )
}
