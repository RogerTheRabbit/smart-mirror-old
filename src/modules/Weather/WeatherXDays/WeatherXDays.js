import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import './WeatherXDays.css';
import '../Weather.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/forecast?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;

function WeatherXDays({numDays=1}) {

    console.log("numDays = " + numDays)

    const [forecast, setForecast] = useState(Array(numDays).fill({icon:'./loading.png', temp:"...", minTemp: "...", maxTemp: "..."}));

    useEffect(() => {

        function getWeather() {

            fetch(weatherAPIURL)
            .then((resp) => resp.json())
            .then(function(data) {
                if(debug) console.log("Updating forecast:", data);

                if(data.cod === 429) {
                    if(debug) console.log("We have run out of our quota for our weatherAPI and need to wait to get more weather.");
                    setForecast(Array(numDays).fill({icon:'./unavailable.png', temp:"...", minTemp: "...", maxTemp: "..."}))
                    return;
                }
                
                setForecast((forecast) => forecast.map((curr, idx) => {
                    let iconType = data.list[idx].weather[0].icon
                    return {
                        icon: 'http://openweathermap.org/img/wn/' + iconType +'@2x.png',
                        temp: data.list[idx].main.temp.toFixed("..."),
                        minTemp: data.list[idx].main.temp_min.toFixed("..."),
                        maxTemp: data.list[idx].main.temp_max.toFixed("...")
                    }
                }))    
            })
            .catch(function(error) {
                if(debug) console.error("Failed to update weather:", error);
                setForecast(Array(numDays).fill({icon:'./unavailable.png', temp:"...", minTemp: "...", maxTemp: "..."}))
            })
        }

        getWeather();
        const interval = setInterval(() => {
            getWeather();
        }, 65000);
        return () => clearInterval(interval);
    }, [numDays, setForecast]);

    return (
        <div className='Weather WeatherXDays'>
            <h1>Today's Weather!</h1>
            <div className='Forecast'>
                {forecast.map((elem, idx) => {
                    return <div className='WeatherElem' key={idx}>
                        <img className='WeatherIcon' src={forecast[idx].icon} alt='Weather Icon'/>
                        <div className='temp'>
                            <h5>{forecast[idx].maxTemp}</h5>
                            <h3> {"|" + forecast[idx].temp + "|"}</h3>
                            <h5>{forecast[idx].minTemp}</h5>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}

WeatherXDays.protoTypes = {
    numDays: PropTypes.number
}

export default WeatherXDays
