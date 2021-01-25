import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ filterByName, handleFilterByNameChange }) => {
  return (
    <form>
        <div>
          filter by name: 
          <input 
            value={filterByName}
            onChange={handleFilterByNameChange}
          />
          </div>
      </form>
  )
}

const CountryList = ({ countries, filter }) => {
  const [ singleCountry, setSingleCountry] = useState([])

  const newFilter = filter.toLowerCase()
  const newCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter))

  const showCountry = country => {
    setSingleCountry(singleCountry.concat(country))
  }

  if (singleCountry.length > 0) {
    return (
      <SingleCountry country={singleCountry[0]} />
    )
  }

  if (newCountries.length > 10) {
    return (
      <p>Too many countries, specify search more accurately.</p>
    )
  }

  if (newCountries.length > 1) {
    return (
      <ul>
        {newCountries.map(country => 
        <li key={country.name} >
          {country.name}
          <button onClick={() => showCountry(country)}>show</button>
        </li>)}
      </ul>
    )
  }

  if (newCountries.length === 1) {
    return (
      <SingleCountry country={newCountries[0]} />
    )
  }
  return (
    <p></p>
  )
}



const SingleCountry = ({ country }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag of the country" width="250" height="150"></img>
    </div>
  )
}
  

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filterByName, setFilterByName ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterByNameChange = (event) => {
    console.log(event.target.value)
    setFilterByName(event.target.value)
  }

  return (
    <div>
      <h2>Maiden tiedot</h2>
      <Filter 
        filter={filterByName} 
        handleFilterByNameChange={handleFilterByNameChange}
      />
      <CountryList countries={countries} filter={filterByName} />
      ...
    </div>
  )

}

export default App