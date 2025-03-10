import { useState } from 'react';
import { calculateHeatGain } from '../services/api';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeatGainCalculator = () => {
  const [form, setForm] = useState({ height: '', width: '', WWR: '', SHGC: '', city: '', costPerKWh: 8 });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validateField = (name, value) => {
    let errorMsg = '';

    if (['height', 'width', 'WWR', 'SHGC', 'costPerKWh'].includes(name)) {
      if (!value) {
        errorMsg = `${name.toUpperCase()} is required`;
      } else if (isNaN(value) || parseFloat(value) <= 0) {
        errorMsg = `${name.toUpperCase()} must be a number greater than 0`;
      }
    } else if (!value.trim()) {
      errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields
    const isValid = Object.keys(form).every((key) => validateField(key, form[key]));
  
    if (!isValid) {
      toast.error('Please fix validation errors!');
      return;
    }
  
    try {
      const response = await calculateHeatGain({
        dimensions: { height: Number(form.height), width: Number(form.width) },
        WWR: Number(form.WWR),
        SHGC: Number(form.SHGC),
        city: form.city,
        costPerKWh: Number(form.costPerKWh),
      });
  
      if (response?.data) {
        setResult({
          heatGain: Number(response.data.heatGain),
          coolingLoad: Number(response.data.coolingLoad),
          energyConsumed: Number(response.data.energyConsumed),
          coolingCost: Number(response.data.coolingCost),
        });
        toast.success('Calculation successful!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      toast.error('Failed to calculate heat gain');
    }
  };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Heat Gain & Cooling Cost Estimator</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField name="height" label="Height (m)" type="number" onChange={handleChange} value={form.height} fullWidth
          error={!!errors.height} helperText={errors.height} />

        <TextField name="width" label="Width (m)" type="number" onChange={handleChange} value={form.width} fullWidth
          error={!!errors.width} helperText={errors.width} />

        <TextField name="WWR" label="WWR (%)" type="number" onChange={handleChange} value={form.WWR} fullWidth
          error={!!errors.WWR} helperText={errors.WWR} />

        <TextField name="SHGC" label="SHGC" type="number" step="0.01" onChange={handleChange} value={form.SHGC} fullWidth
          error={!!errors.SHGC} helperText={errors.SHGC} />

        <TextField name="city" label="City" onChange={handleChange} value={form.city} fullWidth
          error={!!errors.city} helperText={errors.city} />

        <TextField name="costPerKWh" label="Electricity Cost (₹/kWh)" type="number" step="0.01" onChange={handleChange}
          value={form.costPerKWh} fullWidth error={!!errors.costPerKWh} helperText={errors.costPerKWh} />

        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
          Calculate
        </Button>
      </form>

      {result !== null && (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
          <Typography variant="h5" color="primary">Calculated Results:</Typography>
          <Typography variant="h6">Heat Gain: <strong>{result.heatGain.toLocaleString()} BTU</strong></Typography>
          <Typography variant="h6">Cooling Load: <strong>{result.coolingLoad.toFixed(2)} kWh</strong></Typography>
          <Typography variant="h6">Energy Consumed: <strong>{result.energyConsumed.toFixed(2)} kWh</strong></Typography>
          <Typography variant="h5" color="secondary">Estimated Cooling Cost: <strong>₹{result.coolingCost.toFixed(2)}</strong></Typography>
        </Paper>
      )}
    </Container>
  );
};

export default HeatGainCalculator;
