import { Outlet } from 'react-router-dom'
import { useState } from 'react'
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
