import React, { useEffect, useState } from 'react'
import { GET_USER_PLANTS } from '../../schemas/api-requests';
import auth from '../../utils/auth';

export default function index() {
    const [plantsList, setPlantsList] = useState([]);

    useEffect(() => {
        const jwt = auth.getToken();
        if(!jwt) {
            auth.logout();
            return;
        }
        const userPlants = GET_USER_PLANTS(jwt);
        console.log(userPlants);
    })

  return (
    <div>
        This is the plant card      
    </div>
  )
}
