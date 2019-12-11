import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import './WeatherXDays.css';
import '../Weather.css';
import getId from '../id';

const unitType = "imperial" // Options: imperial or metric| no units = Kelvin
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/forecast?id=5134086&APPID=" + getId() +"&units=" + unitType;
const debug = true;
const updateInterval = 650000; //65000;
const days = ['sun','mon','tues','weds','thurs','fri','sat']

function WeatherXDays({numDays=1}) {

    console.log("Refreshing WeatherXDays Component; numDays = " + numDays)

    const [forecast, setForecast] = useState(Array(numDays).fill({icon:'./loading.png', temp:"...", minTemp: "...", maxTemp: "..."}));

    useEffect(() => {

        function getWeather() {

            fetch(weatherAPIURL)
            .then((resp) => resp.json())
            .then(function(data) {
                if(debug) console.log("Updating forecast:", data);

                if(data.cod === 429) {
                    if(debug) console.log("We have run out of our quota for our weatherAPI and need to wait to get more weather.");
                    setForecast(Array(numDays).fill({icon:'./unavailable.png', temp:"...", minTemp: "...", maxTemp: "...", day: "today"}))
                    return;
                }
                
                setForecast((forecast) => forecast.map((curr, idx) => {
                    let dayX = getWeatherForDayX(idx, data.list);
                    let iconType = dayX.weather[0].icon
                    return {
                        icon: 'http://openweathermap.org/img/wn/' + iconType +'@2x.png',
                        temp: dayX.main.feels_like.toFixed("..."),
                        minTemp: dayX.main.temp_min.toFixed("..."),
                        maxTemp: dayX.main.temp_max.toFixed("..."),
                        day: getDay(data.list[idx*8].dt)
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
        }, updateInterval);
        return () => clearInterval(interval);
    }, [numDays, setForecast]);

    return (
        <div className='Weather WeatherXDays'>
            <h1 className="title">Today's Weather!</h1>
            <div className='Forecast'>
                {forecast.map((elem, idx) => {
                    return <div className='WeatherElem' key={idx}>
                        <img className='WeatherIcon' src={forecast[idx].icon} alt='Weather Icon'/>
                        <h4 className="secondaryTemp">{forecast[idx].day}</h4>
                        <div className='temp'>
                            <h5 className="secondaryTemp">{forecast[idx].minTemp}</h5>
                            <h2 className="primaryTemp"> {forecast[idx].temp}</h2>
                            <h5 className="secondaryTemp">{forecast[idx].maxTemp}</h5>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}

function getDay(UNIXTime) {
    var date = new Date(UNIXTime * 1000);
    return days[date.getDay()];
}

function getTimeOffset() {
    var date = new Date();
    // console.log(((date.getHours()+1) / 3).toFixed(0))
    // return parseInt(((date.getHours()+1) / 3 + 2).toFixed(0))

    // console.log(((date.getHours() - (date.getHours() % 3) + 3) % 24))
    return parseInt(((date.getHours() - (date.getHours() % 3) + 3) % 24).toFixed(0))
}

function getWeatherForDayX(day, forecastList) {
    var date = new Date()
    var offset = getTimeOffset() 
    date = new Date(date.getTime() + day * 86400000)
    var expectedFormattedDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+offset+":00:00";
    var temp = forecastList.filter( day => day.dt_txt === expectedFormattedDate)[0]
    return temp === undefined ? forecastList[0] : temp;
}

WeatherXDays.protoTypes = {
    numDays: PropTypes.number
}

export default WeatherXDays
