import React from 'react'
import './style.css'
import AddPlantButton from './components/AddPlantButton'
import { useNavigate } from 'react-router-dom'

export default function PageFooter() {
const navigate = useNavigate();

const handleHomeClick = () => {
  navigate('/app');
}

  return (
    <div id="page-footer">
      <div className='testo' onClick={handleHomeClick}>Home</div>
      <AddPlantButton/>
      <div className='testo'>TEST</div>
    </div>
  )
}
