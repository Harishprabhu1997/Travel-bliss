import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import "./RouteList.scss"
import RouteDetails from "../../RouteDetails/RouteDetails";
import { matchDate } from '../../CommonFile/CommonFile'
import { Box, Button, Grid, Paper } from '@mui/material';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Map from '../../Map/Map'
import { base_url, primary_key } from '../../Api';
function RouteList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [routeListState, setState] = React.useState<any>({
    journeys: _.get(location, 'state.json.journeys'),
    journeyData: 0,
    startLat: _.get(location, `state.json.journeys[0].legs[0].departurePoint.lat`),
    startLon:  _.get(location, `state.json.journeys[0].legs[0].departurePoint.lon`),
    endLat: _.get(location, `state.json.journeys[0].legs[${location.state.json.journeys[0].legs.length - 1}].arrivalPoint.lat`),
    endLon: _.get(location, `state.json.journeys[0].legs[${location.state.json.journeys[0].legs.length - 1}].arrivalPoint.lon`),
    startPoint: _.get(location, `state.json.journeys[0].legs[0].departurePoint.commonName`),
    endPoint: _.get(location, `state.json.journeys[0].legs[${location.state.json.journeys[0].legs.length - 1}].arrivalPoint.commonName`),
    arriving: _.get(location, 'state.data.arriving.$d')
  })

  React.useEffect(() => {
    

    localStorage.clear();
  }, [])

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      localStorage.setItem("currentRouteDetails", JSON.stringify(routeListState.journeys![panel - 1]))
      let paypal_button = document.getElementById('arrivalButton')
      if (paypal_button) {
        localStorage.setItem("arrivingRouteDetails", JSON.stringify(routeListState.journeys![panel - 1]))
      }
    };

  const onApprove = (data: any, actions: any) => {
    return actions.order?.capture().then(function (details: any) {
      if (details?.status === "COMPLETED") {
        navigate('/journey_result/download_ticket')
      }
    })
  };

  const getArrvingData = async () => {
    const { from, to, arriving } = location.state.data
    const date = moment(arriving.$d).format("YYYYMMDD");
    const time = moment(arriving.$d).format("HHmm");

    await fetch(`${base_url}/Journey/JourneyResults/${to.id}/to/${from.id}?&Date=${date}&Time=${time}&&journeyPreference=LeastInterchange&accessibilityPreference=NoRequirements&walkingSpeed=Slow&cyclePreference=None&bikeProficiency=Easy&app_id=&app_key=${primary_key}`)
      .then(response => response.json())
      .then(json => {
        setState({
          ...routeListState, journeys: _.get(json, 'journeys'),
          journeyData: 0,
          startLat: _.get(json, `journeys[0].legs[0].departurePoint.lat`),
          startLon: _.get(json, `journeys[0].legs[0].departurePoint.lon`),
          endLat: _.get(json, `journeys[0].legs[${json.journeys[0].legs.length - 1}].arrivalPoint.lat`),
          endLon: _.get(json, `journeys[0].legs[${json.journeys[0].legs.length - 1}].arrivalPoint.lon`),
          startPoint: _.get(json, `journeys[0].legs[0].departurePoint.commonName`),
          endPoint: _.get(json, `journeys[0].legs[${json.journeys[0].legs.length - 1}].arrivalPoint.commonName`),
          arriving: null
        })
        setExpanded(false);
      })
  }
console.log(routeListState,'routeListState');

  return (
    <div id="RouteList">
      <Box>
        <Grid container>
          <Grid item xs={6}>
            {routeListState.journeys?.map((res: any, ind: any) =>
              <Paper className='journeyList'>
                <Accordion
                  expanded={expanded === ind + 1}
                  onChange={handleChange(ind + 1)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={ind + 1}
                  >
                    <Typography
                      textAlign={'left'}
                    >Start    : {
                        matchDate(res.startDateTime, res.arrivalDateTime) ?
                          moment(res.startDateTime).format('h:mm a') : moment(res.startDateTime).format('MMMM Do YYYY, h:mm:ss a')}
                      <Typography marginTop={'7px'}>
                        Arrival  : {
                          matchDate(res.startDateTime, res.arrivalDateTime) ?
                            moment(res.arrivalDateTime).format('h:mm a') : moment(res.arrivalDateTime).format('MMMM Do YYYY, h:mm:ss a')}
                      </Typography>
                    </Typography>
                    {(_.get(res, 'fare.totalCost')) ?
                      <Typography
                        margin={"auto 10px 0px auto"}
                      >
                        Total cost : £{`${_.get(res, 'fare.totalCost') / 100}`}
                      </Typography> :
                      <></>}
                    <Typography
                      margin={(_.get(res, 'fare.totalCost')) ? 'auto 5px 0px 0px' : "auto 10px 0px auto"}
                    >
                      Duration : {`${(Math.floor(res.duration / 60) ? `${Math.floor(res.duration / 60)}hrs` : '')} ${res.duration % 60}mins`}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RouteDetails routedetail={res.legs} />
                    {_.get(res, 'fare.totalCost') ?
                      <div className='button_style'>
                        {routeListState.arriving ? <Button variant="contained" color="success" className='submit' id='arrivalButton'
                          onClick={() => getArrvingData()}
                        >
                          continue
                        </Button> :
                          <PayPalButtons
                            onApprove={onApprove}
                            style={{ layout: "horizontal" }} />
                        }
                      </div>
                      :
                      ''
                    }
                  </AccordionDetails>
                </Accordion>
              </Paper>
            )}
          </Grid>
          <Grid item xs={6}>
            <Map journey={routeListState} />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default RouteList;