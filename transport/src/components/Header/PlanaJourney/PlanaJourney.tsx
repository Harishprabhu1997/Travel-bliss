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
import dayjs from 'dayjs';
import { primary_key, base_url, modes, app_id } from "../../Api";
import { useNavigate } from 'react-router-dom';

function PlanaJourney() {

  const [data, setValue] = React.useState({
    from: {},
    fromFullData: [],
    toFullData: [],
    to: {},
    leaving: new Date()
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
    
    const { from, to }: any = data;
    fetch(`${base_url}/Journey/JourneyResults/${from.id}/to/${to.id}?timeIs=Arriving&journeyPreference=LeastInterchange&accessibilityPreference=NoRequirements&walkingSpeed=Slow&cyclePreference=None&bikeProficiency=Easy&app_id=&app_key=${primary_key}`)
      .then(response => response.json())
      .then(json => {
        navigate('journey_result',{
          state: json
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
                //  value={data.leaving} 
                defaultValue={dayjs(data.leaving)}
              />
              <DateTimePicker label="Arriving" className='timeStyle' />
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

