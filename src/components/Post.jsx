// == IMPORTS ==
// css
import "../styles/post.css";
// packages
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// components
// import Container from "@mui/material/Container";
import { Typography, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Comment from "./Comment.jsx";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import { Paper,TextField } from "@mui/material";
// Icons
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ParkIcon from "@mui/icons-material/Park";
import StarIcon from "@mui/icons-material/Star";
import HikingIcon from "@mui/icons-material/Hiking";

function Post(props) {
  const theme = useTheme();
  // inits
  // const postData = props.post;
  const [postData, setPostData] = useState(props.post);
  const [openModal, setOpenModal] = useState(false);

  const reduxUser = useSelector((state) => state.userReducer);
  // console.log(reduxUser);
  console.log(postData.reactions);
  const reactions = {
    likes: 0,
    hearts: 0,
    celebrates: 0,
    animals: 0,
    trees: 0,
  };
  console.log(props.post);
  postData.reactions.forEach((react) => {
    reactions[react.reactionType]++;
  });

  const submitReaction = (reaction) => {
    console.log("submitReaction:");
    const createReaction = {
      post: {
        ...postData,
      },
      reaction: reaction,
    };
    axios
      .post("/createReaction", createReaction)
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
    padding: "20px 10px",
    backgroundColor: theme.palette.tertiary.light,
    maxWidth: "700px",
    minWidth: "250px",
  };

  const modalStyle = {
    position: "absolute !important",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "secondary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: theme.shape.outerBorderRadius,
  };

  const buttonStyle = {
    position: "absolute !important",
    top: 0,
    right: "-10px",
    color: `${theme.palette.primary.main} !important`,
  };

  const commentHeading = {
    borderBottom: "1px solid black",
    marginBottom: "10px",
  }

  const commentFooter = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }

  const commentBody = {
    height: 200,
    overflowY: "scroll",
    scrollbars: "auto",
    // change scrollbar style to match theme

  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <Stack className="post" disableGutters={true} spacing={2}>
      <Container className="post__top" disableGutters={true}>
        {/* == GRAPHICS == */}
        <Stack className="post__graphics" disableGutters={true} spacing={0.5}>
          <Container
            className="post__pictures"
            maxWidth="false"
            disableGutters={true}
          >
            <img src="https://picsum.photos/600/200"></img>
          </Container>
          <Container className="post__map">Map</Container>
        </Stack>

        {/* == CONTENT == */}
        <Container className="post__content" disableGutters={true}>
          {/* == TITLE == */}
          <Container className="post__title" disableGutters={true}>
            <Typography variant="h4" className="post__name">
              {postData.hikeName}
            </Typography>
            <Typography className="post__date">
              {new Date(postData.createdAt).toDateString()}
            </Typography>
          </Container>

          {/* == USER == */}
          <Container className="post__user" disableGutters={true}>
            <img
              className="post__user-pic"
              src="https://picsum.photos/200/300"
            />
            <Typography className="post__user-name" variant="h6">
              {postData.user.fname} {postData.user.lname}
            </Typography>
            <Button>Follow {postData.user.fname}</Button>
          </Container>

          {/* == DESCRIPTION == */}
          <Container
            className="post__description"
            align="left"
            disableGutters={true}
          >
            <Typography variant="h6">{postData.description}</Typography>
          </Container>

          {/* == RATINGS == */}
          <Stack className="post__ratings" direction="row" spacing={2}>
            {/* Difficulty */}
            <Stack className="post__difficulty" direction="row">
              <HikingIcon />
              <Typography variant="h6">{postData.difficulty}</Typography>
            </Stack>

            {/* Review */}
            <Stack className="post__reviews" direction="row">
              <StarIcon sx={{ color: "yellow" }} />
              <Typography variant="h6">{postData.review}</Typography>
            </Stack>
          </Stack>

          {/* REACTIONS */}
          <Stack className="post__reactions" direction="row" spacing={2}>
            {/* likes */}
            <Stack className="post__reaction" direction="row" spacing={2}>
              <Button onClick={() => submitReaction("likes")}>
                <ThumbUpIcon sx={{ color: "blue" }} />
              </Button>
              <Typography variant="h6">{reactions.likes}</Typography>
            </Stack>

            {/* Hearts */}
            <Stack className="post__reaction" direction="row" spacing={2}>
              <Button onClick={() => submitReaction("hearts")}>
                <FavoriteIcon sx={{ color: "red" }} />
              </Button>
              <Typography variant="h6">{reactions.hearts}</Typography>
            </Stack>

            {/* animals */}
            <Stack className="post__reaction" direction="row" spacing={2}>
              <Button onClick={() => submitReaction("animals")}>
                <PetsIcon sx={{ color: "brown" }} />
              </Button>
              <Typography variant="h6">{reactions.animals}</Typography>
            </Stack>

            {/* Celebrates */}
            <Stack className="post__reaction" direction="row" spacing={2}>
              <Button onClick={() => submitReaction("celebrates")}>
                <CelebrationIcon sx={{ color: "purple" }} />
              </Button>
              <Typography variant="h6">{reactions.celebrates}</Typography>
            </Stack>

            {/* Trees */}
            <Stack className="post__reaction" direction="row" spacing={2}>
              <Button onClick={() => submitReaction("trees")}>
                <ParkIcon sx={{ color: "green" }} />
              </Button>
              <Typography variant="h6">{reactions.trees}</Typography>
            </Stack>
          </Stack>

          {/* ACTIONS */}
          {/* <Container className='post__actions' disableGutters={true}> */}
          {/* <Button>React</Button> */}
          {/* <Button>Follow {postData.user.fname}</Button> */}
          {/* </Container> */}
        </Container>

        {/* COMMENTS */}
      </Container>
      <Container className="post__comments" disableGutters={true}>
        <Carousel navButtonsAlwaysVisible={true}>
          {props.post.comments.length > 0 ? (
            <>
              {props.post.comments.map((comment, idx) => {
                return (
                  <div onClick={handleOpenModal}>
                    <Comment key={idx} comment={comment} />
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              <Paper onClick={handleOpenModal} elevation={12} sx={paperStyles}>
                Add a comment!
              </Paper>
            </div>
          )}
        </Carousel>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box>
            <Button sx={buttonStyle} onClick={handleCloseModal}>
              X
            </Button>
            </Box>
            <Box sx={commentHeading}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a comment!
            </Typography>
            </Box>
            <Box sx={commentBody}>
              {props.post.comments.map((comment, idx) => {
                return (
                  <div>
                    <Paper elevation={6} sx={paperStyles}>
                      <h4>
                        {comment.user.fname} {comment.user.lname}
                      </h4>
                      <Typography>{comment.text}</Typography>
                    </Paper>
                  </div>
                );
              })}
            </Box>
            <Box sx={commentFooter}>
              <TextField
              sx={{ width: "100%"}}
              id="outlined-multiline-static"
              label="Make a Comment!"
              focused
              multiline
              rows={2}

              />
              <Button >Add Comment!</Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Stack>
  );
}

export default Post;
