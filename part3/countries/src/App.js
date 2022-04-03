import React, { useState, useEffect } from 'react'
import axios from "axios"

const App = () => {
  const [filter, setFilter] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [detailsToShow, setDetailsToShow] = useState()

  const handleFilter = (e) => {
    setFilter(e.target.value)
    setDetailsToShow()
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        setAllCountries(response.data.map(country => (
          {
            name: country.name,
            capital: country.capital,
            population: country.population,
            languages: country.languages.map(language => language.name),
            flag: country.flags.png
          }
        )))
      })
  }, [])

  const countriesToShow = filter
    ? allCountries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
    : []

  const showDetails = (e) => {
    setDetailsToShow(countriesToShow.find(country => country.name === e.target.name))
  }

  let display
  if (countriesToShow) {
    if (countriesToShow.length > 10) {
      display = <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1) {
      display =
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>population {countriesToShow[0].population}</p>
          <h2>languages</h2>
          <ul>
            {countriesToShow[0].languages.map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={countriesToShow[0].flag} alt="flag" />
        </div>
    } else {
      display =
        <div>
          {countriesToShow.map(country => <div key={country.name}><span>{country.name}</span><button name={country.name} onClick={showDetails}>show</button></div>)}
        </div>
    }
  }


  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      {display}
      {detailsToShow && <div>
        <h1>{detailsToShow.name}</h1>
        <p>capital {detailsToShow.capital}</p>
        <p>population {detailsToShow.population}</p>
        <h2>languages</h2>
        <ul>
          {detailsToShow.languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={detailsToShow.flag} alt="flag" />
      </div>}
    </div>
  )
}

export default App