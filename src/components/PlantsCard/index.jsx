import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { GET_USER_PLANTS } from '../../schemas/api-requests';
import auth from '../../utils/auth';
import PlantCardsItem from '../PlantsCardItem'
import './style.css';

export default function index() {
    // const [plantsList, setPlantsList] = useState([]);

    const {data, status} = useQuery("userPlants", GET_USER_PLANTS)
    console.log(data);

  return (
    <div className='plants-card'>
        <h2>My Plants</h2>

            {data?.map((userPlant) => <PlantCardsItem {...userPlant} key={userPlant.uuid}/>)}

        This is the plant card      
    </div>
  )
}
