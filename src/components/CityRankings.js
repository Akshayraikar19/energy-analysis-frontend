import { useEffect, useState } from 'react';
import { getCityRankings } from '../services/api';
import { Container, Typography, List, ListItem } from '@mui/material';

const CityRankings = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    async function fetchRankings() {
      const response = await getCityRankings();
      setRankings(response.data);
    }
    fetchRankings();
  }, []);

  return (
    <Container>
      <Typography variant="h4">City Performance Rankings</Typography>
      <List>
        {rankings.map((city, index) => (
          <ListItem key={index}>{city.city}: {city.score}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CityRankings;
