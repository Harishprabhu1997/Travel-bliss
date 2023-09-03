import { Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Registration.scss'
import { registerSubmit, setValue, registerValue } from './RegistrationValidation'
import { useNavigate } from 'react-router-dom';

const locales = ['en', 'en-gb', 'zh-cn', 'de'];
type LocaleKey = (typeof locales)[number];
function Registration() {
    const [gender, setGender] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, setRegiser] = React.useState(registerValue)
    React.useEffect(() => {
        // dont delete thids function
    }, [])
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };
    const [locale, setLocale] = React.useState<LocaleKey>('en');
    const navigate = useNavigate()
    return (
        <div id='Registration'>

            <Card sx={{ minWidth: 275 }} className='cardStyle'>
                <CardContent className='cardCont'>
                    <FormControl>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h4" gutterBottom>
                                        Register
                                    </Typography>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="First Name"
                                        error={register.firstNameError}
                                        helperText={register.firstNameError ? "Required." : ''}
                                        name='firstName'
                                        onChange={(e) => setValue(e, setRegiser, register)}
                                        required id="firstNameError" value={register.firstName} className='firstName' />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Last Name"
                                        error={register.lastNameError}
                                        name='lastName'
                                        helperText={register.lastNameError ? "Required." : ''}
                                        onChange={(e) => setValue(e, setRegiser, register)}
                                        required id="lastNameError" value={register.lastName} className='firstName' />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="User Name"
                                        error={register.userNameError}
                                        name='userName'
                                        helperText={register.userNameError ? "Required." : ''}
                                        onChange={(e) => setValue(e, setRegiser, register)}
                                        required id="userNameError" value={register.userName} className='password' />

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className='password' variant="outlined" required

                                    >
                                        <InputLabel htmlFor="passwordError"

                                        >Password</InputLabel>
                                        <OutlinedInput
                                            id="passwordError"
                                            error={register.passwordError}
                                            name='password'
                                            onChange={(e) => setValue(e, setRegiser, register)}

                                            type={showPassword ? 'text' : 'password'}
                                            value={register.password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        {register.passwordError ?
                                            <FormHelperText error id="accountId-error">
                                                Password min 4 and max 8 letters
                                            </FormHelperText> : ''
                                        }
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={register.confirmPasswordError}
                                        name='confirmPassword'
                                        helperText={register.confirmPasswordError ? "Password shoulb be match." : ''}
                                        onChange={(e) => setValue(e, setRegiser, register)}
                                        label="Confirm Password" 
                                        id="confirmPasswordError" 
                                        required value={register.confirmPassword} className='password' />

                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl className='firstName'>
                                        <InputLabel id="demo-simple-select-label" required>Gender</InputLabel>
                                        <Select
                                          error={register.genderError}
                                          name='gender'
                                            labelId="demo-simple-select-label"
                                            id="genderError"
                                            value={register.gender}
                                            label="Gender"
                                            onChange={(e) => setValue(e, setRegiser, register)}
                                        >
                                            <MenuItem value='Male'>Male</MenuItem>
                                            <MenuItem value='Female'>Female</MenuItem>
                                            <MenuItem value='Others'>Others</MenuItem>
                                        </Select>
                                        {register.genderError ?
                                            <FormHelperText error id="accountId-error">
                                               Required
                                            </FormHelperText> : ''
                                        }
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                        <Stack>
                                            <DateField label="Date of Birth" value={register.dateOfBirth} className='firstName' />
                                        </Stack>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" className='registerButton'
                                        onClick={() => registerSubmit(register, setRegiser,navigate)}
                                    >Register</Button>

                                </Grid>
                                <Grid item xs={12}>
                                {register.responseError ?
                                            <FormHelperText error id="accountId-error">
                                               {register.responseMessage}
                                            </FormHelperText> : ''
                                        }
                                        </Grid>
                            </Grid>

                        </Box>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    )
}

export default Registration
