import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './PlanaJourney.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import dayjs from 'dayjs';
import { primary_key, base_url, modes, app_id } from "../../Api";
import { useNavigate,useLocation } from 'react-router-dom';

function PlanaJourney() {
const loc = useLocation();
  const [data, setValue] = React.useState({
    from: {},
    fromFullData: [],
    toFullData: [],
    to: {},
    leaving: new Date(),
    arriving: null
  })
  const navigate = useNavigate();

  const getStationList = (e: any) => {
    const { value } = e.target;
    if (value) {
      fetch(`${base_url}/StopPoint/search/${value}?modes=${modes.join(",")}&maxResults=25&faresOnly=false&includeHubs=true&tflOperatedNationalRailStationsOnly=false&app_id=&app_key=${primary_key}`)
        .then(response => response.json())
        .then(json => {
          if (json.matches) {
            let nameArr = json.matches.map((elem: any) => ({
              label: elem.name,
              id: elem.icsId,
              zone: elem.zone
            }))
            setValue({ ...data, [e.target.id]: nameArr })
          }
        })
        .catch(error => console.error(error));
    }
  }

  const getTravelData = () => {
    const { from, to, leaving }: any = data;
    const date = moment(leaving).format("YYYYMMDD");
    const time = moment(leaving).format("HHmm");

    fetch(`${base_url}/Journey/JourneyResults/${from.id}/to/${to.id}?&Date=${date}&Time=${time}&journeyPreference=LeastInterchange&accessibilityPreference=NoRequirements&walkingSpeed=Slow&cyclePreference=None&bikeProficiency=Easy&app_id=&app_key=${primary_key}`)
      .then(response => response.json())
      .then(json => {
        navigate('/journey_result', {
          state: {
            json: json,
            data: data,
            // user_id:loc.state.udser_id
          }
        })
      })
  }
  return (
    <div id='PlanaJourney'>
      <Card sx={{ minWidth: 275 }} className='cardStyle'>
        <CardContent className='cardCont'>
          <Autocomplete
            disablePortal
            id="fromFullData"
            options={data.fromFullData}
            className='timeStyle'
            onChange={(event, value: any) => setValue({ ...data, from: value })}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField
              onChange={(e) => { getStationList(e) }}
              {...params}
              label="From" />}
          />
          <Autocomplete
            disablePortal
            id="toFullData"
            options={data.toFullData}
            onChange={(event, value: any) => setValue({ ...data, to: value })}
            className='timeStyle'
            sx={{ width: 300 }}
            renderInput={(params) => <TextField onChange={(e) => getStationList(e)} {...params} label="To" />}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker label="Leaving" className='timeStyle'
                defaultValue={dayjs(data.leaving)}
                onChange={(newValue: any) =>
                  setValue({
                    ...data, leaving: newValue
                  })
                }
              />
              <DateTimePicker label="Arriving" className='timeStyle' onChange={(newValue: any) =>
                setValue({
                  ...data, arriving: newValue
                })
              } />
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <Button variant="contained" onClick={() => getTravelData()}>Plan My Journey</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlanaJourney

function get(url: any, params: { from: any; to: any; }) {
  throw new Error('Function not implemented.');
}

