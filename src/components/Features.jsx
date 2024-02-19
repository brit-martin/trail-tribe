import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import "../styles/Features.css";
import { useTheme } from "@mui/material/styles";

export default function Features() {
  const theme = useTheme();

  const featuresStyles = {
    height: "6rem",
    padding: "20px 10px",
    textAlign: "center",
    backgroundColor: "#0e3b43",
    color: "#fff",
    borderRadius: theme.shape.innerBorderRadius,
  };

  return (
    <div
      className="features__box"
      style={{ margin: "5rem", borderRadius: theme.shape.outerBorderRadius }}
    >
      <h1>Features</h1>
      <Box>
        <Grid container rowSpacing={4} columnSpacing={8} justifyContent="center" alignItems="center">
          <Grid md={5}>
            <Paper elevation="8" style={featuresStyles}>
              <h3>Step 1: </h3>
              <h3> Simply Sign Up</h3>
            
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation="8" style={featuresStyles}>
              {" "}
              <h3>Step 2: </h3>
              <h3>Find Friends, Find Hikes</h3>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation="8" style={featuresStyles}>
              {" "}
              <h3>Step 3: </h3>
              <h3>Go Hike!</h3>
              <h3>
                
              </h3>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation="8" style={featuresStyles}>
              {" "}
              <h3>Step 4:</h3>
              <h3>
                Tell us and your friends about your adventure!
              </h3>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
