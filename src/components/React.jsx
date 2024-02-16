import '../styles/react.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// Icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ParkIcon from '@mui/icons-material/Park';

function React() {
  return (
    <Container className='react'>
      <Button className='react__like'>
        <ThumbUpIcon sx={{ color: 'blue' }} />
      </Button>
      <Button className='react__heart'>
        <FavoriteIcon sx={{ color: 'red' }} />
      </Button>
      <Button className='react__animal'>
        <PetsIcon sx={{ color: 'brown' }} />
      </Button>
      <Button className='react__celebrate'>
        <CelebrationIcon sx={{ color: 'purple' }} />
      </Button>
      <Button className='react__tree'>
        <ParkIcon sx={{ color: 'green' }} />
      </Button>
    </Container>
  );
}

export default React;
