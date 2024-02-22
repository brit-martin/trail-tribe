// IMPORTS
// css
import '../styles/explore.css';

// packages
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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
  const [lng, setLng] = useState(-111.8746681);
  const [lat, setLat] = useState(40.4194344);
  const [locationData, setLocationData] = useState([]);
  const [searchRange, setSearchRange] = useState(15);
  // const mapboxContainer = useRef(null);
  const [filter, setFilter] = useState('');

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

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* EXPLORE HEADER */}
          <Grid item xs={12} className='explore-header'>
            <Item>Explore</Item>
          </Grid>

          {/* SEARCH BY CITY */}
          <Grid item xs={7} className='explore-city'>
            <Button onClick={() => searchArea()}>Search Area</Button>
            <Item
              sx={{
                width: 300,
                height: 60,
              }}
            >
              <FormControl>
                <InputLabel htmlFor='input-with-icon-adornment'>Enter City</InputLabel>
                <Input
                  id='input-with0-icon-adornment'
                  startAdornment={
                    <InputAdornment position='start'>
                      <PlaceIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Item>
          </Grid>

          {/* RANGE FILTER */}
          <Grid item xs={3} className='explore-distance'>
            <Item
              sx={{
                width: 300,
                height: 60,
              }}
            >
              <Typography id='track-inverted-slider' gutterBottom>
                Distance (miles)
              </Typography>
              <Slider
                size='small'
                defaultValue={70}
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
            </Item>
          </Grid>

          {/* FILTER DROPDOWN */}
          <Grid item xs={2} className='explore-filter'>
            <Item>
              <InputLabel id='demo-simple-select-label'>Filter</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter}
                label='filter'
                sx={{
                  height: 25,
                  width: 200,
                }}
                onChange={handleChange}
              >
                <MenuItem>Test1</MenuItem>
                <MenuItem>Test2</MenuItem>
                <MenuItem>Test3</MenuItem>
              </Select>
            </Item>
          </Grid>

          {/* POSTS SIDE PANEL CONTAINER */}
          <Grid item xs={4} className='explore-post-container'>
            <Item className='explore-post'>Post Container</Item>
          </Grid>

          {/* MAPBOX CONTAINER */}
          <Grid item xs={8} className='explore-map-container'>
            <Item className='explore-map'>
              <Mapbox
                locationData={locationData}
                lng={lng}
                lat={lat}
                setLng={setLng}
                setLat={setLat}
                searchArea={searchArea}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Explore;
