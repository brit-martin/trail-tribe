import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { primHoverSX } from "./Theme.jsx";
import { useTheme } from "@mui/material";

import "../styles/Hero.css";

function SingleCard() {
  const navigate = useNavigate();
  const theme = useTheme();

  const subheadingFont = {
    fontFamily: theme.fontStyle.secondaryFont
  }

  function handleFindTribe() {
    navigate("/signup");
  }
    
  return (
    <>
      <Card className="hero__card">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom style={subheadingFont}>
            Step by Step, Friend by Friend
          </Typography>
          <Typography variant="h4" component="h3" style={subheadingFont}>
            Step Into Adventure Together
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
          size="small" 
          variant="contained"
          color='primary'
          sx={primHoverSX}
          onClick={handleFindTribe}
          style={subheadingFont}
          >
            Find your Tribe
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default function Hero() {
  
  return (
    <div className="hero__container">
      <img className="hero__img" src="\random-mountain.jpg" alt="" />

      <div className="hero__logo">
        <h2>
          <span id="word__1">Trail</span> <span id="word__2">Tribe</span>
        </h2>
      </div>
      <SingleCard />
    </div>
  );
}
