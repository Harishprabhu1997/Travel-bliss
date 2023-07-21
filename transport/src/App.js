import * as React from 'react';

import './App.css';
import Header  from './components/Header/Header.tsx'
import { Routes, Route,useNavigate } from 'react-router-dom';
import  RouteList  from "./components/Header/RouteList/RouteList.tsx";
import PlanaJourney from './components/Header/PlanaJourney/PlanaJourney'

function App() {
  
  return (
    <div className="App">
        <video autoPlay muted loop id="myVideo">
        <source src='/video/london_bus.mp4' type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
        <Header/>
       <Routes>
          <Route path="/journey_result" element={<RouteList />} />
        <Route path="" element={<PlanaJourney/>}/>
       </Routes>
  
    </div>
  );
}

export default App;
