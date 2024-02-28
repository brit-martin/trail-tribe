import React, { useEffect, useState } from "react";
// MUI components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
// CSS
import "../styles/about.css";

function About() {
  const theme = useTheme();

  const seen = {
    opacity: 1,
  }

  const notSeen = {
    opacity: 0,
  }


  const [isJaredHovered, setIsJaredHovered] = useState(false);
  const [isCodyHovered, setIsCodyHovered] = useState(false);
  const [isBrittanyHovered, setIsBrittanyHovered] = useState(false);
  const [isJakeHovered, setIsJakeHovered] = useState(false);

  function handleJaredHover() {
    setIsJaredHovered(true);
    console.log("hovered");
  }

  function handleCodyHover() {
    setIsCodyHovered(true);
    console.log("hovered");
  }

  function handleBrittanyHover() {
    setIsBrittanyHovered(true);
    console.log("hovered");
  }

  function handleJakeHover() {
    setIsJakeHovered(true);
    console.log("hovered");
  }

  function handleLeave() {
    setIsJaredHovered(false);
    setIsCodyHovered(false);
    setIsBrittanyHovered(false);
    setIsJakeHovered(false);
    console.log("left");
  }

  const heading = {
    backgroundColor: theme.palette.secondary.light,
  };

  const subheading = {
    // backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.innerBorderRadius,
    fontFamily: theme.fontStyle.primaryFont,
  };

  const image = {
    borderRadius: theme.shape.innerBorderRadius,
    width: "750px",
    height: "450px",
    padding: "0",
  };

  const description = {
    backgroundColor: theme.palette.tertiary.light,
    borderRadius: theme.shape.innerBorderRadius,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  return (
    <div className="about-container">
      {/* <h1 className='about-heading' style={heading}>Discover Your Trail Community: Exploring Nature, Connecting Adventurers</h1> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1.5} className="about-bio">
            <div style={isJakeHovered ? seen : notSeen }>
              {" "}
              Jakes info: I like basketball, coding, and hiking.
            </div>
          </Grid>
          <Grid item xs={1.5} className="about-bio">
            <div style={isCodyHovered ? seen : notSeen }>
              {" "}
              Cody info: Fun-loving guy that tries to approach life uniquely.
            </div>
          </Grid>
          <Grid item xs={6} className="about-image">
            <div className="image__description">Hover Over our Faces to Learn!</div>
            <div
              onMouseEnter={handleJaredHover}
              onMouseLeave={handleLeave}
              className="Jared__face"
            ></div>
            <div
              onMouseEnter={handleCodyHover}
              onMouseLeave={handleLeave}
              className="Cody__face"
            ></div>
            <div
              onMouseEnter={handleBrittanyHover}
              onMouseLeave={handleLeave}
              className="Brittany__face"
            ></div>
            <div
              onMouseEnter={handleJakeHover}
              onMouseLeave={handleLeave}
              className="Jake__face"
            ></div>
            <img
              src="public\ourMountRushmore.png"
              style={image}
              alt="mt rushmore"
            />
          </Grid>
          <Grid item xs={1.5} className="about-bio">
            <div style={isBrittanyHovered ? seen : notSeen }>
              {" "}
              Brittany info: A sun-loving explorer always seeking new adventures
              in the great outdoors.
            </div>
          </Grid>
          <Grid item xs={1.5} className="about-bio">
            <div style={isJaredHovered ? seen : notSeen }>
              {" "}
              Jared info: Avid pickelball player who enjoys coding on the
              weekends.
            </div>
          </Grid>
          <Grid item xs={6.5}>
            <div className="about-description" style={description}>
              {/* Here at TrailTribe our goal is to help you connect with friends, find hikes unique to you, and share adventures together. 
              We realized that people need a place to remember the adventures they went on, 
              and we found a great way to do that! */}
              Our goal is to create a community where fellow hiking enthusiasts
              can come together to create friendships, discover new trails, and
              form lasting connections. Everyone's got those epic adventures
              they want to hold onto forever. We've come up with the ultimate
              way to make those memories last.
            </div>
          </Grid>
          <Grid item xs={5.5}>
            <div className="about-subheading" style={subheading}>
              OUR GOAL
            </div>
          </Grid>
          <Grid item xs={5.5}>
            <div className="about-subheading" style={subheading}>
              TECHNOLOGY
            </div>
          </Grid>
          <Grid item xs={6.5}>
            <div className="about-description" style={description}>
              Description of Technology
            </div>
          </Grid>
          <Grid item xs={6.5}>
            <div className="about-description" style={description}>
              As friends who share a deep love for the great outdoors, we set
              out on a journey to build a platform that reflects our passion for
              hiking and brings people closer to nature. Our story is one of
              friendship, inspiration, and the belief that every step taken on a
              trail has the potential to create unforgettable memories.
            </div>
          </Grid>
          <Grid item xs={5.5}>
            <div className="about-subheading" style={subheading}>
              Our Story
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default About;
