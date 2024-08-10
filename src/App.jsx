import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import PageHeader from './components/pageheader'
import LandingHeader from './components/LandingHeader'
import LandingFooter from './components/LandingFooter'
import PageFooter from './components/PageFooter'

function App() {
  // Responsiveness viewport height for mobile browsers
  // SOURCE: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

});

const location = useLocation();

  return (
    <>
    <LandingHeader/>
      <main>
        <Outlet/>
      </main>
      {location.pathname.startsWith("/app") ? <PageFooter/> : <LandingFooter/>}
    
    </>
  )
}

export default App
