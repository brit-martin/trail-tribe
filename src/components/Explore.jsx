import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "../styles/explore.css";
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
import { useEffect } from 'react';
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
// "http://www.overpass-api.de/api/xapi?way[highway=path|track|footway|steps|bridleway|cycleway][bbox=#{lng},#{lat},#{lng+TILE_DIM},#{lat+TILE_DIM}]"
// base = 'https://www.alltrails.com/'
// path = f'api/alltrails/locations/states/{stateid}/trails'
function Explore() {
  useEffect(() => {
    // axios.get('http://www.overpass-api.de/api/xapi?way[highway=path][bbox=#{-111.8746681},#{40.4194344},#{-111.8746681-57},#{40.4194344-57}]')
    // axios.get('https://www.alltrails.com/api/alltrails/locations/states/50/trails')
    axios.get('"http://www.overpass-api.de/api/xapi?way[highway=path|track|footway|steps|bridleway|cycleway][bbox=#{-111.8746681},#{40.4194344},#{-111.8746681+.1},#{40.4194344+.1}]"')
    .then((response) => {
      console.log(response)
    })
    .catch ((error) => {
      console.log(error)
    })
  },[])

  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={12} className='explore-header'>
          <Item>Explore</Item>
          </Grid>
          <Grid item xs={7} className='explore-city'>
          <Item
           sx={{
            width: 300,
            height: 60,
          }}
          >
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                Enter City
              </InputLabel>
              <Input
                id='input-with0-icon-adornment'
                startAdornment={
                  <InputAdornment position='start'>
                    <PlaceIcon/>
                  </InputAdornment>
                }
                />  
              </FormControl>
              </Item>
                </Grid>
                <Grid item xs={3} className='explore-distance'>
                  <Item
                  sx={{
                    width: 300,
                    height: 60,
                  }}
                  >
                    <Typography id="track-inverted-slider" gutterBottom>
                      Distance
                    </Typography>
                    <Slider
                      size='small'
                      defaultValue={70}
                      aria-label='Small'
                      valueLabelDisplay='on'
                      sx={{
                        width: 250,
                      }}
                      />
                  </Item>
                </Grid>
              <Grid item xs={2} className='explore-filter'>
                <Item>
              <InputLabel id='demo-simple-select-label'>
                Filter
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter}
                label="filter"
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
        <Grid item xs={4} className='explore-post-container'>
          <Item className='explore-post'>Post Container</Item>
        </Grid>
        <Grid item xs={8} className='explore-map-container'>
          <Item className='explore-map'>
             <Mapbox/>
          </Item>
          </Grid>
        </Grid>
    </Box>
    </>
  )
}

export default Explore;
