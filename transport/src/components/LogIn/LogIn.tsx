import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Card, Snackbar, CardContent, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography, Alert } from '@mui/material'
import React from 'react'
import './Login.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginsetValue,loginVal } from './LoginValidation'
import axios from 'axios';
// import cookies from "js-cookie"; 
 
function LogIn() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
const [loginState,setLoginState] = React.useState(loginVal)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  React.useEffect(() => {
    handleClick()
  }, [])
  const login = () => {
    // loginValid(loginState,setLoginState)
    // navigate('/Plan_a_journey')
    axios.post('http://localhost:8080/api/auth/login', {
      username:loginState.userName,
      password:loginState.password
    }) 
    // .then((response:any) => response.json())
    .then(function (response:any) {
      console.log(response.data.id);
      // cookies.set("userId", response.data.id, { sameSite: "none", secure: true });
      localStorage.setItem("userDetail", JSON.stringify(response.data.id))

      navigate('/Plan_a_journey')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div id='login'>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {location.state?.message}
        </Alert>
      </Snackbar>
      <Card sx={{ minWidth: 275 }} className='cardStyle'>
        <CardContent className='cardCont'>
          <TextField 
          id="userNameError" 
          name='userName'
          value={loginState.userName}
          onChange={(e) => loginsetValue(e, setLoginState)}

          label="User Name" variant="outlined" />
          <br />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="passwordError">Password</InputLabel>
            <OutlinedInput
              id="passwordError"
              name='password'
              value={loginState.password}
              onChange={(e) => loginsetValue(e, setLoginState)}
              type={showPassword ? 'text' : 'password'}
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
          </FormControl>
          <div>
            <Button variant="contained"
              onClick={() => login()}
            >Login</Button>
            <div>
              <Typography variant="subtitle2" gutterBottom className='createAccount'>Don't have an account? <Link
                component="button"
                variant="body2"
                onClick={() => {
                  navigate('/Register')
                }}
              >
                Create account now
              </Link></Typography>

            </div>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}

export default LogIn
