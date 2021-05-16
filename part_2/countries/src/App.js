import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ details }) => {
  const [showDetails, setShowDetails] = useState(false)

  if (showDetails === true) {
    return (
    <li>
    {details.name} <button onClick={() => setShowDetails(!showDetails)} >{showDetails ? 'hide' : 'show'}</button>
    <div><OneCountry key={details.name} details={details}/>
    </div>
    </li>
    )
  }
  return (
    <li>
      {details.name} <button onClick={() => setShowDetails(!showDetails)} >{showDetails ? 'hide' : 'show'}</button>
      </li>

  )
}

const OneCountry = ({ details }) => {
  const [weatherInfo, setWeatherInfo] = useState({})

  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    access_key: api_key,
    query: `${details.capital}, ${details.name}`
  }

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(({ data }) => {
        console.log('FETCH', data);
        setWeatherInfo({
          location: `${data.location.name}, ${data.location.country}`,
          temperature: data.current.temperature,
          image: data.current.weather_icons,
          windSpeed: data.current.wind_speed,
          windDir:data.current.wind_dir
        });
      });
  }, []);


  return(
    <>
    <h1>{details.name}</h1>
    <p>Capital: {details.capital}</p>
    <p>Population size: {details.population} </p>
    <h2>Languages</h2>
    <ul>
      {details.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={details.flag} alt='Flag' width="100" height="100"/>
    <h2>Weather in {weatherInfo.location}</h2>
    <p><strong>Temperature:</strong> {weatherInfo.temperature} ℃</p>
    <img src={weatherInfo.image} alt='Weather' width="60" height="60"/>
    <p><strong>Wind: </strong>{weatherInfo.windSpeed} mph, direction {weatherInfo.windDir}</p>
    </>
  )
}

const Countries = ({ filterCountries }) => {
  if (filterCountries.length > 10) {
    return (
      <>Too many matches, specify another (more specific) filter</>
    )
  } else if (filterCountries.length > 1 && filterCountries.length <= 10) {
    return (
      <ul>
        {filterCountries.map(country => <Country key={country.name} details={country} />)}
      </ul>
    )
  } else if (filterCountries.length === 1) {
    return (
      <> <OneCountry key={filterCountries[0].name} details={filterCountries[0]}/> </>
    )
  } else {
    return (
      <> No Matches </>
    )
  }
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterCountries, setFilterCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilterCountries(countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
      ))
    }
  return (
    <div>
      <h1>Countries (restAPI) </h1>
      <input onChange={handleFilter} />
      <div>
        <Countries filterCountries={filterCountries}/>
      </div>
    </div>
  )
}

export default App;
