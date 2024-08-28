import React, { useState } from 'react'
import './style.css'

import { daysdiff, getPlantTaskDueStatement } from '../../utils/dates';
import dayjs from 'dayjs';

import happyPlantIcon from '../../images/planticons/plant-healthy.png';
import sadPlantIcon from '../../images/planticons/plant-sad.png';
import readyPlantIcon from '../../images/planticons/plant-ready.png';
import waterIcon from '../../images/quickactionicons/icons8-water-drop-96.png';
import waterIcon2 from '../../images/quickactionicons/icons8-water-100.png';
import auth from '../../utils/auth'
import { DELETE_USER_PLANT, WATER_USER_PLANT } from '../../schemas/api-requests';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal'
import ContentContainer from '../ContentContainer'
import PlantInfoCard from '../PlantInfoCard';
import CustomButton from '../CustomButton'

export default function index({uuid, nickname, snooze, lastWatered, nextWatering, plant, waterings}) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);    
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
    if(waterings.length > 1) {
        waterings = waterings.sort((a,b) => {
            return (a.wateringDate > b.wateringDate? -1: 1); 
        })
    }
    const today = dayjs();      
    
    // Determine which icon is needed
    let plantIcon;
    const dayjsNextWater = dayjs(nextWatering);
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
        let dayjsLastWatered = dayjs(lastWatered);
        if(!lastWatered) {
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

        const DELETE = confirm("Are you sure you want to delete " + (nickname || plant.common_name) + "?");

        if(DELETE) {
            await DELETE_USER_PLANT(uuid);
            alert("User Plant Deleted.");
        }

    }

    const customButtonProps = {
        type:"submit",
        text: "Delete Plant",
        onClick: handleDelete,
        buttonColor: "danger-button"
    }
    const contentChildren = 
    <>
        <h2>{nickname || plant.common_name}</h2>
        <div className='plant-data'>
            <div className='quick-status'>
                <img src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>
            <PlantInfoCard plant={plant}/>
            <div className='watering-badge' data-id={uuid} >
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
            <div className='danger-zone'>
                <CustomButton {...customButtonProps}/>
            </div>
        </div>
    </>

    const modalChildren = 
    <>
    <ContentContainer children={contentChildren} classNames={["custom-modal-content"]}/>
    </>

    const modalProps = {
        show: show,
        setShow: setShow,
        children: modalChildren
    }
    

  return (
    <>
    <CustomModal {...modalProps}/>
    <div className='plant-item' key={uuid} onClick={handleClick} data-id={uuid}>
        <div className='plant-info'>
            <div className='plant-namespace'>{nickname || plant.common_name}</div>
            <div className='quick-status'>
                <img src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>    
        </div>
        <div className='plant-actions'>
            <div>
                <img id="water-icon" src={waterIcon} height="50px" alt="quick-water-action" data-id={uuid} onClick={handleQuickWatering}/>
            </div>
            
        </div>
    </div>
    </>
  )
}
