// IMPORTS

// import css
import '../styles/newsfeed.css';

// import packages

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// import components
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Post from './Post.jsx';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';

// icons
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import RecommendIcon from '@mui/icons-material/Recommend';
import PostAddIcon from '@mui/icons-material/PostAdd';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

function Newsfeed() {
  // setup
  const theme = useTheme();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.userReducer);
  const reduxPosts = useSelector((state) => state.postsReducer);
  const newsfeedUserInfo = useRef(null);
  const navigate = useNavigate();
  // state variables
  const [userInfo, setUserInfo] = useState(null);
  // Inits
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  if (newsfeedUserInfo.current) {
    if (userInfo) {
      // console.log('adding show-user-info');
      newsfeedUserInfo.current.classList.add('show-user-info');
    } else {
      // console.log('removing show-user-info');
      newsfeedUserInfo.current.classList.remove('show-user-info');
    }
  }

  // functionality
  useEffect(() => {
    // console.log('newsfeed useEffect:');
    axios
      // Check login status
      .get('/checkLoginStatus')
      .then((response) => {
        // console.log(response.data);
        return axios.get('/getFollowingPosts');
      })
      // get all posts
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.reRoute) {
          navigate(error.response.data.reRoute);
        }
      });
  }, [count, reduxPosts]);

  const seeInfo = (userId) => {
    // console.log('== seeInfo ==');
    axios
      .get(`getNewsfeedUserInfo/${userId}`)
      .then((response) => {
        // console.log(response.data.userInfo);
        setUserInfo(response.data.userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // reset posts to empty, forcing a new axios call after an unfollow
  const unfollow = (userId, userFName) => {
    // console.log('unfollow user:');
    Swal.fire({
      customClass: {
        container: 'my-swal',
      },
      position: 'top',
      icon: 'success',
      iconColor: '#FF4b1f',
      title: `Unfollowed ${userFName}!`,
      showConfirmButton: false,
      background: theme.palette.tertiary.light,
      color: 'white',
      timer: 1500,
    });
    setPosts([]);
    dispatch({ type: 'RESET_POSTS' });
  };

  return (
    <Stack className='newsfeed' maxWidth='false'>
      {/* User Info Panel */}
      <Stack ref={newsfeedUserInfo} className='newsfeed__user-info' maxWidth='false' spacing={4}>
        <Button
          className='newsfeed__clear-user-posts'
          onClick={() => {
            setUserInfo(null);
          }}
        >
          <CloseIcon fontSize='large' sx={{ color: '#1877F2' }} />
        </Button>
        <Typography align='center' variant='h4'>
          User Info Panel
        </Typography>

        {/* User Profile Pic & Name */}
        <Stack direction='row'>
          <img className='post__user-pic' src='https://picsum.photos/200/300' />
          <Typography>
            {userInfo && userInfo.user.fname} {userInfo && userInfo.user.lname}
          </Typography>
        </Stack>

        {/* User Bio */}
        <Stack direction='row'>
          <Typography>{userInfo && userInfo.user.bio}</Typography>
        </Stack>

        {/* Friends Count */}
        <Stack direction='row' className='user-info__row'>
          <PeopleIcon fontSize='large' sx={{ color: '#1877F2' }} />
          <Typography>Friends: {userInfo && userInfo.friends}</Typography>
        </Stack>
        {/* Comments Count */}
        <Stack direction='row' className='user-info__row'>
          <CommentIcon fontSize='large' sx={{ color: '#1877F2' }} />
          <Typography>Comments: {userInfo && userInfo.comments}</Typography>
        </Stack>
        {/* Reactions Count */}
        <Stack direction='row' className='user-info__row'>
          <RecommendIcon fontSize='large' sx={{ color: '#1877F2' }} />
          <Typography> Reactions: {userInfo && userInfo.reactions}</Typography>
        </Stack>
        {/* Posts Count */}
        <Stack direction='row' className='user-info__row'>
          <PostAddIcon fontSize='large' sx={{ color: '#1877F2' }} />
          <Typography>Posts: {userInfo && userInfo.posts}</Typography>
        </Stack>

        {/* Average Review */}
        <Stack direction='row' className='user-info__row'>
          <StarIcon fontSize='large' sx={{ color: '#1877F2' }} />
          <Typography>Average Review: {userInfo && userInfo.avgReview}</Typography>
        </Stack>
      </Stack>

      {/* NEWSFEED MAIN CONTAINER */}
      <Container className='newsfeed__main' maxWidth='false' disablegutters='true'>
        <Container className='newsfeed__posts' disablegutters='true' maxWidth={false}>
          {/* map through posts render all posts */}
          {posts.length > 0 ? (
            posts.map((post, idx) => {
              return (
                <Post
                  count={count}
                  setCount={setCount}
                  key={idx}
                  post={post}
                  page='newsfeed'
                  friendBtn={unfollow}
                  setPosts={setPosts}
                  submitSeeInfo={seeInfo}
                />
              );
            })
          ) : (
            <h1>No Posts to Display...</h1>
          )}
        </Container>
      </Container>
    </Stack>
  );
}

export default Newsfeed;
