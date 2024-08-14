import React from 'react'
import './style.css'

export default function index({type, text, onClick, className}) {
  return (
    <button className={className || 'custom-button button-accent'} type={type} onClick={onClick}>{text}</button>
  )
}
