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
import useCreateUserPlant from '../../../../plants/hooks/mutations/useCreateUserPlant';
import { useFormik } from 'formik';



export default function index({show, setShow}) {
    const [plant, setPlant] = useState();
    const createPlantMutation = useCreateUserPlant()


    const handleSubmit = async (payload) => {
        const result = await createPlantMutation.mutateAsync({
            nickname: payload.nickname,
            plantUuid: payload.plantUuid
        })
        setShow(false)
         
    }
    const formik = useFormik({
        initialValues: {
            plantUuid: "",
            nickname: "",
            plant: plant
        },
        onSubmit: handleSubmit
    })

    const buttonProps = {
        type: "submit",
        onClick: handleSubmit,
        text: "Save Plant",
        buttonColor: "button-accent"
    }
    
  return (
    <form id="new-plant-form" onSubmit={formik.handleSubmit}>
    <h2>Add a Plant</h2>

    <PlantDropdown plant={formik.values.plant} setPlant={setPlant} formik={formik}/>
    <div className='input-group'>
        <div className="input-group-prepend">
            <label className="custom-form-label bold" htmlFor="nickname">Nickname</label>
        </div>
        <input id="nickname" className='form-control' type="text" placeholder='Optional' defaultValue={formik.values.nickname} onChange={formik.handleChange}></input>
    </div>
    {/* <PlantNicknameTextInput/> */}
    {formik.values.plant ? 
    <>
    <PlantInfoCard plant={formik.values.plant}/>
    <CustomButton {...buttonProps}/>
    </>
        : ""}
    </form>
  )
}
