import { useEffect, useState } from 'react';
import { compareDesigns } from '../services/api';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';

const CompareDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComparison() {
      try {
        const response = await compareDesigns();
        if (!response.data || response.data.length === 0) {
          throw new Error("No designs available");
        }
        setDesigns(response.data);
      } catch (err) {
        setError('Failed to fetch design comparisons.');
      } finally {
        setLoading(false);
      }
    }
    fetchComparison();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Design Comparisons</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Design Name</strong></TableCell>
                <TableCell><strong>Heat Gain (BTU)</strong></TableCell>
                <TableCell><strong>Cooling Load (kWh)</strong></TableCell>
                <TableCell><strong>Energy Consumed (kWh)</strong></TableCell>
                <TableCell><strong>Cooling Cost ($)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {designs.map((design) => (
    <TableRow key={design._id}>
      <TableCell>{design.name || '-'}</TableCell>
      <TableCell>{design.heatGain ? `${design.heatGain} BTU` : 'N/A'}</TableCell>
      <TableCell>{design.coolingLoad ? `${design.coolingLoad} kWh` : 'N/A'}</TableCell>
      <TableCell>{design.energyConsumed ? `${design.energyConsumed} kWh` : 'N/A'}</TableCell>
      <TableCell>{design.coolingCost ? `₹${design.coolingCost}` : 'N/A'}</TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CompareDesigns;
