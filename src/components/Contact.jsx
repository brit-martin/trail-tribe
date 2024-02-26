import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../styles/contact.css";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Contact() {
  const theme = useTheme();

  const contactContainer = {
    backgroundColor: theme.palette.quadratiary.main,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  const contactContainerText = {
    color: theme.palette.white.main,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  const contactButton = {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.quadratiary.light,
    fontFamily: theme.fontStyle.secondaryFont,
  };

  const black = theme.palette.black.main;

  const [nameInput, setNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [subjectInput, setSubjectInput] = useState();
  const [commentInput, setCommentInput] = useState();

  function submitFormHandler(event) {
    event.preventDefault();
    setCommentInput(" ");
    setNameInput(" ");
    setEmailInput(" ");
    setSubjectInput(" ");
   
    Swal.fire({
      title: "We will contact you as soon as possible.",
      // text: "We will contact you as soon as possible.",
      imageUrl: "public/thankyou-one.png",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "Custom image",
      // fontFamily: theme.fontStyle.secondaryFont,
      borderRadius: theme.shape.outerBorderRadius,
      confirmButtonColor: theme.palette.primary.main,
      background: theme.palette.tertiary.main,
      customClass: {
        popup: 'popup__class'
      },
});
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={7}>
            <div style={contactContainer} className="contact-info">
              <h1 className="contact-header" style={contactContainerText}>
                Contact Us
              </h1>
              <h3 className="contact-number" style={contactContainerText}>
                Phone: 1-800-HIKE-NOW (1-800-445-3669)
              </h3>
              <h3 className="contact-email" style={contactContainerText}>
                Email: trailTribe@gmail.com
              </h3>
              <h3 className="contact-address" style={contactContainerText}>
                Address: 1550 Digital Dr #400, Lehi, UT 84043
              </h3>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="contact-image-container">
              <img className="contact-image" src="public/contact-one.jpeg" />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form
          className="contact-message-container"
          onSubmit={submitFormHandler}
        >
          <h1 className="contact-message-header">Send us a message</h1>
          <TextField
            className="contact-message-name"
            required
            color="black"
            id="outlined-required"
            label="Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <TextField
            className="contact-message-email"
            required
            color="black"
            id="outlined-required"
            label="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            className="contact-message-subject"
            required
            color="black"
            id="outlined-required"
            label="Subject"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <TextField
            className="contact-message-comment"
            color="black"
            required
            id="outlined-required"
            label="Comment or message"
            multiline
            maxRows={8}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button type="submit" style={contactButton}>Send Message</Button>
        </form>
      </Box>
    </>
  );
}

export default Contact;