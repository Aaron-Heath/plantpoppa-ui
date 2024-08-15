import React from 'react'
import './style.css'
import PlantsInfoGrid from '../PlantsInfoGrid'

export default function PlantInfoCard({plant}) {
  return (
<div className='plant-data'>
    <h4 id='plant-common-name'>{plant.common_name}</h4>
    <p id='plant-scientific-name'><i>{plant.scientific_name}</i></p>
    <PlantsInfoGrid plant={plant}/>
    <p><b>Watering Info:</b> {plant.water_info}</p>
    <p><b>Sunlight Info:</b> {plant.sunlight_info}</p>
</div> 
  )
}
