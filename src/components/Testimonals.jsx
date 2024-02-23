import { useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Icon from '@mui/material/Icon'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/testimonials.css';
import { useTheme } from "@mui/material/styles";


function Testimonials() {
  const theme = useTheme();

  const testimonialCard = {
    backgroundColor: theme.palette.quadratiary.light,
  };

  const testimonialHeading = {
    fontFamily: theme.fontStyle.primaryFont,
  }
  const testimonialText = {
    fontFamily: theme.fontStyle.secondaryFont,
  }

    useEffect(() => {
      // inits
      let carousel = document.querySelector('.carousel');
      let carouselInner = document.querySelector('.carousel__inner');
      let prev = document.querySelector('.carousel__controls .carousel__prev');
      let next = document.querySelector('.carousel__controls .carousel__next');
      let slides = document.querySelectorAll('.carousel__inner .carousel__item');
      let totalSlides = slides.length;
      let step = 100 / totalSlides;
      let activeSlide = 0;
      let activeIndicator = 0;
      let direction = -1;
      let jump = 1;
      let interval = 5000;
      let time;
  
      //Init carousel
      carouselInner.style.minWidth = totalSlides * 100 + '%';
      loadIndicators();
      // loop(true);
  
      //Carousel events
      next.addEventListener('click', () => {
        slideToNext();
      });
  
      prev.addEventListener('click', () => {
        slideToPrev();
      });
  
      carouselInner.addEventListener('transitionend', () => {
        if (direction === -1) {
          if (jump > 1) {
            for (let i = 0; i < jump; i++) {
              activeSlide++;
              carouselInner.append(carouselInner.firstElementChild);
            }
          } else {
            activeSlide++;
            carouselInner.append(carouselInner.firstElementChild);
          }
        } else if (direction === 1) {
          if (jump > 1) {
            for (let i = 0; i < jump; i++) {
              activeSlide--;
              carouselInner.prepend(carouselInner.lastElementChild);
            }
          } else {
            activeSlide--;
            carouselInner.prepend(carouselInner.lastElementChild);
          }
        }
  
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = 'translateX(0%)';
        setTimeout(() => {
          jump = 1;
          carouselInner.style.transition = 'all ease .5s';
        });
        updateIndicators();
      });
  
      document.querySelectorAll('.carousel__indicators span').forEach((item) => {
        item.addEventListener('click', (e) => {
          let slideTo = parseInt(e.target.dataset.slideTo);
  
          let indicators = document.querySelectorAll('.carousel__indicators span');
  
          indicators.forEach((item, index) => {
            if (item.classList.contains('active')) {
              activeIndicator = index;
            }
          });
  
          if (slideTo - activeIndicator > 1) {
            jump = slideTo - activeIndicator;
            step = jump * step;
            slideToNext();
          } else if (slideTo - activeIndicator === 1) {
            slideToNext();
          } else if (slideTo - activeIndicator < 0) {
            if (Math.abs(slideTo - activeIndicator) > 1) {
              jump = Math.abs(slideTo - activeIndicator);
              step = jump * step;
              slideToPrev();
            }
            slideToPrev();
          }
          step = 100 / totalSlides;
        });
      });
  
      // carousel.addEventListener('mouseover', () => {
      //   loop(false);
      // });
  
      // carousel.addEventListener('mouseout', () => {
      //   loop(true);
      // });
  
      function loadIndicators() {
        slides.forEach((slide, index) => {
          if (index === 0) {
            document.querySelector(
              '.carousel__indicators'
            ).innerHTML += `<span data-slide-to="${index}" class="active"></span>`;
          } else {
            document.querySelector('.carousel__indicators').innerHTML += `<span data-slide-to="${index}"></span>`;
          }
        });
      }
  
      function updateIndicators() {
        if (activeSlide > totalSlides - 1) {
          activeSlide = 0;
        } else if (activeSlide < 0) {
          activeSlide = totalSlides - 1;
        }
        document.querySelector('.carousel__indicators span.active').classList.remove('active');
        document.querySelectorAll('.carousel__indicators span')[activeSlide].classList.add('active');
      }
  
      function slideToNext() {
        if (direction === 1) {
          direction = -1;
          carouselInner.prepend(carouselInner.lastElementChild);
        }
  
        carousel.style.justifyContent = 'flex-start';
        carouselInner.style.transform = `translateX(-${step}%)`;
      }
  
      function slideToPrev() {
        if (direction === -1) {
          direction = 1;
          carouselInner.append(carouselInner.firstElementChild);
        }
        carousel.style.justifyContent = 'flex-end';
        carouselInner.style.transform = `translateX(${step}%)`;
      }
  
      // function loop(status) {
      //   if (status === true) {
      //     time = setInterval(() => {
      //       slideToNext();
      //     }, interval);
      //   } else {
      //     clearInterval(time);
      //   }
      // }
    }, []);
  
    //Carousel functions
  
    return (
      <div className='testimonials'>
        <h1 className='section__header' style={testimonialHeading}>
          What Others Say About TrailTribe
        </h1>
        <div className='carousel'>
          {/* SLIDES */}
          
          <div className='carousel__inner'>
          <div className='carousel__item'>
          {/* <div className="cardcontainer"> */}
        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea>
            <CardMedia 
                className="testimonal-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Evan
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "Joining this hiking community has been life-changing! I've met
                incredible people who share my passion for the great outdoors.
                From breathtaking trails to unforgettable camping trips, every
                adventure is a memory to cherish."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea >
            <CardMedia 
                className="testimonal-image"
                component="img"
                justify="center"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Dan 
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "As a solo hiker, I was hesitant to explore new trails alone. But
                after joining this hiking group, I've found companionship and
                support on every journey. It's not just about the destination;
                it's about the incredible people you meet along the way."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea >
            <CardMedia
                className="testimonal-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
                
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Danny 
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "Being part of this hiking community has reignited my love for
                nature. Whether it's summiting a mountain peak at sunrise or
                discovering hidden waterfalls, every outing leaves me feeling
                inspired and rejuvenated."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        </div>

        <div className='carousel__item'>
         <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Brittany
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "Joining this hiking community has opened up a whole new world of
                possibilities for me. From epic multi-day treks to leisurely
                nature walks, there's always something exciting happening on the
                trails."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card> 

         <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Jake 
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "I've always been drawn to the tranquility of the wilderness, but
                it wasn't until I joined this hiking group that I truly found my
                tribe. Together, we've conquered challenging trails, shared
                stories around campfires, and forged friendships that will last a
                lifetime."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card> 

         <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={testimonialCard}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="public/testimonials-one.jpeg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4" style={testimonialText}>
                Cody 
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={testimonialText}>
                "This hiking community isn't just about exploring nature; it's
                about fostering a sense of belonging and camaraderie. Whether
                you're a seasoned hiker or just starting out, you'll find
                encouragement, support, and a whole lot of fun along the way."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        </div>
        {/* </div>  */}
        </div>
           
          </div>
  
          {/* CONTROLS */}
          <div className='carousel__controls'>
            <span className='carousel__prev'>
              <ArrowBackIosIcon className="arrow__left"/>
            </span>
            <span className='carousel__next'>
              <ArrowForwardIosIcon className="arrow__right"/>
            </span>
          </div>
  
          {/* INDICATORS */}
          <div className='carousel__indicators'></div>
            </div>
    );
  }
  
  export default Testimonials;