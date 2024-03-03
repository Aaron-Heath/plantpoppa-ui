import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageHeader from './components/pageheader'

function App() {

  return (
    <>
    <PageHeader/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
