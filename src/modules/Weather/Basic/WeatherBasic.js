import React, { useEffect, useState } from 'react';
import './WeatherBasic.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/weather?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;

function WeatherBasic() {
    
    const [icon, setIcon] = useState('./loading.png')
    const [temp, setTemp] = useState(0)

    function getWeather() {
        fetch(weatherAPIURL)
        .then((resp) => resp.json())
        .then(function(data) {
            if(debug) {
                console.log("Updating weather:", data)
            }
            let iconType = data.weather[0].icon
            setIcon('http://openweathermap.org/img/wn/' + iconType +'@2x.png');
            setTemp(data.main.temp.toFixed(0))
        })
        .catch(function(error) {
            if(debug) {
                console.log("Failed to update weather:", error);
            }
            setIcon('./unavailable.png');
            setTemp("...");
        })
    }

    useEffect(() => {
        getWeather();
        const interval = setInterval(() => {
            getWeather();
        }, 65000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='Weather'>
            <img id='WeatherIcon' src={icon} alt='Weather Icon'/>
            <h3 id='temp'>{temp} ° F</h3>
        </div>
    )
}

export default WeatherBasic
