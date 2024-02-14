import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import './testimonials.css';

function Testimonials() {
  return (
        <div className="cardcontainer">
        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia 
                className="testimonal-image"
                component="img"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Evan M.
                </Typography>
                <Typography variant="body2" className="testimonial-text">
                "Joining this hiking community has been life-changing! I've met
                incredible people who share my passion for the great outdoors.
                From breathtaking trails to unforgettable camping trips, every
                adventure is a memory to cherish."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia 
                className="testimonal-image"
                component="img"
                justify="center"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Dan H.
                </Typography>
                <Typography variant="body2" className="testimonial-text" style={{backgroundColor: '#4F6D7A'}}>
                "As a solo hiker, I was hesitant to explore new trails alone. But
                after joining this hiking group, I've found companionship and
                support on every journey. It's not just about the destination;
                it's about the incredible people you meet along the way."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Danny G.
                </Typography>
                <Typography variant="body2" className="testimonial-text" >
                "Being part of this hiking community has reignited my love for
                nature. Whether it's summiting a mountain peak at sunrise or
                discovering hidden waterfalls, every outing leaves me feeling
                inspired and rejuvenated."
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>

        {/* <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Brittany M.
                </Typography>
                <Typography variant="body2" className="testimonial-text">
                "Joining this hiking community has opened up a whole new world of
                possibilities for me. From epic multi-day treks to leisurely
                nature walks, there's always something exciting happening on the
                trails."
                </Typography>
                "
            </CardContent>
            </CardActionArea>
        </Card> */}

        {/* <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Jake N.
                </Typography>
                <Typography variant="body2" className="testimonial-text">
                "I've always been drawn to the tranquility of the wilderness, but
                it wasn't until I joined this hiking group that I truly found my
                tribe. Together, we've conquered challenging trails, shared
                stories around campfires, and forged friendships that will last a
                lifetime.""
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card> */}

        {/* <Card sx={{ maxWidth: 325 }} className="testimonal-card" style={{backgroundColor: '#4F6D7A'}}>
            <CardActionArea>
            <CardMedia
                className="testimonal-image"
                component="img"
                image="https://st2.depositphotos.com/4826249/7267/i/950/depositphotos_72675955-stock-photo-green-coniferous-forest-with-old.jpg"
                alt="pine trees"
            />
            <CardContent>
                <Typography className="testimonal-name" variant="h4">
                Cody F.
                </Typography>
                <Typography variant="body2" className="testimonial-text">
                "This hiking community isn't just about exploring nature; it's
                about fostering a sense of belonging and camaraderie. Whether
                you're a seasoned hiker or just starting out, you'll find
                encouragement, support, and a whole lot of fun along the way.""
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
        </div> */}
        </div>
  );
}

export default Testimonials;
