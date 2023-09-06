import React from 'react'
import { Card, CardContent, TextField, Button, CardActions, Snackbar, Alert } from '@mui/material'
import './Complaints.scss'
import axios from 'axios';
function Complaints() {

  const initalVal = {
    headings: '',
    details: '',
  }
  const [feedBackState, setfeedBackState] = React.useState(initalVal)
  const [open, setOpen] = React.useState(false);

  const onSubmit = () => {
    const userDetail: any = localStorage.getItem("userDetail");
    const userId: any = JSON.parse(userDetail);
    axios.post('http://localhost:8080/api/feedback', {
      user_id:userId, 
      headings:feedBackState.headings,
      details:feedBackState.details
    })
    .then(function (response:any) {
      setOpen(true);
      setfeedBackState({...feedBackState,headings:'',details:''})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Card id='complaints'>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Feedback submitted successfully
        </Alert>
      </Snackbar>
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
          multiline
  rows={7}
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
