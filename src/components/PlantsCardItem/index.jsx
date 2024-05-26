import React from 'react'

export default function index({uuid, nickname, plant}) {
  return (
    <div key={uuid}>
      {nickname} | {plant.sunlight}
    </div>
  )
}
