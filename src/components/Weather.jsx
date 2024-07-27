import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search from '../assets/search.svg'
import clear from '../assets/clear.png'
import cloud from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import toast from 'react-hot-toast'
const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false)
    const allIcons = {
        "01d": clear,
        "01n": cloud,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": cloud,
        "04n": cloud,
        "09d": drizzle,
        "09n": drizzle,
        "10d": rain,
        "10n": rain,
        "11d": snow,
        "11n": snow,
        "13d": snow,
        "13n": snow,
        "50d": wind,
    }
    const search = async (city) => {
        if (city === "") {
            toast.error("Enter city: " + city)
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url)
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
                return
            }
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                location: data.name,
                feels_like:data.main.feels_like,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
        }
    }
    useEffect(() => {
        search("jharkhand");
    }, [])
    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={Search} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temprature'>{weatherData.temprature}°c</p>
                <p className='feel'>Feels like: {weatherData.feels_like}°c</p>
                <p className='location'>{weatherData.location}</p>
                <div className='weather-data'>
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={clear} alt="" />
                        <div>
                            <p>{weatherData.windSpeed}Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Weather