import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import "../styles/signup.css";
import { useState } from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Signup() {
  const theme = useTheme()
  // console.log(theme)
  const [fnameInput, setFnameInput] = useState("");
  const [lnameInput, setLnameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const white = theme.palette.quadratiary.contrastText
  console.log(white)
  function onSignUp(event){
    event.preventDefault()
    // check that password and password confirm are the same
    if(passwordInput === confirmPasswordInput){
    // build the request body
    let userBody = {
      fname: fnameInput,
      lname: lnameInput,
      email: emailInput,
      password: passwordInput,
    }
    // send the request
    console.log(userBody);
    axios.post("/signup", userBody)
      .then((response) => {
      console.log(response.data);
      dispatch({type: 'SET_USER', payload: response.data.newUser});
      navigate('/newsfeed')
    });
  } else (
    console.log('password do not match')
    // <Alert variant="outlined" severity="warning">
    //   Passwords don't match. 
    // </Alert>
  ).catch((error) => {
    console.log(error)
  })

  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setConfirmShowPassword((show) => !show);

  function loginLink(){
    navigate('/login')
    
  }

  return (
    <div className="signup-page">
      <div className="signup-wrapper"></div>
      <Box
        className="signup-form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
        noValidate
        autoComplete="off"
      >
        <form className="signup-form" onSubmit={onSignUp}>
          <h1 className="signup-header">Sign Up</h1>
          <h3 className="signup-header">Join the tribe today!</h3>
          <TextField
            focused
            color="white"
            variant="outlined"
            className="singup-input"
            required
            id="outlined-required"
            label="First Name"
            value={fnameInput}
            onChange={(e) => setFnameInput(e.target.value)}
            InputProps={{
              style: { color: white },
            }}
            
          />
          <TextField
            focused
            color="white"
            variant="outlined"
            className="singup-input"
            required
            id="outlined-required"
            label="Last Name"
            value={lnameInput}
            onChange={(e) => setLnameInput(e.target.value)}
            InputProps={{
              style: { color: white },
            }}
          />
          <TextField
            focused
            variant="outlined"
            color="white"
            className="singup-input"
            required
            id="outlined-required"
            label="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            InputProps={{
              style: { color: white },
            }}
          />
          <FormControl
            focused
            color="white"
            variant="outlined"
            className="singup-input"
            sx={{ m: 1, width: "30ch" }}
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}

            >
            <InputLabel 
              htmlFor="outlined-adornment-password"
              color="white"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              color="white"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="white"
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
          <FormControl
            focused
            color="white"
            variant="outlined"
            className="singup-input"
            sx={{ m: 1, width: "30ch" }}
            required
            value={confirmPasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
          >
            <InputLabel 
              htmlFor="outlined-adornment-password"
              color="white"
              >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              color="white"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="white"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button className="signup-button" variant="contained" type="submit">
            Sign Up
          </Button>
          <span className="signup-footer">
            Already a member of the tribe?{" "}
            <NavLink
              onClick={loginLink}
              className="login-link"
              // href="#"
              // onClick={() => {
              //   setShowLogin(true);
              // }}
            >
              <Typography>Login?</Typography>
            </NavLink>
          </span>
        </form>
      </Box>
    </div>
  );
}

export default Signup;
