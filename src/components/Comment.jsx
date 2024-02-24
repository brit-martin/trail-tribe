import "../styles/comment.css";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";


function Comment({ comment }) {
  const theme = useTheme();

  
  const containerStyles = {
    border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 10px",
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.shape.innerBorderRadius,
    boxShadow:
      "inset -5px 0 10px lightgray, inset 0 -5px 10px gray, inset 5px 0 10px lightgray",
  };

  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    padding: "20px 10px",
    backgroundColor: theme.palette.tertiary.light,
    maxWidth: '700px',
    minWidth: '250px',
  };

  const reduxUser = useSelector((state) => state.userReducer);
  
  

  console.log(comment);
  

  return (
    <Container sx={containerStyles}>
        <Paper elevation={12} sx={paperStyles}>
          <h4>
            {comment.user.fname} {comment.user.lname}
          </h4>
          <Typography>{comment.text}</Typography>
        </Paper>
    </Container>
  );
}

export default Comment;
