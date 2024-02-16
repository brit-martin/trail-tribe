import '../styles/newsfeed.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Post from './Post.jsx';

function Newsfeed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('/posts')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Stack className='newsfeed' maxWidth='false'>
      <Stack className='newsfeed__side-panel' maxWidth='false'>
        <Typography align='center' variant='h4'>
          Side Panel
        </Typography>
      </Stack>
      <Container className='newsfeed__main' maxWidth='false' disableGutters={true}>
        {/* <Typography align='center' variant='h4'> */}
        <Container className='newsfeed__posts' disableGutters={true} maxWidth={false}>
          {posts.length > 0 ? (
            posts.map((post, idx) => {
              return <Post key={idx} post={post} />;
            })
          ) : (
            <h1>No Posts to Display...</h1>
          )}
          {/* <Post /> */}
          {/* <Post /> */}
          {/* <Post /> */}
        </Container>
        {/* </Typography> */}
      </Container>
    </Stack>
  );
}

export default Newsfeed;
