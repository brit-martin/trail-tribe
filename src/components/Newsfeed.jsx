// IMPORTS

// import css
import '../styles/newsfeed.css';

// import packages
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import components
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Post from './Post.jsx';
import  Modal  from '@mui/material/Modal';
import  Box  from '@mui/material/Box';
import { useTheme } from '@mui/material';

function Newsfeed() {
  const theme = useTheme();
  // Inits
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const reduxUser = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  console.log(reduxUser);
  console.log(posts);

  useEffect(() => {
    axios
      // Check login status
      .get('/checkLoginStatus')
      .then((response) => {
        console.log(response.data);
        return axios.get('/getFollowingPosts');
      })
      // get all posts
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
        // setComments(response.data.posts.comments)
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.reRoute) {
          navigate(error.response.data.reRoute);
        }
      });
  }, [count]);

  // reset posts to empty, forcing a new axios call after an unfollow
  const unfollowUpdate = () => {
    setPosts([]);
  };

  return (
    <Stack className='newsfeed' maxWidth='false'>
      {/* SIDE PANEL */}
      <Stack className='newsfeed__side-panel' maxWidth='false'>
        <Typography align='center' variant='h4'>
          Side Panel
        </Typography>
      </Stack>

      {/* NEWSFEED MAIN CONTAINER */}
      <Container className='newsfeed__main' maxWidth='false' disableGutters={true}>
        <Container className='newsfeed__posts' disableGutters={true} maxWidth={false}>
          {/* map through posts render all posts */}
          {posts.length > 0 ? (
            posts.map((post, idx) => {
              return <Post count={count} setCount={setCount} key={idx} post={post} unfollowUpdate={unfollowUpdate} />;
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
