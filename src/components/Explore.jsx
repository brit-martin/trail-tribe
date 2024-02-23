// IMPORTS
// css
import '../styles/explore.css';

// packages
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// icons
import CloseIcon from '@mui/icons-material/Close';

// components
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
  const dispatch = useDispatch();
  const explorePosts = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [searchRange, setSearchRange] = useState(5);
  const [posts, setPosts] = useState([]);
  // const mapboxContainer = useRef(null);
  const [filter, setFilter] = useState('');
  console.log(explorePosts);

  if (explorePosts.current) {
    if (posts.length > 0) {
      console.log('adding show-posts');
      explorePosts.current.classList.add('show-posts');
    } else {
      console.log('removing show-posts');
      explorePosts.current.classList.remove('show-posts');
    }
  }

  // const submitClearPosts = () => {
  //   setPosts([]);
  // }

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
        console.log(error);
      });
  };

  const getPosts = (trailId) => {
    axios
      .get(`/getPostsByTrailId/${trailId}`)
      .then((response) => {
        console.log(response.data.posts);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container className='explore' maxWidth={false} disableGutters={true}>
      {/* MAPBOX CONTAINER */}
      <Container className='mapbox' maxWidth={false} disableGutters={true}>
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
            defaultValue={searchRange}
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
        disableGutters={true}
        sx={{ width: '30rem' }}
      >
        {posts.length > 0
          ? posts.map((post, idx) => {
              return <Post key={idx} post={post} />;
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
    </Container>
  );
}

export default Explore;
