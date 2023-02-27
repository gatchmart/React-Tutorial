import { useEffect, useState } from "react"
import { Convert, WeatherData } from "./WeatherData"

export default function Weather() {

  const [weather, setWeather] = useState<WeatherData>()

  useEffect(() => {
    async function getWeather() {
      const req = await fetch("http://api.weatherstack.com/current?access_key=af49d5cdc044e0bbff3b45b7f565e996&query=fetch:ip&units=f")
      const data = await req.json()
      setWeather(Convert.toWeatherData(data))
    }

    getWeather()

    console.log(weather)
  }, [])


  return (
    <div>
      <img src={weather?.current.weather_icons[0]} />
      <h2>Temperature: {weather?.current.temperature}</h2>
    </div>
  )
}