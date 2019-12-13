import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import './WeatherXDays.css';
import '../Weather.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/forecast?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;
const updateInterval = 65000 * 5;
const days = ['sun','mon','tues','weds','thurs','fri','sat']
const MAX_DAYS = 5;

function WeatherXDays({numDays=1}) {

    numDays = numDays <= MAX_DAYS ? numDays : MAX_DAYS;

    console.log("Refreshing WeatherXDays Component; numDays = " + numDays)

    const [forecast, setForecast] = useState(Array(numDays).fill({icon:'./loading.png', temp:"...", minTemp: "...", maxTemp: "...", day: "...", dt: 0}));

    function getWeather() {

        fetch(weatherAPIURL)
        .then((resp) => resp.json())
        .then(function(data) {
            if(debug) console.log("Updating forecast:", data);

            if(data.cod === 429) {
                if(debug) console.log("We have run out of our quota for our weatherAPI and need to wait to get more weather.");
                setForecast(Array(numDays).fill({icon:'./unavailable.png', temp:"...", minTemp: "...", maxTemp: "...", day: "today", day: "...", dt: 0}))
                return;
            }

            setForecast((forecast) => {
                let now = new Date().getTime() / 1000;
                let list = data.list
                let newForecast = forecast.slice(0, forecast.length)
                let x = 0;
                for(x; x < list.length; x++) {
                    let y = 0;
                    for(y; y < numDays; y++) {
                        if(Math.abs(now + (86400 * y) - list[x].dt) < Math.abs(now + (86400 * y) - newForecast[y].dt)) {

                            newForecast[y] = {
                                icon: 'http://openweathermap.org/img/wn/' + list[x].weather[0].icon +'@2x.png',
                                // temp: dayX.main.feels_like.toFixed("..."),
                                temp: list[x].main.temp.toFixed("..."),
                                minTemp: list[x].main.temp_min.toFixed("..."),
                                maxTemp: list[x].main.temp_max.toFixed("..."),
                                day: getDay(list[x].dt),
                                dt: list[x].dt
                            }
                        }
                    }
                }
                return newForecast
            })

        })
        .catch(function(error) {
            if(debug) console.error("Failed to update weather:", error);
            setForecast(Array(numDays).fill({icon:'./unavailable.png', temp:"...", minTemp: "...", maxTemp: "...", day: "...", dt: 0}))
        })
    }

    function getDay(UNIXTime) {
        var date = new Date(UNIXTime * 1000);
        return days[date.getDay()];
    }

    // Update the forecast and then set interval to update weather every 'updateInterval' seconds
    useEffect(() => {
        getWeather();
        const interval = setInterval(() => {
            getWeather();
        }, updateInterval);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='Weather WeatherXDays module'>
            <h1 className="title">Forecast</h1>
            <h5 className='secondaryTemp'>{(new Date(forecast[0].dt*1000)).getHours() + ":00"}</h5>
            <div className='Forecast'>
                {forecast.map((elem, idx) => {
                    return <div className='WeatherElem' key={idx}>
                        <img className='WeatherIcon' src={forecast[idx].icon} alt='Weather Icon'/>
                        <h4 className="secondaryTemp">{forecast[idx].day.toUpperCase()}</h4>
                        <div className='temp'>
                            <h5 className="secondaryTemp">{forecast[idx].minTemp}</h5>
                            <h2 className="primaryTemp"> {forecast[idx].temp}</h2>
                            <h5 className="secondaryTemp">{forecast[idx].maxTemp}</h5>
                        </div>
                        <h5 className="secondaryTemp">{(new Date(forecast[idx].dt*1000)).getHours() + ":00"}</h5>
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
