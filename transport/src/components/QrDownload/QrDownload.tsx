import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import QRCode from "react-qr-code";
import uniqid from 'uniqid';
import Ticket from '../CommonFile/Ticket'
import './QrDownload.scss'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const QrDownload = React.forwardRef((props, ref: any) => {
  const saved: any = localStorage.getItem("currentRouteDetails");
  const arrivalData: any = localStorage.getItem("arrivingRouteDetails");
  const userDetail: any = localStorage.getItem("userDetail");
const userId :any =  JSON.parse(arrivalData);
  const arrivalPoint: any = JSON.parse(arrivalData);

  const initialValue = JSON.parse(saved);
  const journeyId = uniqid()
  const { startDateTime } = initialValue.legs[0]
  const { arrivalDateTime, fare, duration, legs } = initialValue
  const navigate = useNavigate();
  const location = useLocation();
  const mapLegValue=(leg:any)=>{
return initialValue.legs.map((val: any) => {
  return {
    details: val.instruction.detailed,
    departurePoint: val.departurePoint.commonName,
    scheduledTime: val.scheduledDepartureTime,
    duration: val.duration,
    mode: val.mode.id
  }
})
  }
  React.useEffect(() => {
console.log(userDetail);

    let Arrival:any;
    if (initialValue) {
      if(arrivalPoint){
        Arrival={  departureTime: arrivalPoint.arrivalDateTime,
        arrivalpoint: '',
        startTime: arrivalPoint.startDateTime,
        endTime: arrivalPoint.duration,
        cost: arrivalPoint.fare.totalCost,
        journey_legs: mapLegValue(arrivalPoint.legs),
        }
      }
    
      
     
    }
    let Departure:any;
    Departure = {
      departureTime: arrivalDateTime,
      arrivalpoint: '',
      startTime: startDateTime,
      endTime: duration,
      cost: fare.totalCost,
      journey_legs: mapLegValue(legs),

    }
    const data ={
      qrcode: '',
      ref: journeyId,
      Departure:Departure,
      Arrival:Arrival,
      user_id:'64f4cde14735b87654e9d92e'
    }
    axios.post('http://localhost:8080/api/journey', data)
    .then(function (response) {
      console.log(response);
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  return (

    <Card id='QrDownload' ref={ref}>
      <div className='logo'>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {arrivalPoint ?
                <>
                  <Typography variant="subtitle1" gutterBottom className='start'>
                    journey 2:
                  </Typography>
                  <br />
                  <Ticket
                    startDateTime={arrivalPoint.startDateTime}
                    arrivalDateTime={arrivalPoint.arrivalDateTime}
                    fare={arrivalPoint.fare}
                    duration={arrivalPoint.duration}
                    legs={arrivalPoint.legs}
                  />

                </> : ''
              }
              <>
                <Typography variant="subtitle1" gutterBottom className='start'>
                  journey 1:
                </Typography>
                <br />

                <Ticket
                  startDateTime={startDateTime}
                  arrivalDateTime={arrivalDateTime}
                  fare={fare}
                  duration={duration}
                  legs={legs}
                />
              </>
            </Grid>
            <Grid item xs={4}>
              <QRCode value={journeyId} className='qrcode' />
              <Typography variant="body2" display="block" gutterBottom>
                Ref: {journeyId}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}
)

export default QrDownload
