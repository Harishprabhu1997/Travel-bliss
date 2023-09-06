import React from 'react'
import { Card, CardContent,AccordionSummary,Paper,AccordionDetails,Accordion, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import './FeedbackList.scss'
function FeedBackList() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [feedbackList, setfeedbackList] = React.useState([])

    const handleChange =
    (panel: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);

    };
    const userDetail: any = localStorage.getItem("userDetail");
    const userId: any = JSON.parse(userDetail);
    React.useEffect(()=>{
        axios.get(`http://localhost:8080/api/feedback/${userId}`)
        .then(function (response) {
          if (response.data) {
            let res = response.data
            // res = res.filter((value: any, index: any, self: any) =>
            //   index === self.findIndex((t: any) => (
            //     t.ref === value.ref
            //   ))
  
  
            // )
            // setjourneyResult(res)
            console.log(res, 'show');
            setfeedbackList(res)
  
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },[])
  return (
    <div id='FeedbackList'>
      {feedbackList!.map((res: any, ind: any) =>
        <Paper className='journeyList'>
          <Accordion
            expanded={expanded === ind + 1}
            onChange={handleChange(ind + 1)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={ind + 1}
            >

              <Typography marginTop={'7px'}>
               {ind+1}. {res.headings}
                </Typography>
            
              
            </AccordionSummary>
            <AccordionDetails className='feedbackDetails'>
            <Typography marginTop={'7px'} marginLeft={'10px'}>
            {res.details}
                 </Typography>
                </AccordionDetails>
                </Accordion>
                </Paper>
)}
    </div>
  )
}

export default FeedBackList
