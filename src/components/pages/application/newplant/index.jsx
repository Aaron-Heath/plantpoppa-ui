import React from 'react'
import { useQuery } from 'react-query'
import { GET_PLANTS } from '../../../../schemas/api-requests'

export default function NewPlant() {
    const { data, isLoading, isError } = useQuery("plants", GET_PLANTS);
    console.log(data);
  return (
    <div className='plants-card'>
        <form id="new-plant-form">
            <h2>New Plant</h2>
            <div className='input-group'>
                <div class="input-group-prepend">
                    <label class="input-group-text" for="plant-select">Plant Type</label>
                </div>
                <select id="plant-select" className='form-control'>
                    <option disabled selected>Select One</option>
                    {data?.map((plant) => {
                        return <option value={plant.uuid} key={plant.uuid}>{plant.common_name}</option>
                    })}
                </select>
            </div>
            <div className='input-group'>
                <div class="input-group-prepend">
                    <label class="input-group-text" for="plant-select">Nickname</label>
                </div>
                <input className='form-control' type="text" placeholder='Optional'></input>
            </div>
        </form>
    </div>
  )
}
