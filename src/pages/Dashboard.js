import { Container, Typography, Grid, Paper } from '@mui/material';
import DesignList from '../components/DesignList';
import CityRankings from '../components/CityRankings';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5"></Typography>
            <DesignList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5"></Typography>
            <CityRankings />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;