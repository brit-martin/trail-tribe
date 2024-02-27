import React from "react";
// MUI components
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// CSS
import "../styles/Features.css";

export default function Features() {
  const theme = useTheme();

  const featuresStyles = {
    height: "6rem",
    padding: "20px 10px",
    textAlign: "center",
    backgroundColor: "#0e3b43",
    color: "#fff",
    borderRadius: theme.shape.innerBorderRadius,
    fontFamily: theme.fontStyle.secondaryFont,
  };
  const featuresHeading = {
    fontFamily: theme.fontStyle.primaryFont,
    marginBottom: "20px",
    fontSize: "40px",
  }

  return (
    <div
      className="features__box"
      style={{ margin: "5rem", borderRadius: theme.shape.outerBorderRadius }}
    >
      <h1 style={featuresHeading}>Features</h1>
      <Box>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={8}
          justifyContent="center"
          alignItems="center"
        >
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              <h3>Step 1: </h3>
              <p> Simply Sign Up</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3>Step 2: </h3>
              <p>Find Friends, Find Hikes</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3>Step 3: </h3>
              <p>Go Hike!</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3>Step 4:</h3>
              <p>Tell us and your friends about your adventure!</p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
