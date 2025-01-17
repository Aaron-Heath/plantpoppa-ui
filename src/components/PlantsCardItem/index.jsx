import React, { useState } from 'react'
import './style.css'

import { daysdiff, getPlantTaskDueStatement } from '../../utils/dates';
import dayjs from 'dayjs';

import happyPlantIcon from '../../images/planticons/plant-healthy.png';
import sadPlantIcon from '../../images/planticons/plant-sad.png';
import readyPlantIcon from '../../images/planticons/plant-ready.png';
import waterIcon from '../../images/quickactionicons/icons8-water-drop-96.png';
import waterIcon2 from '../../images/quickactionicons/icons8-water-100.png';
import { DELETE_USER_PLANT, WATER_USER_PLANT, EDIT_USER_PLANT } from '../../schemas/api-requests';
import CustomModal from '../CustomModal'
import ContentContainer from '../ContentContainer'
import PlantInfoCard from '../PlantInfoCard';
import CustomButton from '../CustomButton';
import PlantNicknameTextInput from '../form-components/PlantNicknameTextInput';
import PlantDropdown from '../form-components/PlantDropdown';

export default function index({plant, userPlant}) {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editPlant, setEditPlant] = useState(plant);

    // Turn off edit mode if the modal is not showing
    if (!show && edit) setEdit(false);
    
    const handleQuickWatering = (e) => {
        // TODO: Create/use SQL query to add watering to DB. Refresh this item
        const plantUuid = e.target.dataset.id;

        WATER_USER_PLANT(plantUuid);
                
    }

    const handleClick = async (e) => {
        if(e.target.matches("#water-icon")) {
            return;
        }
        setShow(true);
    }

    // Sort in descending order (most recent first)
    if(userPlant.waterings.length > 1) {
        userPlant.waterings = userPlant.waterings.sort((a,b) => {
            return (a.wateringDate > b.wateringDate? -1: 1); 
        })
    }
    const today = dayjs();      
    
    // Determine which icon is needed
    let plantIcon;
    const dayjsNextWater = dayjs(userPlant.nextWatering);
    if(today.isBefore(dayjsNextWater)) {
        plantIcon = happyPlantIcon;
    } else if (today.diff(dayjsNextWater, "day") > 2) // If more than 2 days have passed since the recommended water date
    {
        plantIcon = sadPlantIcon;
    } else {
        plantIcon = readyPlantIcon;
    }

    const waterIn = today.diff(dayjsNextWater, "days") + 1;
    const dueStatement = getPlantTaskDueStatement(dayjsNextWater);

    // ------ Modal Props ------ \\
    const imgSize = "40px";
    const waterSchedule = [];
    for (let i = 0; i < 5; i ++) {
        let dayjsLastWatered = dayjs(userPlant.lastWatered);
        if(!userPlant.lastWatered) {
            dayjsLastWatered = dayjs();
        }
        if (i === 0) {
            waterSchedule.push({
                month: dayjsLastWatered.format("MMM"),
                day: dayjsLastWatered.format("D"),
                type: "past"
            })
        } else if (i === 1) {
            waterSchedule.push({
                month: dayjsNextWater.format("MMM"),
                day: dayjsNextWater.format("D"),
                type: "next"
            });
        } else {
            let next = dayjsNextWater.add((i-1) * plant.water_frequency, "day")
            waterSchedule.push({
                month: next.format("MMM"),
                day: next.format("D")
            });
        }
    }
    const handleDelete = async (e) => {
        if(!e.target.matches(".danger-button")) {
            return;
        }

        const DELETE = confirm("Are you sure you want to delete " + (userPlant.nickname || plant.common_name) + "?");

        if(DELETE) {
            await DELETE_USER_PLANT(userPlant.uuid);
            alert("User Plant Deleted.");
        }

    }

    const handleEdit = async(e) => {
        if(!e.target.matches(".edit-button")) {
            return;
        }
        setEdit(true);
    }

    const handleSave = async(e) => {
        if(!e.target.matches(".save-button")) return;

        const payload = {
            nickname: document.getElementById("nickname").value,
            userPlantUuid: userPlant.uuid,
            plantUuid: editPlant.uuid
        }
        const data = await EDIT_USER_PLANT(userPlant.uuid, payload);
        setEdit(false);
        setShow(false);
    }

    const deleteButtonProps = {
        type:"submit",
        text: "Delete Plant",
        onClick: handleDelete,
        buttonColor: "danger-button"
    }

    const editButtonProps = {
        type: "submit",
        // Props change if edit if true/false. Allows quick toggle
        text: edit? "Save ": "Edit Plant",
        onClick: edit? handleSave : handleEdit,
        buttonColor: edit? "save-button": "edit-button"
    }
    const contentChildren = 
    <>
        <div className='plant-header'>
            {
                edit?
                <>
                <PlantNicknameTextInput value={userPlant.nickname || editPlant.common_name }/>
                <PlantDropdown plant={editPlant} setPlant={setEditPlant}/>

                </> : 
        
                <h2>{userPlant.nickname || plant.common_name}</h2> 
            }
            
        </div>
        <div className='plant-data'>
            <>
            {edit? 
            <>
            <PlantInfoCard plant={editPlant} value={editPlant.uuid} userPlant={userPlant}/>
            </>
            : 
            <>
                <div className='quick-status size-20'>
                    <img src={plantIcon} alt="plant-status-icon" height="75px"/>
                </div>
                <PlantInfoCard plant={plant}/>
                <div className='watering-badge' data-id={userPlant.uuid} >
                    <div className='badge-logo'>
                        <img src={waterIcon2} height={imgSize} width={imgSize}/>
                        <b><p>water</p></b>
                    </div>
                    <div className='badge-section'>
                        <p>{dueStatement}</p>
                    </div>
                </div>
                <p><b>Watering Schedule</b></p>
                <div className="waterings">

                    {waterSchedule.map((date) => {
                        const className = date.type? "water-day " + date.type : "water-day"
                        return <div className={className}> 
                            <div>
                                {date.month}
                            </div>
                            <div>
                                {date.day}
                            </div>
                        </div>
                    })}
                </div>

            
            </>
            
            
            }
                <div className='danger-zone'>
                    <CustomButton {...deleteButtonProps}/>
                    <CustomButton {...editButtonProps}/>
                </div>
            </>
        </div>
    </>

    const modalChildren = 
    <>
    <ContentContainer children={contentChildren} classNames={["custom-modal-content "]}/>
    </>

    const modalProps = {
        show: show,
        setShow: setShow,
        children: modalChildren
    }
    

  return (
    <>
    <CustomModal {...modalProps}/>
    <div className='plant-item h-20' key={userPlant.uuid} onClick={handleClick} data-id={userPlant.uuid}>
        <div className='plant-info'>
            <div className='plant-namespace'>
                <span className='md:font-bold'>{userPlant.nickname || plant.common_name}</span><span className='hidden italic text-sm md:inline'> - {userPlant.plant.scientific_name}</span>
                <div className='hidden text-sm md:block'>
                    Last Watered: {userPlant.lastWatered? dayjs(userPlant.lastWatered).format("MMM D, YYYY") : "No watering recorded"}
                </div>
            </div>
            <div className='quick-status'>
                <img className='object-contain size-20' src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>    
        </div>
        <div className='plant-actions'>
            <div>
                <img id="water-icon" className='object-contain size-12' src={waterIcon} height="50px" alt="quick-water-action" data-id={userPlant.uuid} onClick={handleQuickWatering}/>
            </div>
            
        </div>
    </div>
    </>
  )
}
