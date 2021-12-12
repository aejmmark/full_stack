import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <>
    <h2>{country[0].name.common}</h2>
    <p>capital {country[0].capital}</p>
    <p>population {country[0].population}</p>
    <h4>languages</h4>
    <ul>
      {Object.values(country[0].languages).map(value => 
        <li key={value}>
          {value}
        </li>
      )}
    </ul>
    <img src = {country[0].flags.png} alt = 'Flag' />
    </>
  )
}

const Countries = ({countries, chooseCountry}) => {
  return (
    <ul>
      {countries.map(country => 
        <CountryForm key={country.name.common}
        country={country}
        chooseCountry={chooseCountry}
        />
      )}
    </ul>
  )
}

const CountryForm = ({country, chooseCountry}) => {
  return (
    <div>
      {country.name.common} <button onClick={() => chooseCountry(country)}>
        show
      </button>
    </div>
  )
}

const Filter = ({search, handleSearch}) => {
  return (
    <div>
      find countries: <input
      value={search}
      onChange={handleSearch}
      />
    </div>
  )
}

const Weather = ({weather}) => {
  return (
    <>
      <h4>Weather in {weather.location.name}</h4>
      <p>temperature: {weather.current.temperature} Celsius</p>
      <img src = {weather.current.weather_icons} alt = "weather" />
      <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </>
  )
}

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('Helsinki')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    handleFilter()
  }, [search])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      handleCapital()
    }
  }, [filteredCountries])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  const handleCapital = () => {
    setCapital(filteredCountries[0].capital)
    console.log(capital)
  }

  const handleFilter = () => {
    setFiltered(countries.filter(item => item.name.common
      .toLowerCase().includes(search)))
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const chooseCountry = (props) => {
    setFiltered(countries.filter(item =>
      item.name.common.includes(props.name.common)))
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <h2>Country search</h2>
        <Filter search={search} handleSearch={handleSearch} />
        <Country country={filteredCountries} />
        <Weather weather={weather} />
      </div>
    )
  } else if (filteredCountries.length < 11 & filteredCountries.length > 1) {
    return (
      <div>
        <h2>Country search</h2>
        <Filter search={search} handleSearch={handleSearch} />
        <Countries
        countries={filteredCountries}
        chooseCountry={chooseCountry}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Country search</h2>
        <Filter search={search} handleSearch={handleSearch} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default App
