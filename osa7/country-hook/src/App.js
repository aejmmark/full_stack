import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [countryData, setCountryData] = useState(null)
  const [countryName, setCountryName] = useState(name)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        setCountryData(response.data[0])
      } catch (error) {
        setCountryData(false)
      }
    }
    getCountry()
  }, [countryName])

  const changeCountry = (newName) => {
    setCountryName(newName)
  }

  return {
    countryData,
    changeCountry
  }
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    const nameValue = nameInput.value
    setName(nameValue)
    country.changeCountry(nameValue)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country.countryData} />
    </div>
  )
}

export default App
