import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import PageHeader from './components/pageheader'

function App() {
  // Responsiveness viewport height for mobile browsers
  // SOURCE: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

});

  return (
    <>
    {/* <PageHeader/> */}
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
