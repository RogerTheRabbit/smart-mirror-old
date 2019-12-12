import React, { useEffect, useState } from 'react';
import './WeatherBasic.css';
import '../Weather.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/weather?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;
const updateInterval = 65000 * 5;

function WeatherBasic() {
    
    const [icon, setIcon] = useState('./loading.png')
    const [temp, setTemp] = useState(0)

    function getWeather() {
        fetch(weatherAPIURL)
        .then((resp) => resp.json())
        .then(function(data) {
            if(debug) console.log("Updating weather:", data);
            let iconType = data.weather[0].icon
            setIcon('http://openweathermap.org/img/wn/' + iconType +'@2x.png');
            setTemp(data.main.temp.toFixed(0))
        })
        .catch(function(error) {
            if(debug) console.log("Failed to update weather:", error);
            setIcon('./unavailable.png');
            setTemp("...");
        })
    }

    useEffect(() => {
        getWeather();
        const interval = setInterval(() => {
            getWeather();
        }, updateInterval);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='Weather module'>
            <h1 className="title">Current Weather</h1>
            <img className='WeatherIcon' src={icon} alt='Weather Icon'/>
            <h3 className='primaryTemp'>{temp} ° F</h3>
        </div>
    )
}

export default WeatherBasic
