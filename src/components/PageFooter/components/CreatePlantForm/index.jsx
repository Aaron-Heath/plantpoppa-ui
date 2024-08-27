import React from 'react'
import './style.css'
import { useQuery } from 'react-query';
import { useState} from 'react';
import { GET_PLANTS } from '../../../../schemas/api-requests';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../CustomButton'
import { ADD_USER_PLANT } from '../../../../schemas/api-requests';
import PlantsInfoGrid from '../../../PlantsInfoGrid';
import PlantInfoCard from '../../../PlantInfoCard';



export default function index({show, setShow}) {
    const { data, isLoading, isError } = useQuery("plants", GET_PLANTS);
    const [plant, setPlant] = useState();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const plantUuid = e.target.value;         
        await setPlant(data.find((plant) => {
            return plant.uuid === plantUuid;
        }));
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
        data? setShow(false) : alert("Something went wrong");
         
    }


    const buttonProps = {
        type: "submit",
        onClick: handleSubmit,
        text: "Save Plant",
        buttonColor: "button-accent"
    }
    
  return (
    <form id="new-plant-form" onSubmit={handleSubmit}>
    <h2>Add a Plant</h2>
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="plant-select">Plant Type</label>
        </div>
        <select id="plant-select" onChange={handleChange} className='form-control' defaultValue="default">
            <option disabled value="default">Select One</option>
            {data?.map((plant) => {
                return <option value={plant.uuid} key={plant.uuid}>{plant.common_name}</option>
            })}
        </select>
    </div>
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="nickname">Nickname</label>
        </div>
        <input id="nickname" className='form-control' type="text" placeholder='Optional'></input>
    </div>
    {plant ? 
    <>
    <PlantInfoCard plant={plant}/>
    <CustomButton {...buttonProps}/>
    </>
        : ""}
</form>
  )
}
