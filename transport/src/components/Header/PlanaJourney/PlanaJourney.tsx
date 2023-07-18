import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import React from 'react'
import './PlanaJourney.scss'
function PlanaJourney() {
  return (
    <div id='PlanaJourney'>
      <div>
      <TextField id="From" label="From" variant="outlined" />

      </div>
      <div>
      <TextField id="To" label="To" variant="outlined" />

      </div>
<div>
<Button variant="contained">Plan My Journey</Button>

</div>
    </div>
  )
}

export default PlanaJourney
