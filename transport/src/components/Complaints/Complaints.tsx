import { Card, CardContent, TextField, Button, CardActions } from '@mui/material'
import './Complaints.scss'

function Complaints() {
  return (
    <Card id='complaints'>
      <CardContent>
        <TextField
          fullWidth
          label="Heading"
          className="heading"
        />
        <TextField fullWidth label="Details" className="details" />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" className='submit'>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

export default Complaints
