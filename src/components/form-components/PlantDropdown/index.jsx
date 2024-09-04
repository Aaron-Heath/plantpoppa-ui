import React from 'react'
import { useQuery } from 'react-query'
import { GET_PLANTS } from '../../../schemas/api-requests'

export default function index({plant, setPlant, value}) {
    const {data, isLoading, isError} = useQuery("plants", GET_PLANTS);


    const handleChange = async (e) => {
        const plantUuid = e.target.value;         
        await setPlant(data.find((plant) => {
            return plant.uuid === plantUuid;
        }));
    }

  return (
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="plant-select">Plant Type</label>
        </div>
        <select id="plant-select" onChange={handleChange} className='form-control' defaultValue={value? value : "default"}>
            <option disabled value="default">Select One</option>
            {data?.map((plant) => {
                return <option value={plant.uuid} key={plant.uuid}>{plant.common_name}</option>
            })}
        </select>
    </div>
  )
}
