import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import _ from 'lodash';
import moment from 'moment';
import TrainIcon from '@mui/icons-material/Train';
import SubwayIcon from '@mui/icons-material/Subway';
import TimelineConnector from '@mui/lab/TimelineConnector';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CircleIcon from '@mui/icons-material/Circle';
const ModeSelection = (props: any) => {
  const { mode } = props;
  let modeType;
  if (mode === 'train') {
    modeType = <TrainIcon />
  }
  else if (mode === 'tube') {
    modeType = <SubwayIcon />
  }
  else if (mode === 'bus') {
    modeType = <DirectionsBusFilledIcon />
  }
  else if (mode === 'walking') {
    modeType = <DirectionsWalkIcon />
  }
  else if (mode === 'end') {
    modeType = <CircleIcon fontSize='small' />
  }
  else {
    modeType = <TimelineConnector />

  }
  return (
    <>
      {modeType}
    </>
  )
}
const PointsList = (props: any) => {
  const { name, details, scheduledTime, duration, mode } = props

  return (
    <TimelineItem>
      <TimelineSeparator>
        <ModeSelection mode={mode} />
        {mode === 'end' ? <></> : <TimelineConnector />}

      </TimelineSeparator>
      <TimelineContent>{`${name} at ${moment(scheduledTime).format('hh:mm a')}`}
        <div>
          {details}
        </div>
        {duration ? <div>Duration :{`${(Math.floor(duration / 60) ? `${Math.floor(duration / 60)}hrs` : '')} ${duration % 60} mins`}</div> : ''}
      </TimelineContent>
    </TimelineItem>

  )
}

export default function RouteDetails(props: any) {
  const { routedetail } = props
  return (
    <Timeline>
      {routedetail.map((point: any, index: any) => (
        <>
          <PointsList
            name={_.get(point, 'departurePoint.commonName')}
            details={_.get(point, 'instruction.detailed')}
            scheduledTime={_.get(point, 'scheduledDepartureTime')}
            duration={_.get(point, 'duration')}
            mode={_.get(point, 'mode.id')}
          />
          {routedetail.length === (index + 1) ?
            <PointsList
              name={_.get(point, 'arrivalPoint.commonName')}
              details={_.get(point, 'instruction.detailed')}
              scheduledTime={_.get(point, 'scheduledArrivalTime')}
              mode='end'
            /> : ''
          }

        </>
      ))}

    </Timeline>
  );
}
