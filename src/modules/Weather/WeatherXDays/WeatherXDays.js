import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import './WeatherXDays.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/forecast?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;

function WeatherXDays({numDays=1}) {

    console.log("numDays = " + numDays)

    
    const [icons, setIcon] = useState(Array(numDays).fill('./loading.png'));
    const [temps, setTemp] = useState(Array(numDays).fill(0));

    function getWeather() {
        fetch(weatherAPIURL)
        .then((resp) => resp.json())
        .then(function(data) {
            if(debug) {
                console.log("Updating weather:", data)
            }
            
            setIcon(icons.map((curr, idx) => {
                let iconType = data.list[idx].weather[0].icon
                return ['http://openweathermap.org/img/wn/' + iconType +'@2x.png']
            }));
            // setTemp(data.list[0].main.temp.toFixed(0))
            setTemp(temps.map((curr, idx) => {
                return [data.list[idx].main.temp.toFixed(0)];
            }))
        })
        .catch(function(error) {
            if(debug) {
                console.log("Failed to update weather:", error);
            }
            setIcon(Array(numDays).fill('./unavailable.png'));
            setTemp(Array(numDays).fill("..."));
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
            <h1>Today's Weather!</h1>
            {temps.map((elem, idx) => {
                return <div className='weatherElem' key={idx}>
                    <img className='WeatherIcon' src={icons[idx]} alt='Weather Icon'/>
                    <h3 className='temp'> {temps[idx]} ° F</h3>
                </div>
            })
            }
        </div>
    )
}

WeatherXDays.protoTypes = {
    numDays: PropTypes.number
}

export default WeatherXDays
