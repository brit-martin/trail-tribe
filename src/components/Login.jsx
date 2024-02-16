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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import '../styles/login.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function onLogin(event){
    event.preventDefault()

    let userBodyLogin = {
      email: emailInput,
      password: passwordInput
    }
    console.log(userBodyLogin)
    axios.post('/login', userBodyLogin)
    .then((response)=>{
      console.log(response.data)
      dispatch({type: 'SET_USER', payload: response.data.user});
      navigate('/newsfeed')
    })
    .catch((error)=>{
      console.log('error')
      //add alert to let user know that password is incorrect
      //error.data.message
    })
  }

  return (
    <>
    {/* FULL CONTAINER */}
      <Grid 
        className="login-page" 
        // spacing={2}
        container
        direction="row"
        alignItems="center"
        >

        {/* LEFT SIDE */}
        <Grid item xs={7} className="login-left">
          <img className="login-image" src="public/login-three.jpeg" align="" />
          <h4 className="login-welcome">Welcome back!</h4>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid 
          item xs={5}
          className="login-right"
          >

          {/* login form */}
          <Box
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            
            <form className='login-form' onSubmit={onLogin}>
              <h1 className="login-header">Login</h1>
              <h4 className="login-header">
                Ready to make some more memories, please login to your account.
              </h4>
              <TextField
                className="login-input"
                required
                id="outlined-required"
                label="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <FormControl
                className="login-input"
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  // type='password'
                  type={showPassword ? "text" : "password"}
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
              <Button
                className="login-button"
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;