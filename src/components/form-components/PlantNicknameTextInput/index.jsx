import React from 'react'
export default function PlantNicknameTextInput({value}) {
  return (
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="nickname">Nickname</label>
        </div>
        <input id="nickname" className='form-control' type="text" placeholder='Optional' defaultValue={value? value : ''}></input>
    </div>
  )
}