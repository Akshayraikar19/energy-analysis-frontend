import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h3">Building Energy Analysis System</Typography>
      <Button variant="contained" onClick={() => navigate('/create')}>Create Design</Button>
      <Button variant="contained" onClick={() => navigate('/heat-gain-calculator')}>Heat Gain Calculator</Button>
      <Button variant="contained" onClick={() => navigate('/rankings')}>City Rankings</Button>
    </Container>
  );
};

export default Home;