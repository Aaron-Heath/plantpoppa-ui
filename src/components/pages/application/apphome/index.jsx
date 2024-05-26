import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../../utils/auth';
import PlantsCard from '../../../PlantsCard';

export default function AppHome() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!Auth.loggedIn()) {
            navigate('/login');
        }
    })
    


  return (
    <div>
      This is the app home.
      <PlantsCard/>
    </div>
  )
}
