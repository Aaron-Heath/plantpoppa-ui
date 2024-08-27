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
import { GET_WATERINGS, WATER_USER_PLANT } from '../../schemas/api-requests';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal'
import ContentContainer from '../ContentContainer'
import PlantsInfoGrid from '../PlantsInfoGrid';
import PlantInfoCard from '../PlantInfoCard';

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
    console.log(`WaterIn: ${waterIn}`);
    const dueStatement = getPlantTaskDueStatement(dayjsNextWater);

    // ------ Modal Props ------ \\
    const imgSize = "40px";
    const contentChildren = 
    <>
        <h2>{nickname || plant.common_name}</h2>
        <div className='plant-data'>
            <div className='quick-status'>
                <img src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>
            <PlantInfoCard plant={plant}/>
            <div className='watering-badge'>
                <div className='badge-section'>
                    <img src={waterIcon2} height={imgSize} width={imgSize}/>
                    <b><p>water</p></b>
                </div>
                <div className='badge-section'>
                    <p>{dueStatement}</p>
                </div>
            </div>
            <div className="waterings">
                <p><b>Waterings</b></p>
                {waterings.length < 1 ? "Not yet watered" :
                waterings.map((watering) => {
                   return (<p>{watering.wateringDate}</p>)
                })}
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
