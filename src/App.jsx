import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'
import ErrorScreen from './components/ErrorScreen'

function App() {
  //Para guardar una location
  const [location, setLocation] = useState()
  //Para guardar la informacion del input y hacer la peticion cuando se hace submit
  const [searchInput, setSearchInput] = useState("")
  //Para guardar las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()

  const [hasError, setHasError] = useState(false)

  useEffect(() =>{
    let id= getRandomNumber()
    if(searchInput){
      id = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  },[searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event =>{ //no se necesita el useeffect

    if(event.target.value === ""){//es lo que escribimos en el input
      setSuggestedList()
    }

   const URL =`https://rickandmortyapi.com/api/location?name=${event.target.value}` //el target es el input y necesito su valor

   axios.get(URL)
    .then(res => setSuggestedList(res.data.results))
    .catch(err => console.log(err))

  }
  
  return (
    <div className="App">
      <header className='header__app'></header>
      <form className='form__principal' onSubmit={handleSubmit}>
        <input className='input__principal'
        id="idLocation"
        placeholder="Enter a number from 1 to 126" 
        type="text"
        onChange={handleChange}
        />
        <button className='button__search'><b>Search</b></button>
        <FilterList
        suggestedList={suggestedList}
        setSearchInput={setSearchInput}
        />
      </form>
      {
        hasError ?
        <ErrorScreen/>
        :
        <>
        <LocationInfo location={location}/>
        <div className="card-container">
          {
          location?.residents.map(url => (
            <CardResident
              key={url}
              url={url}
            />
          ))
          }
        </div>
        </>
      }
    </div>
  )
}

export default App
