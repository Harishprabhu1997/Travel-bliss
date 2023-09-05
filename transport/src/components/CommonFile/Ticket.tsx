import { Typography } from '@mui/material'
import { matchDate } from './CommonFile'
import moment from 'moment'
import RouteDetails from '../RouteDetails/RouteDetails'

function Ticket(props: any) {
    console.log(props,'tick');
    
    const { startDateTime, arrivalDateTime, fare, duration, legs,showRes } = props;

    return (
        <div>
            <Typography variant="subtitle1" gutterBottom className='start'>
                Start  : {
                    matchDate(startDateTime, arrivalDateTime) ?
                        moment(startDateTime).format('hh:mm a') : moment(startDateTime).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className='Arrival'>
                Arrival  : {
                    matchDate(startDateTime, arrivalDateTime) ?
                        moment(arrivalDateTime).format('hh:mm a') : moment(arrivalDateTime).format('MMMM Do YYYY, h:mm:ss a')}

            </Typography>
            <div>
              { !showRes && fare.totalCost ?
                    <Typography
                    >
                        Total cost : £{`${fare.totalCost / 100}`}
                    </Typography> :
                    <></>}
                      { showRes && fare ?
                    <Typography
                    >
                        Total cost : £{`${fare / 100}`}
                    </Typography> :
                    <></>}
            </div>
            <Typography
            >
                Duration : {`${(Math.floor(duration / 60) ? `${Math.floor(duration / 60)}hrs` : '')} ${duration % 60}mins`}
            </Typography>
            <RouteDetails routedetail={legs} showRes={showRes} />
        </div>
    )
}

export default Ticket
