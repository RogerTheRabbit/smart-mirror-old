import React from 'react';
import WeatherBasic from './modules/Weather/Basic/WeatherBasic';
import WeatherFiveDay from './modules/Weather/FiveDay/WeatherFiveDay';
import './App.css';

function App() {
  return (
    <div className="App">
      <WeatherBasic/>
      <WeatherFiveDay/>
    </div>
  );
}

export default App;
