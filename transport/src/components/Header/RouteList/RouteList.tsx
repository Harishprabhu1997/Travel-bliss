import React from 'react'
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import "./RouteList.scss"
import RouteDetails  from "../../RouteDetails/RouteDetails";
function RouteList() {
  const location = useLocation();
  // console.log(_.get(location, 'state.journeys'));

  const [state, setState] = React.useState({
    expand: false,
    journeys: _.get(location, 'state.journeys')
  })
  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setState({...state,isExpanded ? expand: false});
  //   };
  return (
    <div id="RouteList">
      {state?.journeys.map((res: any) =>

        <Accordion
        // expanded={state.expand === 'panel1'} 
        // onChange={handleChange('panel1')}
        >

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              textAlign={'left'}
            >Start    : {moment(res.startDateTime).format('MMMM Do YYYY, h:mm:ss a')}
              <Typography marginTop={'7px'}>
                Arrival  : {moment(res.arrivalDateTime).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Typography>
            <Typography 
            margin={"auto 10px 0px auto"}
            // className='arrivalTimeStyle'
            >
              {(_.get(res, 'fare.totalCost')) ?
                `Total cost : ${_.get(res, 'fare.totalCost') / 100}` : ""}
            </Typography>
            <Typography 
            margin={'auto 5px 0px 0px'}
            >
              Duration : {`${Math.floor(res.duration / 60)}: ${res.duration % 60}mins`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
         <RouteDetails routedetail={res.legs}/>
          </AccordionDetails>
        </Accordion>
        // console.log(res)

      )}
      <div>
        {console.log(state.journeys, "journ")
        }
        {state?.journeys.map((res: any) => {
          console.log(res);

        })}
      </div>

    </div>
  )
}

export default RouteList;