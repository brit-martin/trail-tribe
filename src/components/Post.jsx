// == IMPORTS ==
// css
import "../styles/post.css";
// packages
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Comment from "./Comment.jsx";
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
  // inits
  // const postData = props.post;
  const [postData, setPostData] = useState(props.post);
  const [comments, setComments] = useState([]);

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
        {/* <Comment /> */}
        {props.post.comments.length > 0 ? (
          props.post.comments.map((comment, idx) => {
            return <Comment key={idx} comment={comment} />;
          })
        ) : (
          <div>Add a comment!</div>
        )}
      </Container>
    </Stack>
  );
}

export default Post;
