import Benefits from './Benefits.jsx';
import Hero from './Hero.jsx';
import Testimonials from './Testimonials.jsx';
import Features from './Features.jsx';
import '../index.css';

function Home() {
  return (
    <div className='page__bg'>
      <div className='page__width'>
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
      </div>
    </div>
  );
}

export default Home;
