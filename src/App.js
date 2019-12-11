import React from 'react';
import WeatherBasic from './modules/Weather/Basic/WeatherBasic';
import WeatherXDays from './modules/Weather/WeatherXDays/WeatherXDays';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <WeatherBasic/> */}
      <WeatherXDays numDays={5}/>
    </div>
  );
}

export default App;
