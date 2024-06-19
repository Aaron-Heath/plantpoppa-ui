import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserPlantPage({...props}) {
    const { uuid } = useParams();
  return (
    <div>
        This is the UserPlantPage for {uuid}
    </div>
  )
}
