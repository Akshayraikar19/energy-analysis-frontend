import { useEffect, useState } from 'react';
import { getCityRankings } from '../services/api';
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

const CityRankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await getCityRankings();
        setRankings(response.data);
      } catch (err) {
        setError('Failed to fetch city rankings.');
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>City Performance Rankings</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Rank</strong></TableCell>
                <TableCell><strong>City</strong></TableCell>
                <TableCell><strong>Score</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.map((city, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{city.city}</TableCell>
                  <TableCell>{city.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CityRankings;
