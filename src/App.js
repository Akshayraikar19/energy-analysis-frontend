import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DesignList from './components/DesignList';
import DesignForm from './components/DesignForm';
import HeatGainCalculator from './components/HeatGainCalculator';
import CityRankings from './components/CityRankings';
import CompareDesigns from './components/CompareDesign';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppBar position="static">
        <ToastContainer position="top-right" autoClose={3000} />
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Building Energy Analysis</Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/create">Create Design</Button>
            <Button color="inherit" component={Link} to="/heat-gain-calculator">Heat Gain</Button>
            <Button color="inherit" component={Link} to="/rankings">Rankings</Button>
            <Button color="inherit" component={Link} to="/compare">Compare Designs</Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<DesignForm />} />
            {/* <Route path="/calculate" element={<HeatGainCalculator />} /> */}
            <Route path="/heat-gain-calculator" element={<HeatGainCalculator />} />
            <Route path="/rankings" element={<CityRankings />} />
            <Route path="/compare" element={<CompareDesigns />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
