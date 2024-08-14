import React from 'react'
import './style.css'

export default function index({type, text, onClick, className, buttonColor, id}) {

 let buttonClass = className ? 'custom-button ' + className : 'custom-button';
 buttonClass +=  " " + buttonColor; 

  return (
    <button id={id? id : ""} className={buttonClass} type={type} onClick={onClick}>{text}</button>
  )
}
