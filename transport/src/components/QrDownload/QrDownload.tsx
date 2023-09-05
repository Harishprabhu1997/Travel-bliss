import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import QRCode from "react-qr-code";
import uniqid from 'uniqid';
import Ticket from '../CommonFile/Ticket'
import './QrDownload.scss'
import axios from 'axios';
import { toPng } from 'html-to-image';
const QrDownload = React.forwardRef((props, ref: any) => {
  const refd = React.useRef<HTMLDivElement>(null)

  const saved: any = localStorage.getItem("currentRouteDetails");
  const arrivalData: any = localStorage.getItem("arrivingRouteDetails");
  const userDetail: any = localStorage.getItem("userDetail");
  const userId: any = JSON.parse(userDetail);
  const arrivalPoint: any = JSON.parse(arrivalData);
  const fromTo: any = localStorage.getItem("fromTo");
  const fromToObj = JSON.parse(fromTo)
  const initialValue = JSON.parse(saved);
  const journeyId = uniqid()
  const { arrivalDateTime,startDateTime, fare, duration, legs } = initialValue
  const mapLegValue = (leg: any) => {
    return initialValue.legs.map((val: any) => {
      
      return {
        details: val.instruction.detailed,
        departurePoint: val.departurePoint.commonName,
        scheduledTime: val.scheduledDepartureTime,
        duration: val.duration,
        mode: val.mode.id,
        name :val.arrivalPoint.commonName,
        details1 :val.instruction.detailed,
        scheduledTime1 :val.scheduledArrivalTime
      }
    })
  }
  React.useEffect(() => {
    
   
    const convertImg =async ()=>{
      let qrLink;
      if (refd.current === null) {
        return
      }
await  toPng(refd.current, { cacheBust: true, })
.then((dataUrl:any) => {
  qrLink = dataUrl;
  console.log(dataUrl);
  let Arrival: any;
    if (initialValue) {
      if (arrivalPoint) {
        Arrival = {
          departureTime: arrivalPoint.arrivalDateTime,
          arrivalpoint: {
            from: fromToObj.to,
            to: fromToObj.from,
            startTime:arrivalPoint.startDateTime
          },
          startTime: arrivalPoint.startDateTime,
          endTime: arrivalPoint.duration,
          cost: arrivalPoint.fare.totalCost,
          journey_legs: mapLegValue(arrivalPoint.legs),
        }
      }



    }
    let Departure: any;
    
    Departure = {
      departureTime: arrivalDateTime,
      arrivalpoint: {
        from: fromToObj.from,
        to: fromToObj.to,
        startTime:startDateTime
      },
      startTime: startDateTime,
      endTime: duration,
      cost: fare.totalCost,
      journey_legs: mapLegValue(legs),

    }
    const data = {
      qrcode: qrLink,
      ref: journeyId,
      Departure: Departure,
      Arrival: Arrival,
      user_id: userId
    }
    axios.post('http://localhost:8080/api/journey', data)
      .then(function (response) {
        // localStorage.removeItem('fromTo');
      })
      .catch(function (error) {
        console.log(error);
      });
    
  
})
.catch((err:any) => {
  console.log(err)
})
    }
    convertImg()
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
              <div  ref={refd} className='qrcode' >
              <QRCode value={journeyId} 
              
               id='qrcode' />
               </div>
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
