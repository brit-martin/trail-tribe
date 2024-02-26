import React from "react";
// MUI components
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// CSS
import "../styles/comment.css";

function Comment({ comment, onClick }) {
  const theme = useTheme();

  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    padding: "20px 10px",
    backgroundColor: theme.palette.tertiary.light,
    width: "320px",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  };

  console.log(comment);

  return (
    <Paper onClick={onClick} elevation={12} sx={paperStyles}>
      <h4>
        {comment.user.fname} {comment.user.lname}
      </h4>
      <Typography>{comment.text}</Typography>
    </Paper>
  );
}

export default Comment;
