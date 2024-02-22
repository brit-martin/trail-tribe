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

  const reduxUser = useSelector((state) => state.userReducer);

  console.log(comment);
  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    padding: "20px 10px",
    backgroundColor: theme.palette.white.main,
  };
  

  return (
    <Container className="comment">
      <Paper elevation={8} sx={paperStyles}>
        <h4>
          {comment.user.fname} {comment.user.lname}
        </h4>
        <Typography>{comment.text}</Typography>
      </Paper>
    </Container>
  );
}

export default Comment;
