import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { GET_USER_PLANT } from '../../../../schemas/api-requests';
import './style.css'

export default function UserPlantPage({...props}) {
    const { uuid } = useParams();
    const {data, status } = useQuery("userPlant", () => {return GET_USER_PLANT(uuid)});

  return (
    <div className='plants-card justify-start scroll'>
      {data ?  <>
              <h2 className='display-name'>{data.nickname || data.plant.common_name}</h2>
              <p className='science-name'><i>{data.plant.scientific_name}</i>
              </p>
                <div className='card-row'>
                  <p><b>Common Name:</b> {data.plant.common_name}</p>
                </div>
                <div className='card-row'>
                  <p><b>Sunlight:</b> {data.plant.sunlight}</p>
                  <p>{data.plant.sunlight_info}</p>
                </div>
                <div className='card-row'>
                  <p><b>Watering:</b> Water every {data.plant.water_frequency} days</p>
                  <p>{data.plant.water_info}</p>
                </div>
                
              </>
              :
              <h2>Loading</h2>
      }

        
    </div>
  )
}
