// == IMPORTS ==
// css
import "../styles/login.css";

//packages
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//material UI
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
//Icons
import IconButton from "@mui/material/IconButton";

function Login() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const white = theme.palette.quadratiary.contrastText;
  const loginStyle = {
    fontFamily: theme.fontStyle.secondaryFont,
  };

  function onLogin(event) {
    event.preventDefault();

    let userBodyLogin = {
      email: emailInput,
      password: passwordInput,
    };
    console.log(userBodyLogin);
    axios
      .post("/login", userBodyLogin)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_USER", payload: response.data.user });
        navigate("/newsfeed");
      })
      .catch((error) => {
        console.log("error");
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          icon: "error",
          iconColor: "#FF4b1f",
          title: "Oops...",
          text: "Incorrect email or password",
          confirmButtonColor: "#FF4b1f",
          background: theme.palette.tertiary.light,
          fontFamily: "Montserrat, sans-serif",
          
        });
      });
  }

  return (
    <>
      {/* FULL CONTAINER */}
      <Grid
        className="login-page"
        container
        direction="row"
        alignItems="center"
      >
        {/* LEFT SIDE */}
        <Grid item xs={7} className="login-left">
          <img className="login-image" src="public/login-three.jpeg" />
          <h4 className="login-welcome" color="primary">
            Welcome back!
          </h4>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={5} className="login-right">
          <div className="login-wrapper"></div>
          {/* login form */}
          <Box
            sx={{
              "& .MuiTextField-root": { m: 2, width: "40ch", style: "white" },
            }}
            noValidate
            autoComplete="off"
          >
            <form className="login-form" onSubmit={onLogin}>
              <h1 style={loginStyle}>Login</h1>
              <h4 className="login-header">
                Ready to make some more memories, please login to your account.
              </h4>
              <TextField
                focused
                color="white"
                className="login-input"
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
                className="login-input"
                sx={{ m: 2, width: "40ch", style: "white" }}
                variant="outlined"
                style={{ color: white }}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{ color: white }}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  color="white"
                  style={{ color: white }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end" style={{ color: white }}>
                      <IconButton
                        style={{ color: white }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
