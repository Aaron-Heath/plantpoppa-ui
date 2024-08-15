import React, { useState } from 'react'
import './style.css'

import { daysdiff } from '../../utils/dates';
import dayjs from 'dayjs';

import happyPlantIcon from '../../images/planticons/plant-healthy.png';
import sadPlantIcon from '../../images/planticons/plant-sad.png';
import readyPlantIcon from '../../images/planticons/plant-ready.png';
import waterIcon from '../../images/quickactionicons/icons8-water-drop-96.png'
import auth from '../../utils/auth'
import { GET_WATERINGS, WATER_USER_PLANT } from '../../schemas/api-requests';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../CustomModal'
import ContentContainer from '../ContentContainer'
import PlantsInfoGrid from '../PlantsInfoGrid';
import PlantInfoCard from '../PlantInfoCard';

export default function index({uuid, nickname, snooze, lastWatered, plant}) {
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

        console.log(e.currentTarget)
        const target = e.currentTarget;

        const plantUuid = target.dataset.id; 
        console.log(plantUuid);
        setShow(true);
    }


    // if the snooze date exists and is newer than the lastwatered date plus plant.waterFrequency, use the snooze date, else use lastWatered
    const dayjsSnooze = snooze? dayjs(snooze): null;
    const dayjsLastWatered = lastWatered ? dayjs(lastWatered) : null;
    let dayjsLastPlusFreq;
    if(dayjsLastWatered) {
        dayjsLastPlusFreq = dayjsLastWatered?.add(plant.water_frequency,'day');
    }
    
    // If snooze exists and is after the last watered date plus the watering frequency, use snooze, else use last watered plus frequency
    const dayjsNextWater = dayjsSnooze && dayjsSnooze.isAfter(dayjsLastPlusFreq) ? dayjsSnooze : dayjsLastPlusFreq;
    const today = dayjs();      
    
    // Determine which icon is needed
    let plantIcon;

    if(today.isBefore(dayjsNextWater)) {
        plantIcon = happyPlantIcon;
    } else if (today.diff(dayjsNextWater, "day") > 2) // If more than 2 days have passed since the recommended water date
    {
        plantIcon = sadPlantIcon;
    } else {
        plantIcon = readyPlantIcon;
    }

    // ------ Modal Props ------ \\

    const contentChildren = 
    <>
        <h2>{nickname || plant.common_name}</h2>
        <div className='plant-data'>
            <div className='quick-status'>
                <img src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>
            <PlantInfoCard plant={plant}/>
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
