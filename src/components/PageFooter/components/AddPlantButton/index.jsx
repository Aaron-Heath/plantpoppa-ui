import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

export default function AddPlantButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('app/newplant');
    }
  return (
    <div id="add-plant-btn" data-toggle="modal" data-target="#new-plant-modal" onClick={handleClick}>+</div>
  )
}
