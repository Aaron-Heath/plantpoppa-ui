import React from 'react'

import ContentContainer from "../../../ContentContainer"
import { useQuery } from 'react-query'
import { ME } from '../../../../schemas/api-requests'

export default function settings() {

    const {data, status, isLoading,} = useQuery("ME", ME);

    console.log(isLoading);
    console.log(data);
    if (data) console.log(data);

    const children = 
    <>
    <h2>Settings</h2>
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="nickname">Name</label>
        </div>
        <input id="firstname" className='form-control' type="text" placeholder='Optional' disabled></input>
    </div>
    </>
  return (
    <>
        <ContentContainer children={children}/>
    </>
    
  )
}
