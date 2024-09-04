import React from 'react'
import './style.css'
import fullDirectSunImage from '../../images/infoicons/fullDirect.png'
import indirectSunImage from '../../images/infoicons/indirect.png'
import brightIndirectSunImage from '../../images/infoicons/brightIndirect.png'

export default function PlantsInfoGrid({plant}) {

    const sunImages = {
        "bright indirect": brightIndirectSunImage,
        indirect: indirectSunImage,
        direct: fullDirectSunImage        
    }
    const plantSunlight = plant.sunlight.toLowerCase();
  return (
    <div className='plants-info-grid'>
      <div className='plants-info-grid-item'>
        <img src={sunImages[plantSunlight]} height="75px" width="75px"/>
        <p>{plant.sunlight} Sunlight</p>
      </div>
      <div className='plants-info-grid-item'>
        <p>Water every</p>
        <p id="water-frequency">{plant.water_frequency}</p>
        <p>{plant.water_frequency == 1 ? "Day" : "Days"}</p>

      </div>
    </div>
  )
}
