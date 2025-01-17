import React from 'react'
import PlantCardsItem from '../PlantsCardItem'
import './style.css';
import useGetUserPlants from '../../plants/hooks/queries/useGetPlants';

export default function index() {
    const userPlantsQuery = useGetUserPlants()

    const data = userPlantsQuery.data?.data


  return (
    <div className='plants-card overflow-y-scroll md:w-4/6'>
        <h2 className='py-2 bold text-2xl'>My Plants</h2>
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
