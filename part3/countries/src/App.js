import React, { useState, useEffect } from 'react'
import axios from "axios"

const App = () => {
  const [filter, setFilter] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [detailsToShow, setDetailsToShow] = useState()
  const [weather, setWeather] = useState()

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
  if (countriesToShow.length) {
    if (countriesToShow.length > 10) {
      display = <p>Too many matches, specify another filter</p>
      // if (Object.keys(weather).length !== 0) {

      // }
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
      // if (Object.keys(weather).length !== 0) {
      //   setWeather({})
      // }
    }
  }

  const fetchWeather = async () => {
    const coord = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${countriesToShow[0].capital}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
    const lat = coord.data[0].lat
    const lon = coord.data[0].lon

    const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
    return currentWeather.data
  }

  useEffect(() => {
    console.log("countriesToShow.length", countriesToShow.length)
    if (!weather && countriesToShow.length === 1) {
      fetchWeather().then(response => {
        console.log({ temperature: response.main.temp, icon: response.weather[0].icon, windspeed: response.wind.speed, winddeg: response.wind.deg })
        setWeather({ temperature: response.main.temp, icon: response.weather[0].icon, windspeed: response.wind.speed, winddeg: response.wind.deg })
      }
      )

      console.log(countriesToShow.length)
    }
  }, [countriesToShow.length])

  useEffect(() => {
    if (countriesToShow.length !== 1)
      setWeather()
  }, [countriesToShow.length])


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
      {weather && <div>
        <h2>Weather in {countriesToShow[0].capital}</h2>
        <p><strong> temperature: </strong>{weather.temperature} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather-icon" />
        <p><strong>wind: </strong>{weather.windspeed} mps direction {weather.winddeg}°</p>
      </div>

      }

    </div>
  )
}

export default App