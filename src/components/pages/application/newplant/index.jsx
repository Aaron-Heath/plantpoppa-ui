import React from 'react'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { ADD_USER_PLANT, GET_PLANTS } from '../../../../schemas/api-requests'
import './style.css'
import { filterByUuid } from '../../../../utils/helpers'
import { useNavigate } from 'react-router-dom'

export default function NewPlant() {
    const { data, isLoading, isError } = useQuery("plants", GET_PLANTS);
    const [plant, setPlant] = useState();
    const navigate = useNavigate();
    console.log(data);



    const handleChange = async (e) => {
        // TODO: Handle change to render plant information when selected
        // console.log(e.target.value);
        const plantUuid = e.target.value; 
        
        await setPlant(data.find((plant) => {
            return plant.uuid === plantUuid;
        }));
        console.log(plant);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plantUuid = document.getElementById("plant-select").value;
        const nickname = document.getElementById("nickname").value;

        const payload = nickname ? {
            plantUuid: plantUuid,
            nickname: nickname
        } :
        {
            plantUuid: plantUuid
        };

        const data = await ADD_USER_PLANT(payload);

        data? navigate("/app") : alert("Something went wrong")    

        
    }
  return (
    <div className='plants-card'>
        <form id="new-plant-form" onSubmit={handleSubmit}>
            <h2>New Plant</h2>
            <div className='input-group'>
                <div className="input-group-prepend">
                    <label className="input-group-text" for="plant-select">Plant Type</label>
                </div>
                <select id="plant-select" onChange={handleChange} className='form-control'>
                    <option disabled selected>Select One</option>
                    {data?.map((plant) => {
                        return <option value={plant.uuid} key={plant.uuid}>{plant.common_name}</option>
                    })}
                </select>
            </div>
            <div className='input-group'>
                <div className="input-group-prepend">
                    <label className="input-group-text" for="nickname">Nickname</label>
                </div>
                <input id="nickname" className='form-control' type="text" placeholder='Optional'></input>
            </div>
            {plant ? 
            <div className='plant-data'>
            <h4>{plant.common_name}</h4>
            <p>Scientific Name: {plant.scientific_name}</p>
            <p>Watering Info: {plant.water_info}</p>
            <p>Sunlight Info: {plant.sunlight_info}</p>
            <button type='submit'>Add Plant</button>
            </div> : "No Plant"}
        </form>
    </div>
  )
}
