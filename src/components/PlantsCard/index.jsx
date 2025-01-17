import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { GET_USER_PLANTS } from '../../schemas/api-requests';
import auth from '../../utils/auth';
import PlantCardsItem from '../PlantsCardItem'
import './style.css';
import useGetUserPlants from '../../plants/hooks/queries/useGetPlants';

export default function index() {
    const userPlantsQuery = useGetUserPlants()

    const data = userPlantsQuery.data?.data


  return (
    <div className='plants-card'>
        <h2>My Plants</h2>
        {
          userPlantsQuery.isLoading? <h2>Loading...</h2> :
          data?.sort((a, b) => {
              // Sort data by nickname and common_name
            let aName = a.nickname || a.plant.common_name;
            let bName = b.nickname || b.plant.common_name;
            return aName.localeCompare(bName);
            }).map((userPlant) => <PlantCardsItem {...userPlant} key={userPlant.uuid} userPlant={userPlant}/>)
        }
            {}
 
    </div>
  )
}
