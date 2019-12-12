import React from 'react';
import WeatherBasic from './modules/Weather/Basic/WeatherBasic';
import WeatherXDays from './modules/Weather/WeatherXDays/WeatherXDays';
import BasicTime from './modules/Time/BasicTime'
import './App.css';

function App() {
  return (
    <div className="App">
      <WeatherBasic/>
      <WeatherXDays numDays={5}/>
      <BasicTime/>
    </div>
  );
}

export default App;
