
import './App.css';
import Header from './components/Header/Header.tsx'
import { Routes, Route,useLocation } from 'react-router-dom';
import RouteList from "./components/Header/RouteList/RouteList.tsx";
import PlanaJourney from './components/Header/PlanaJourney/PlanaJourney';
import Complaints from './components/Complaints/Complaints';
import {  initialOptions } from './components/Api'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AirQuality from './components/AirQuality/AirQuality';
import PrintPdf from './components/PrintPdf/PrintPdf';
import LogIn from './components/LogIn/LogIn';
import Registration from './components/Registration/Registration'
import axios from 'axios';

function App() {
  const location = useLocation();

  return (

    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <video autoPlay muted loop id="myVideo">
          <source src='/video/london_bus.mp4' type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {location.pathname==='/'?'':<Header />}
        
        <Routes>
          <Route path="/journey_result" element={<RouteList />} />
          <Route path='/journey_result/download_ticket' element={<PrintPdf />} />
          <Route path="" element={<LogIn />} />
          <Route path="/Register" element={<Registration />} />

          <Route path="/Plan_a_journey" element={<PlanaJourney />} />
          <Route path='/Complaints' element={<Complaints />} />
          <Route path='/Air_quality' element={<AirQuality />} />
        </Routes>

      </PayPalScriptProvider>


    </div>

  )
}

export default App;
