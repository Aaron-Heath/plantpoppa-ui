import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { GET_USER_PLANTS } from '../../schemas/api-requests';
import auth from '../../utils/auth';
import PlantCardsItem from '../PlantsCardItem'
import './style.css';

export default function index() {
    const {data, status} = useQuery("userPlants", GET_USER_PLANTS)


  return (
    <div className='plants-card'>
        <h2>My Plants</h2>
            {/* Sort data by nickname and common_name*/}
            {data?.sort((a, b) => {
              let aName = a.nickname || a.plant.common_name;
              let bName = b.nickname || b.plant.common_name;
              
              return aName.localeCompare(bName);
              }).map((userPlant) => <PlantCardsItem {...userPlant} key={userPlant.uuid}/>)}
 
    </div>
  )
}
