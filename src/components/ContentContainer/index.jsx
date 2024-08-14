import React from 'react'
import './style.css'

export default function index({children, classNames}) {
  return (
    // classNames.join() adds any additional required classnames to the container for more specific styling
    <div className={'content-container' + ` ${classNames.join(" ")}`}>
      {children}
    </div>
  )
}
