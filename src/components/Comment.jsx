import "../styles/comment.css";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";


function Comment({ comment, onClick }) {
  const theme = useTheme();

  
  

  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    padding: "20px 10px",
    backgroundColor: theme.palette.tertiary.light,
    width: '320px',
    overflow: 'hidden',
    "&:hover": {
      cursor: "pointer",
    }
  };

  const reduxUser = useSelector((state) => state.userReducer);
  
  const commentHover = {
    '&:hover': {
      cursor: "pointer",
    }
  }

  console.log(comment);
  

  return (
        <Paper onClick={onClick}  elevation={12} sx={paperStyles}>
          <h4>
            {comment.user.fname} {comment.user.lname}
          </h4>
          <Typography>{comment.text}</Typography>
        </Paper>
  );
}

export default Comment;
