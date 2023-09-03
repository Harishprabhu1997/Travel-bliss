import { Typography } from '@mui/material'
import { matchDate } from './CommonFile'
import moment from 'moment'
import RouteDetails from '../RouteDetails/RouteDetails'

function Ticket(props: any) {
    const { startDateTime, arrivalDateTime, fare, duration, legs } = props;

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
                {fare.totalCost ?
                    <Typography
                    >
                        Total cost : £{`${fare.totalCost / 100}`}
                    </Typography> :
                    <></>}
            </div>
            <Typography
            >
                Duration : {`${(Math.floor(duration / 60) ? `${Math.floor(duration / 60)}hrs` : '')} ${duration % 60}mins`}
            </Typography>
            <RouteDetails routedetail={legs} />
        </div>
    )
}

export default Ticket
