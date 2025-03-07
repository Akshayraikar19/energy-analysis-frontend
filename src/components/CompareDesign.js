import { useEffect, useState } from 'react';
import { compareDesigns } from '../services/api';
import { Container, Typography } from '@mui/material';

const CompareDesigns = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    async function fetchComparison() {
      const response = await compareDesigns();
      setDesigns(response.data);
    }
    fetchComparison();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Design Comparisons</Typography>
      <pre>{JSON.stringify(designs, null, 2)}</pre>
    </Container>
  );
};

export default CompareDesigns;