import React, { useState } from 'react'
import './style.css'
import CustomButton from '../CustomButton'

export default function index({children, show, setShow}) {

  const handleClose = (e) => {
    if(e.target.matches(".custom-modal") || e.target.matches("#close-button")) {
      console.log(e.target)
      setShow(false);
    }

  }

  const closeButtonProps = {
    onClick: handleClose,
    buttonColor: "button-orange",
    text: "X",
    id: "close-button"
  }



  return (
    show ? 
    <div className='custom-modal' onClick={handleClose}>
      <CustomButton {...closeButtonProps}/>
      {children}
    </div> : <></>
  )
}
