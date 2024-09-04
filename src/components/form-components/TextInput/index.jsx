import React from 'react'

export default function TextInput({htmlFor, inputName, defaultValue, id, disabled}) {
  return (
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor={htmlFor}>{inputName}</label>
        </div>
        <input id={id} className='form-control' type="text" disabled={disabled} defaultValue={defaultValue}></input>
    </div>
  )
}
