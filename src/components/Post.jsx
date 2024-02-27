// == IMPORTS ==
// css
import '../styles/post.css';
// packages
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// components

// import Container from "@mui/material/Container";
import { Typography, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Comment from "./Comment.jsx";
import Carousel, {PrevButton, NextButton } from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import { Paper,TextField } from "@mui/material";
import { primHoverSX } from './Theme.jsx';
import CommentSlide from './CommentSlide.jsx';
// Icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ParkIcon from '@mui/icons-material/Park';
import StarIcon from '@mui/icons-material/Star';
import HikingIcon from '@mui/icons-material/Hiking';

function Post(props) {
  console.log('re-rendering post!!!');
  const theme = useTheme();
  const post = useRef(null);
  // inits
  // const postData = props.post;
  const [postData, setPostData] = useState(props.post);
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState('');


  console.log('postData:', postData);

  const reduxUser = useSelector((state) => state.userReducer);

  async function submitComment(){
    const newComment = {
      text: comment,
      postId: postData.user.id,
      userId: reduxUser.id,
    }

    try {
      const res = await axios.post('/comment', newComment)
      console.log('Comment submitted:', res.data)
      // setPostData(res.data)
      setComment('')
      let asdf = props.count
      props.setCount(asdf + 1)
      // window.location.reload()

    }
    catch(err){
      console.error('Error submitting comment:', err)
    }
  }


  // Set either newsfeed class or explore class for specific styling depending on the page we are on
  useEffect(() => {
    console.log(post.current);
    if (props.page === 'newsfeed') {
      post.current.classList.add('post--newsfeed');
    } else if (props.page === 'explore') {
      post.current.classList.add('post--explore');
    }
  }, []);


  const submitReaction = (reaction) => {
    console.log('submitReaction:');
    const createReaction = {
      post: {
        ...postData,
      },
      reaction: reaction,
    };
    axios
      .post('/createReaction', createReaction)
      .then((response) => {
        console.log(response);
        setPostData(response.data.post);
        // TODO - dispatchs, toasts
      })
      .then((error) => {
        // TODO toasts
        console.log(error);
      });
  };

  const paperStyles = {
    borderRadius: theme.shape.innerBorderRadius,
    padding: '20px 10px',
    backgroundColor: theme.palette.tertiary.light,
    width: "320px",
    marginBottom: "10px",
    "&:hover": {
      cursor: "pointer",
    }
  };

  const modalStyle = {
    position: 'absolute !important',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'secondary.main',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: theme.shape.outerBorderRadius,
  };

  const buttonStyle = {
    position: 'absolute !important',
    top: 0,
    right: '-10px',
    color: `${theme.palette.primary.main} !important`,
  };

  const commentHeading = {
    borderBottom: '1px solid black',
    marginBottom: '10px',
  };

  const commentFooter = {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  

  const commentBody = {
    height: 200,
    overflowY: "scroll",
    scrollbars: "auto",
    "&::-webkit-scrollbar": {
      width: "12px", // width of the scrollbar
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.tertiary.main, // color of the thumb
      borderRadius: "6px", // roundness of the thumb
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", // color of the track
    },
    // change scrollbar style to match theme
  };

  const containerStyles = {
    border: "1px solid red",
    display: "flex",
    height: '10rem',
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 10px",
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.shape.innerBorderRadius,
    boxShadow:
      "inset -5px 0 10px lightgray, inset 0 -5px 10px gray, inset 5px 0 10px lightgray",
  };

  const carouselStyles = {
    width: "500px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    margin: "0 auto",
    next:  {
      position: "absolute",
      right: '-100px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    prev: {
      position: "absolute",
      left: '-100px',
      top: '50%',
      transform: 'translateY(-50%)',
    }
  }
 
 


  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const submitFriendBtn = () => {
    // if on newsfeed, unfollow user
    if (props.page === 'newsfeed') {
      console.log('== newsfeed! ==');
      axios
        .delete(`/unfollow/${postData.userId}`)
        .then((response) => {
          console.log(response);
          props.friendBtn(postData.userId);
          // props.setPosts([]);
        })
        .catch((error) => {
          console.log(error);
        });

      // if on explore page, follow user
    } else if (props.page === 'explore') {
      console.log('== explore! ==');
      axios
        .post(`/follow/${postData.userId}`)
        .then((response) => {
          console.log(response);
          props.friendBtn();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let followButton;
  if (postData.userId === reduxUser.id) {
    followButton = null;
  } else if (props.page === 'newsfeed') {
    followButton = (
      <>
        <Button onClick={() => props.submitSeeInfo(postData.userId)}>See {postData.user.fname}'s Info</Button>
        <Button onClick={() => submitFriendBtn()}>Unfollow {postData.user.fname}</Button>
      </>
    );
  } else if (props.page === 'explore') {
    followButton = <Button onClick={() => submitFriendBtn()}>follow {postData.user.fname}</Button>;
  }

  return (
    <Stack ref={post} className='post'>
      {/* <Container className='post__top' disablegutters='true'> */}

      {/* == CONTENT == */}
      {/* <Container className='post__content' disablegutters='true'> */}
      {/* == TITLE == */}
      <Container className='post__title' disablegutters='true'>
        <Typography variant='h4' className='post__name'>
          {postData.hikeName}
        </Typography>
        <Typography className='post__date'>{new Date(postData.createdAt).toDateString()}</Typography>
      </Container>

      {/* == USER == */}
      <Container className='post__user' disablegutters='true'>
        <img className='post__user-pic' src='https://picsum.photos/200/300' />
        <Typography className='post__user-name' variant='h6'>
          {postData.user.fname} {postData.user.lname}
        </Typography>
        {followButton}
        {/* {props.page === 'newsfeed' ? (
          <Button onClick={() => submitFriendBtn()}>Unfollow {postData.user.fname}</Button>
        ) : (
          <Button onClick={() => submitFriendBtn()}>follow {postData.user.fname}</Button>
        )} */}
      </Container>

      {/* == DESCRIPTION == */}
      <Container className='post__description' align='left' disablegutters='true'>
        <Typography variant='h6'>{postData.description}</Typography>
      </Container>

      {/* == RATINGS == */}
      <Stack className='post__ratings' direction='row' spacing={2}>
        {/* Difficulty */}
        <Stack className='post__difficulty' direction='row'>
          <HikingIcon />
          <Typography variant='h6'>{postData.difficulty}</Typography>
        </Stack>

        {/* Review */}
        <Stack className='post__reviews' direction='row'>
          <StarIcon sx={{ color: 'yellow' }} />
          <Typography variant='h6'>{postData.review}</Typography>
        </Stack>
      </Stack>

      {/* REACTIONS */}
      <Stack className='post__reactions' direction='row' spacing={2}>
        {/* likes */}
        <Stack className='post__reaction' direction='row' spacing={2}>
          <Button onClick={() => submitReaction('likes')}>
            <ThumbUpIcon sx={{ color: 'blue' }} />
          </Button>
          <Typography variant='h6'>{postData.likes}</Typography>
        </Stack>

        {/* Hearts */}
        <Stack className='post__reaction' direction='row' spacing={2}>
          <Button onClick={() => submitReaction('hearts')}>
            <FavoriteIcon sx={{ color: 'red' }} />
          </Button>
          <Typography variant='h6'>{postData.hearts}</Typography>
        </Stack>

        {/* animals */}
        <Stack className='post__reaction' direction='row' spacing={2}>
          <Button onClick={() => submitReaction('animals')}>
            <PetsIcon sx={{ color: 'brown' }} />
          </Button>
          <Typography variant='h6'>{postData.animals}</Typography>
        </Stack>

        {/* Celebrates */}
        <Stack className='post__reaction' direction='row' spacing={2}>
          <Button onClick={() => submitReaction('celebrates')}>
            <CelebrationIcon sx={{ color: 'purple' }} />
          </Button>
          <Typography variant='h6'>{postData.celebrates}</Typography>
        </Stack>

        {/* Trees */}
        <Stack className='post__reaction' direction='row' spacing={2}>
          <Button onClick={() => submitReaction('trees')}>
            <ParkIcon sx={{ color: 'green' }} />
          </Button>
          <Typography variant='h6'>{postData.trees}</Typography>
        </Stack>
      </Stack>

      {/* post pictures */}
      {/* TODO - turn this into a carousel */}
      <Container className='post__pictures' maxWidth='false' disablegutters='true'>
        <img src='https://picsum.photos/600/200'></img>
      </Container>
      {/* </Container> */}
      {/* </Container> */}

      {/* COMMENTS CAROUSEL */}
      <Container className='post__comments' disablegutters='true'>
      <Container sx={containerStyles}>
      <Carousel  sx={carouselStyles}>
          {props.post.comments.length > 0 ? (
          
              props.post.comments.map((comment, idx) => {
                return (
                  <div key={idx}>
                    <CommentSlide key={idx} comment={comment} onClick={handleOpenModal} />
                    </div>
                );
              })
            
          ) : (
            <div>
              <Paper onClick={handleOpenModal} elevation={12} sx={paperStyles}>
                Add a comment!
              </Paper>
            </div>
          )}
        
        </Carousel>
            </Container>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          {/* container for modal styling */}
          <Box sx={modalStyle}>
            {/* close button */}
            <Box>
              <Button sx={buttonStyle} onClick={handleCloseModal}>
                X
              </Button>
            </Box>

            {/* modal header */}
            <Box sx={commentHeading}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Add a comment!
              </Typography>
            </Box>

            {/* all comments */}
            <Box sx={commentBody}>
              {props.post.comments.map((comment, idx) => {
                return (
                  <div key={idx}>
                    <Paper key={idx} elevation={6} sx={paperStyles}>
                      <h4>
                        {comment.user.fname} {comment.user.lname}
                      </h4>
                      <Typography>{comment.text}</Typography>
                    </Paper>
                  </div>
                );
              })}
            </Box>

            {/* add your own comment */}
            <Box sx={commentFooter}>
              <TextField
              sx={{ width: "100%"}}
              id="outlined-multiline-static"
              label="Make a Comment!"
              multiline
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={submitComment} sx={primHoverSX}>Add Comment!</Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Stack>
  );
}

export default Post;
