import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import '../styles/signup.css'

function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  return (
    
    <div className='signup-page'>
      <Box
        component="form"
        sx={{'& .MuiTextField-root' : {m: 1, width: '25ch'}
      }}
        noValidate
        autoComplete='off'
      >
        <div className='signup-form'>
          <TextField
            required
            id='outlined-required'
            label="First Name"
          />
          <TextField
            required
            id='outlined-required'
            label='Last Name'
          />
          <TextField
            required
            id='outlined-required'
            label='Email'
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // type='password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          /> 
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // type='password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
        </div>
        <Button variant="contained">Sign Up</Button>
        <span>
              Already a member of the tribe?{" "}
              <a
                href="#"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Sign in?
              </a>
            </span>
      </Box>
    </div>
    
  );
}

export default Signup;
