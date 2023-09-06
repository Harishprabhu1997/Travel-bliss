import axios from 'axios';
import React from 'react'
import Ticket from '../CommonFile/Ticket';
import { Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent,AccordionSummary,AccordionDetails,Accordion, Grid, Typography } from '@mui/material';
import './JourneyResults.scss';
function JourneyResults() {
  const [journeyResult, setjourneyResult] = React.useState([])
  const [expanded, setExpanded] = React.useState<string | false>(false);

  React.useEffect(() => {
    const userDetail: any = localStorage.getItem("userDetail");
    const userId: any = JSON.parse(userDetail);
    axios.get(`http://localhost:8080/api/journey/${userId}`)
      .then(function (response) {
        if (response.data) {
          let res = response.data
          res = res.filter((value: any, index: any, self: any) =>
            index === self.findIndex((t: any) => (
              t.ref === value.ref
            ))


          )
          setjourneyResult(res)
          console.log(res, 'show');

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  const handleChange =
    (panel: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);

    };
  return (
    <div id='JourneyResults'>
      {journeyResult.map((res: any, ind: any) =>
        <Paper className='journeyList'>
          <Accordion
            expanded={expanded === ind + 1}
            onChange={handleChange(ind + 1)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={ind + 1}
            >

              <Typography marginTop={'7px'}>
            {ind+1}.    From : {res.Departure.arrivalpoint.from.label}   </Typography>
              <Typography marginTop={'7px'} marginLeft={'10px'}>
                To : {res.Departure.arrivalpoint.to.label}   </Typography>
              {res.Arrival ? <> <Typography marginTop={'7px'}>
                From : {res.Departure.arrivalpoint.to.label}   </Typography>
                <Typography marginTop={'7px'}>
                  To : {res.Departure.arrivalpoint.from.label}   </Typography></> : ''}

            </AccordionSummary>
            <AccordionDetails >
            <Grid container spacing={2}>
            <Grid item xs={8} className='logo'>
             
         Journey 1:     {
                res.Departure ?
                  <Ticket
                    startDateTime={res.Departure.startTime}
                    arrivalDateTime={res.Departure.departureTime}
                    fare={res.Departure.cost}
                    duration={res.Departure.endTime}
                    legs={res.Departure.journey_legs}
                    showRes={true}
                  
                  /> : ''
              }

{res.Arrival ?
<>Journey 2:      
                <Ticket
                  startDateTime={res.Arrival.startTime}
                  arrivalDateTime={res.Arrival.departureTime}
                  fare={res.Arrival.cost}
                  duration={res.Arrival.endTime}
                  legs={res.Arrival.journey_legs}
                  showRes={true}
                /></> : ''
              }
               </Grid>
               <Grid item xs={4}>
              <div   className='qrcode' >
              <img src={`${res.qrcode}`} alt="qrcode" />
               </div>
              <Typography variant="body2" display="block" gutterBottom>
                Ref: {res.ref}
              </Typography>
            </Grid>
            </Grid>
            </AccordionDetails>
           
          </Accordion>
        </Paper>
      )
      }
      <>
      </>

    </div>
  )
}

export default JourneyResults
