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
import PlantDropdown from '../../../form-components/PlantDropdown'
import PlantNicknameTextInput from '../../../form-components/PlantNicknameTextInput';



export default function index({show, setShow}) {
    const [plant, setPlant] = useState();

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

    <PlantDropdown plant={plant} setPlant={setPlant}/>
    <PlantNicknameTextInput/>
    {plant ? 
    <>
    <PlantInfoCard plant={plant}/>
    <CustomButton {...buttonProps}/>
    </>
        : ""}
</form>
  )
}
