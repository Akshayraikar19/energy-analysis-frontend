import { useState } from 'react';
import { calculateHeatGain } from '../services/api';
import { TextField, Button, Typography, Container } from '@mui/material';

const HeatGainCalculator = () => {
  const [form, setForm] = useState({ height: '', width: '', WWR: '', SHGC: '', city: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await calculateHeatGain({
      dimensions: { height: Number(form.height), width: Number(form.width) },
      WWR: Number(form.WWR),
      SHGC: Number(form.SHGC),
      city: form.city,
    });
    setResult(response.data.heatGain);
  };

  return (
    <Container>
      <Typography variant="h4">Heat Gain Calculator</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="height" label="Height" type="number" onChange={handleChange} value={form.height} fullWidth required />
        <TextField name="width" label="Width" type="number" onChange={handleChange} value={form.width} fullWidth required />
        <TextField name="WWR" label="WWR" type="number" onChange={handleChange} value={form.WWR} fullWidth required />
        <TextField name="SHGC" label="SHGC" type="number" onChange={handleChange} value={form.SHGC} fullWidth required />
        <TextField name="city" label="City" onChange={handleChange} value={form.city} fullWidth required />
        <Button type="submit" variant="contained">Calculate</Button>
      </form>
      {result !== null && <Typography>Heat Gain: {result} BTU</Typography>}
    </Container>
  );
};

export default HeatGainCalculator;
