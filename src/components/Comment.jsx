import React from 'react';
// MUI components
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// CSS
import '../styles/comment.css';

function Comment({ fname, lname, comment, onClick }) {
  const theme = useTheme();

  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    paddingTop: '10px',
    paddingBottom: '20px',
    paddingLeft: '60px',
    paddingRight: '60px',
    backgroundColor: theme.palette.tertiary.light,
    width: '500px',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  };

  return (
    <Paper onClick={onClick} elevation={12} sx={paperStyles}>
      <h4>
        {fname} {lname}
      </h4>
      <Typography>{comment.text}</Typography>
    </Paper>
  );
}

export default Comment;
