import React from 'react'

const LocationInfo = ({location}) => {

  console.log(location)

  return (
    <article className='card__detalle'>
        <h2>{location?.name}</h2>
        <ul>
            <li><span className='span__location'>Type: </span>{location?.type}</li>
            <li><span className='span__location'>Dimension: </span>{location?.dimension}</li>
            <li><span className='span__location'>Population: </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
}

export default LocationInfo