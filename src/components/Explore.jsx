// IMPORTS
// css
import '../styles/explore.css';

// packages
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// icons
import CloseIcon from '@mui/icons-material/Close';

// components
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PlaceIcon from '@mui/icons-material/Place';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Mapbox from './Mapbox';
import Button from '@mui/material/Button';
import Post from './Post.jsx';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import { primHoverSX } from './Theme.jsx';

// ------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Explore() {
  // Initialize
  const [createPost, setCreatePost] = useState({
    trailId: '',
    hikeName: '',
    description: '',
    pictureArray: '',
    review: '',
    difficulty: '',
  });
  const theme = useTheme();
  const dispatch = useDispatch();
  const explorePosts = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [searchRange, setSearchRange] = useState(5);
  const [posts, setPosts] = useState([]);
  // const mapboxContainer = useRef(null);
  const [filter, setFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // console.log(explorePosts);

  // MATERIAL UI STYLING
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

  const createPostRow = {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const commentBody = {
    height: 200,
    overflowY: 'scroll',
    scrollbars: 'auto',
    '&::-webkit-scrollbar': {
      width: '12px', // width of the scrollbar
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.tertiary.main, // color of the thumb
      borderRadius: '6px', // roundness of the thumb
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent', // color of the track
    },
    // change scrollbar style to match theme
  };

  if (explorePosts.current) {
    if (posts.length > 0) {
      // console.log('adding show-posts');
      explorePosts.current.classList.add('show-posts');
    } else {
      // console.log('removing show-posts');
      explorePosts.current.classList.remove('show-posts');
    }
  }

  // request to get the users geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getGeolocation, defaultLocation);
    }
  }, []);

  // user accepted geolocation request -> set users coordinates
  const getGeolocation = (position) => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
  };

  // user rejected geolocation request -> set default coordinates
  const defaultLocation = (error) => {
    setLng(-111.8746681);
    setLat(40.4194344);
  };

  const searchArea = () => {
    // Set Bounding Boxes
    const bboxSouth = +lat - searchRange * 0.002;
    const bboxWest = +lng + searchRange * 0.002;
    const bboxNorth = +lat + searchRange * 0.002;
    const bboxEast = +lng - searchRange * 0.002;

    // Build the request body
    // TODO - add filter to remove paths without names
    const reqBody = `
      [out:json][timeout:25];
      way["highway"="path"](${bboxSouth},${bboxEast},${bboxNorth},${bboxWest});
      out geom;
    `;

    // Send request
    axios
      .post('https://overpass-api.de/api/interpreter', reqBody)
      .then((response) => {
        // set the newly fetched location data that is passed down to the Mapbox component
        setLocationData(response.data.elements);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const getPosts = (trailId) => {
    axios
      .get(`/getPostsByTrailId/${trailId}`)
      .then((response) => {
        const posts = response.data.posts;
        if (posts.length === 0) {
          Swal.fire({
            customClass: {
              container: 'my-swal',
            },
            position: 'top',
            icon: 'info',
            iconColor: '#FF4b1f',
            title: 'No posts to display',
            showConfirmButton: false,
            background: theme.palette.tertiary.light,
            color: 'white',
            timer: 1500,
          });
        } else {
          setPosts(posts);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const follow = (userFName) => {
    // console.log('follow function');
    Swal.fire({
      customClass: {
        container: 'my-swal',
      },
      position: 'top',
      icon: 'success',
      iconColor: '#FF4b1f',
      title: `You are now following ${userFName}!`,
      showConfirmButton: false,
      background: theme.palette.tertiary.light,
      color: 'white',
      timer: 1500,
    });
  };

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal(trailId) {
    setCreatePost({
      userId: '',
      trailId: trailId,
      hikeName: '',
      description: '',
      pictureArray: '',
      review: '',
      difficulty: '',
    });
    setOpenModal(true);
  }

  const submitCreatePost = (markerId) => {
    // console.log('== submit create post ==');
    // remove the picture for now...
    // console.log(createPost);
    createPost.pictureArray = 'picture';

    // Send Axios Call
    axios
      .post('/createPost', createPost)
      .then((response) => {
        //console.log(response.data);
        handleCloseModal(false);
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          position: "top",
          icon: "success",
          iconColor: "#FF4b1f",
          title: "Post successfully created",
          showConfirmButton: false,
          background: theme.palette.tertiary.light,
          color: "white",
          timer: 1500
        })
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <Container className='explore' maxWidth={false} disablegutters='true'>
      {/* MAPBOX CONTAINER */}
      <Container className='mapbox' maxWidth={false} disablegutters='true'>
        {/* wait for latitude and longitude are retrieved from the browser */}
        {lng && lat ? (
          <Mapbox
            locationData={locationData}
            lng={lng}
            lat={lat}
            setLng={setLng}
            setLat={setLat}
            searchArea={searchArea}
            getPosts={getPosts}
            handleOpenModal={handleOpenModal}
          />
        ) : (
          <Typography className='mapbox__loading'>Getting Map Ready...</Typography>
        )}
      </Container>

      {/* MAP FUNCTIONS BAR */}
      <Stack className='explore__bar' direction='row'>
        {/* <Typography>Explore</Typography> */}
        <Button onClick={() => searchArea()}>Search Area</Button>
        <Container sx={{ width: 300, height: 60 }}>
          <Typography className='explore__filter-header' id='track-inverted-slider' gutterBottom>
            Distance (miles)
          </Typography>
          <Slider
            size='small'
            value={searchRange}
            aria-label='Small'
            // valueLabelDisplay='on'
            marks={[
              {
                value: 5,
                label: '5',
              },
              {
                value: 10,
                label: '10',
              },
              {
                value: 15,
                label: '15',
              },
              {
                value: 20,
                label: '20',
              },
              {
                value: 25,
                label: '25',
              },
            ]}
            min={5}
            max={25}
            step={null}
            sx={{
              width: 250,
            }}
            onChange={(e) => setSearchRange(e.target.value)}
          />
        </Container>
      </Stack>

      {/* POSTS CONTAINER */}
      <Container
        ref={explorePosts}
        className='explore__posts'
        maxWidth={false}
        disablegutters='true'
        sx={{ width: '30rem' }}
      >
        {posts.length > 0
          ? posts.map((post, idx) => {
              return <Post key={idx} post={post} page='explore' friendBtn={follow} />;
            })
          : null}
        <Button
          className='explore__clear-posts'
          onClick={() => {
            setPosts([]);
          }}
        >
          <CloseIcon fontSize='large' sx={{ color: '#1877F2' }} />
        </Button>
      </Container>

      {/* CREATE POST MODAL */}
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
              Create Your Post!
            </Typography>
          </Box>

          {/* Trail Name */}
          <FormControl sx={{ width: '100%' }} style={createPostRow}>
            <TextField
              sx={{ width: '100%' }}
              id='outlined-input'
              label='Trail Name'
              name='hikeName'
              value={createPost.hikeName}
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          {/* Description */}
          <FormControl sx={{ width: '100%' }} style={createPostRow}>
            <TextField
              sx={{ width: '100%' }}
              id='outlined-multiline-static'
              label='Description'
              name='description'
              multiline
              rows={2}
              value={createPost.description}
              inputProps={{
                maxLength: 255,
              }}
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          {/* Pictures */}
          {/* <FormControl sx={{ width: '100%' }} style={createPostRow}>
            <Input
              sx={{ width: '100%' }}
              type='file'
              id='image-upload-input'
              label='Upload Image'
              name='pictureArray'
              value={createPost.pictureArray}
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl> */}

          {/* Difficulty */}
          <FormControl sx={{ width: '100%' }} style={createPostRow}>
            <InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={createPost.difficulty}
              label='Difficulty'
              name='difficulty'
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          {/* Review */}
          <FormControl sx={{ width: '100%' }} style={createPostRow}>
            <InputLabel id='demo-simple-select-label'>Review</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={createPost.review}
              label='Review'
              name='review'
              onChange={(e) =>
                setCreatePost({
                  ...createPost,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          <Box sx={createPostRow}>
            <Button onClick={submitCreatePost} sx={primHoverSX}>
              Create Posts!
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default Explore;
