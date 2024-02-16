import '../styles/post.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Comment from './Comment.jsx';
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
  const postData = props.post;
  console.log(postData);

  return (
    <Stack className='post' disableGutters={true} spacing={2}>
      <Container className='post__top' disableGutters={true}>
        {/* == GRAPHICS == */}
        <Stack className='post__graphics' disableGutters={true} spacing={0.5}>
          <Container className='post__pictures' maxWidth='false' disableGutters={true}>
            <img src='https://picsum.photos/600/200'></img>
          </Container>
          <Container className='post__map'>Map</Container>
        </Stack>

        {/* == CONTENT == */}
        <Container className='post__content' disableGutters={true}>
          {/* == TITLE == */}
          <Container className='post__title' disableGutters={true}>
            <Typography variant='h4' className='post__name'>
              {postData.hikeName}
            </Typography>
            <Typography className='post__date'>{new Date(postData.createdAt).toDateString()}</Typography>
          </Container>

          {/* == USER == */}
          <Container className='post__user' disableGutters={true}>
            <img className='post__user-pic' src='https://picsum.photos/200/300' />
            <Typography className='post__user-name' variant='h6'>
              {postData.user.fname} {postData.user.lname}
            </Typography>
          </Container>

          {/* == DESCRIPTION == */}
          <Container className='post__description' align='left' disableGutters={true}>
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
            {/* Thumbs Up */}
            <Stack className='post__reaction' direction='row' spacing={2}>
              <ThumbUpIcon sx={{ color: 'blue' }} />
              <Typography variant='h6'>{postData.likes}</Typography>
            </Stack>

            {/* Heart */}
            <Stack className='post__reaction' direction='row' spacing={2}>
              <FavoriteIcon sx={{ color: 'red' }} />
              <Typography variant='h6'>{postData.hearts}</Typography>
            </Stack>

            {/* Paws */}
            <Stack className='post__reaction' direction='row' spacing={2}>
              <PetsIcon sx={{ color: 'brown' }} />
              <Typography variant='h6'>{postData.animals}</Typography>
            </Stack>

            {/* Celebrate */}
            <Stack className='post__reaction' direction='row' spacing={2}>
              <CelebrationIcon sx={{ color: 'purple' }} />
              <Typography variant='h6'>{postData.celebrates}</Typography>
            </Stack>

            {/* Tree */}
            <Stack className='post__reaction' direction='row' spacing={2}>
              <ParkIcon sx={{ color: 'green' }} />
              <Typography variant='h6'>{postData.trees}</Typography>
            </Stack>
          </Stack>

          {/* ACTIONS */}
          <Container className='post__actions' disableGutters={true}>
            <Button>React</Button>
            <Button>Follow {postData.user.fname}</Button>
          </Container>
        </Container>

        {/* COMMENTS */}
      </Container>
      <Container className='post__comments' disableGutters={true}>
        <Comment />
      </Container>
    </Stack>
  );
}

export default Post;
