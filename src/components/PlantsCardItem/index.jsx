import React from 'react'
import './style.css'

import { daysdiff } from '../../utils/dates';
import dayjs from 'dayjs';

import happyPlantIcon from '../../images/planticons/plant-healthy.png';
import sadPlantIcon from '../../images/planticons/plant-sad.png';
import readyPlantIcon from '../../images/planticons/plant-ready.png';
import waterIcon from '../../images/quickactionicons/icons8-water-drop-96.png'
import auth from '../../utils/auth'
import { WATER_USER_PLANT } from '../../schemas/api-requests';

export default function index({uuid, nickname, snooze, lastWatered, plant}) {

    const handleQuickWatering = (e) => {
        // TODO: Create/use SQL query to add watering to DB. Refresh this item
        const plantUuid = e.target.dataset.id;

        WATER_USER_PLANT(plantUuid);
                
    }


    // if the snooze date exists and is newer than the lastwatered date plus plant.waterFrequency, use the snooze date, else use lastWatered
    const dayjsSnooze = snooze? dayjs(snooze): null;
    const dayjsLastWatered = lastWatered ? dayjs(lastWatered) : null;
    const dayjsLastPlusFreq = dayjsLastWatered.add(plant.water_frequency,'day');


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
    

  return (
    <div className='plant-item' key={uuid}>
        <div className='plant-info'>
            <div className='plant-namespace'>{nickname}</div>
            <div className='quick-status'>
                <img src={plantIcon} alt="plant-status-icon" height="75px"/>
            </div>    
        </div>
        <div className='plant-actions'>
            <div>
                <img src={waterIcon} height="50px" alt="quick-water-action" data-id={uuid} onClick={handleQuickWatering}/>
            </div>
            
        </div>
    </div>
  )
}
