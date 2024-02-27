// == IMPORTS ==
//packages
import React, { useState, useEffect } from "react";

//material ui
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardActionArea } from "@mui/material";

// css
import "../styles/testimonials.css";

function Testimonials() {
  const theme = useTheme();

  //styling
  const testimonialCard = {
    backgroundColor: theme.palette.quadratiary.light,
    height: "475px",
    maxWidth: "325px",
  };

  const testimonialHeading = {
    fontFamily: theme.fontStyle.primaryFont,
  };
  const testimonialText = {
    fontFamily: theme.fontStyle.secondaryFont,
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

 


  return (
    <div className="testimonial-main-container">
      <h1 className="section__header" style={testimonialHeading}>
        What Others Say About TrailTribe
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        allowScrollButtonsMobile
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Evan
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "Joining this hiking community has been life-changing! I've
                  met incredible people who share my passion for the great
                  outdoors. From breathtaking trails to unforgettable camping
                  trips, every adventure is a memory to cherish."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Dan
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "Joining this hiking community has been life-changing! I've
                  met incredible people who share my passion for the great
                  outdoors. From breathtaking trails to unforgettable camping
                  trips, every adventure is a memory to cherish."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Danny
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "Being part of this hiking community has reignited my love for
                  nature. Whether it's summiting a mountain peak at sunrise or
                  discovering hidden waterfalls, every outing leaves me feeling
                  inspired and rejuvenated."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Brittany
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "Joining this hiking community has opened up a whole new world
                  of possibilities for me. From epic multi-day treks to
                  leisurely nature walks, there's always something exciting
                  happening on the trails."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Jake
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "I've always been drawn to the tranquility of the wilderness,
                  but it wasn't until I joined this hiking group that I truly
                  found my tribe. Together, we've conquered challenging trails,
                  and forged friendships thatwill last a lifetime."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>

        <div className="testimonial-container">
          <Card className="testimonial-card" style={testimonialCard}>
            <CardActionArea>
              <CardMedia
                className="testimonial-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
              />
              <CardContent>
                <Typography
                  className="testimonial-name"
                  variant="h4"
                  style={testimonialText}
                >
                  Cody
                </Typography>
                <Typography
                  variant="body2"
                  className="testimonial-text"
                  style={testimonialText}
                >
                  "This hiking community isn't just about exploring nature; it's
                  about fostering a sense of belonging and camaraderie. Whether
                  you're a seasoned hiker or just starting out, you'll find
                  encouragement, support, and a whole lot of fun along the way."
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Carousel>
    </div>
  );
}
export default Testimonials;