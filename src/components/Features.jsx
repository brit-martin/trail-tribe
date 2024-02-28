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
    height: "7rem",
    padding: "20px 10px",
    textAlign: "center",
    backgroundColor: "#0e3b43",
    color: "#fff",
    borderRadius: theme.shape.innerBorderRadius,
    fontFamily: theme.fontStyle.secondaryFont,
    fontSize: "20px",
  };

  const featuresHeading = {
    fontFamily: theme.fontStyle.primaryFont,
    fontSize: "42px",
    justifyContent: "center",
  };

  const featuresText = {
    padding: "3px",
  };

  return (
    <div
      className="features__box"
      style={{ margin: "5rem", borderRadius: theme.shape.outerBorderRadius }}
    >
      <h1 style={featuresHeading} className="features-heading">
        Features
      </h1>
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
              <h3 style={featuresText}>Step 1: </h3>
              <p style={featuresText}> Simply Sign Up</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3 style={featuresText}>Step 2: </h3>
              <p style={featuresText}>Find Friends, Find Hikes</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3 style={featuresText}>Step 3: </h3>
              <p style={featuresText}>Go Hike!</p>
            </Paper>
          </Grid>
          <Grid md={5}>
            <Paper elevation={8} style={featuresStyles}>
              {" "}
              <h3 style={featuresText}>Step 4:</h3>
              <p style={featuresText}>
                Tell us and your friends about your adventure!
              </p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
