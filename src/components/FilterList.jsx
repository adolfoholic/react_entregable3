import React from 'react'

const FilterList = ({suggestedList, setSearchInput}) => {

  const handleClick = id => setSearchInput(id)

  return (
    <ul className='suggested__list'>{
          suggestedList?.map(location =>(
            <li onClick={() => handleClick(location.id)} key={location.id}>{location.name}</li>
          ))
        }
    </ul>
  )
}

export default FilterList