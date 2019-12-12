import React from 'react';

import LeftSegment from './Segments/LeftSegment'
import RightSegment from './Segments/RightSegment'
import Segment from './Segments/Segment'

import WeatherBasic from './modules/Weather/Basic/WeatherBasic';
import WeatherXDays from './modules/Weather/WeatherXDays/WeatherXDays';
import BasicTime from './modules/Time/BasicTime'
import InspirationalQuote from './modules/InspirationalQuote/InspirationalQuote'
import './App.css';

function App() {
  return (
    <div className="App">
      <LeftSegment>
        <WeatherBasic/>
      </LeftSegment>

      <Segment>
        <BasicTime/>
        <InspirationalQuote/>
      </Segment>

      <RightSegment>
        <WeatherXDays numDays={5}/>
      </RightSegment>
      
    </div>
  );
}

export default App;
