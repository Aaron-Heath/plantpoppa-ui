import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { GET_USER_PLANT } from '../../../../schemas/api-requests';

export default function UserPlantPage({...props}) {
    const { uuid } = useParams();
    const {data, status } = useQuery("userPlant", () => {return GET_USER_PLANT(uuid)});

  return (
    <div className='plants-card justify-start scroll'>
      {data ?  <>
              <h2>{data.nickname || data.plant.common_name}</h2>
              <div>
                <p>{data.plant.common_name}</p>
                <p><i>{data.plant.scientific_name}</i></p>
              </div>
              </>
              :
              <h2>Loading</h2>
      }

        
    </div>
  )
}
