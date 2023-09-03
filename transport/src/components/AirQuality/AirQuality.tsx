import React from 'react'
import { base_url } from './../Api';
import { Box, Grid, Paper } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { decode } from 'html-entities';
import './AirQuality.scss'
import CircularProgress, {
} from '@mui/material/CircularProgress';
function AirQuality() {
    React.useEffect(() => {
        getAirQuality()

    }, [])
    const [airData, setAirdata] = React.useState([])
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const getAirQuality = async () => {
        await fetch(`${base_url}/AirQuality/`).then(response => response.json())
            .then(json => {
                setAirdata(json?.currentForecast)
            })

    }
    function CircularProgressWithLabel(props: any) {

        const { value, number, name } = props
        return (
            <Grid container className='title'>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Typography
                    // margin={"auto 10px 0px auto"}

                    >
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>

                        <CircularProgress variant="determinate" value={number} />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                            >{value}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        );
    }

    return (

        <div id="AirQuality">
            {airData?.map((res: any, ind: any) =>
                <Paper className='journeyList'>

                    <Accordion
                        expanded={expanded === res.forecastID}
                        onChange={handleChange(res.forecastID)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id={res.forecastID}
                        >


                            <Typography
                            // margin={"auto 10px 0px auto"}
                            >
                                {res.forecastSummary}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    {/* <div dangerouslySetInnerHTML={{__html: res.forecastText}}></div> */}
                                    {


                                        decode(res.forecastText)
                                            .split("<br/>").map(function (item, idx) {
                                                return (
                                                    <span key={idx}>
                                                        {item}
                                                        <br />
                                                    </span>
                                                )
                                            })

                                    }
                                </Grid>
                                <Grid item xs={4}>

                                    {
                                        res.nO2Band === 'Low' ?
                                            <CircularProgressWithLabel value='Low' number={25} name='nO2Band' />
                                            : res.nO2Band === 'Medium' ? <CircularProgressWithLabel name='nO2Band' value='Medium' number={50} /> :
                                                <CircularProgressWithLabel value='High' number={100} name='nO2Band' />}
                                    {
                                        res.o3Band === 'Low' ?
                                            <CircularProgressWithLabel value='Low' number={25} name='o3Band' />
                                            : res.o3Band === 'Medium' ? <CircularProgressWithLabel name='o3Band' value='Medium' number={50} /> :
                                                <CircularProgressWithLabel value='High' number={100} name='o3Band' />}
                                    {
                                        res.pM10Band === 'Low' ?
                                            <CircularProgressWithLabel value='Low' number={25} name='pM10Band' />
                                            : res.pM10Band === 'Medium' ? <CircularProgressWithLabel name='pM10Band' value='Medium' number={50} /> :
                                                <CircularProgressWithLabel value='High' number={100} name='pM10Band' />}
                                    {
                                        res.pM25Band === 'Low' ?
                                            <CircularProgressWithLabel value='Low' number={25} name='pM25Band' />
                                            : res.pM25Band === 'Medium' ? <CircularProgressWithLabel name='pM25Band' value='Medium' number={50} /> :
                                                <CircularProgressWithLabel value='High' number={100} name='pM25Band' />}
                                    {
                                        res.sO2Band === 'Low' ?
                                            <CircularProgressWithLabel value='Low' number={25} name='sO2Band' />
                                            : res.sO2Band === 'Medium' ? <CircularProgressWithLabel name='sO2Band' value='Medium' number={50} /> :
                                                <CircularProgressWithLabel value='High' number={100} name='sO2Band' />}
                                </Grid>
                            </Grid>

                        </AccordionDetails>
                    </Accordion>
                </Paper>)}
        </div>

    )
}

export default AirQuality
