import React from 'react'
import { Card, CardContent, TextField, Button, CardActions } from '@mui/material'
import './Complaints.scss'
import axios from 'axios';
function Complaints() {

  const initalVal = {
    headings: '',
    details: '',
  }
  const [feedBackState, setfeedBackState] = React.useState(initalVal)
  const onSubmit = () => {

    axios.post('http://localhost:8080/api/feedback', {
      user_id:"", 
      headings:feedBackState.headings,
      details:feedBackState.details
    })
    .then(function (response:any) {
      console.log(response.data.id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <Card id='complaints'>
      <CardContent>
      <TextField
          fullWidth
          label="Heading"
          className="heading"
          value={feedBackState.headings}
          onChange={(e) => setfeedBackState({ ...feedBackState, headings: e.target.value })}
        />
        <TextField
          fullWidth
          label="Details"
          className="details"
          value={feedBackState.details}
          onChange={(e) => setfeedBackState({ ...feedBackState, details: e.target.value })}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" className='submit' onClick={() => onSubmit()}>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

export default Complaints
