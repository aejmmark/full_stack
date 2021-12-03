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
    <img src = {country[0].flags.png} alt = "Flag" />
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

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = () => {
    setFiltered(countries.filter(item => item.name.common
      .toLowerCase().includes(search)))
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
    handleFilter()
  }

  const chooseCountry = (props) => {
    setFiltered(countries.filter(item =>
      item.name.common === props.name.common))
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <h2>Country search</h2>
        <Filter search={search} handleSearch={handleSearch} />
        <Country country={filteredCountries} />
      </div>
    )
  } else if (filteredCountries.length < 11) {
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