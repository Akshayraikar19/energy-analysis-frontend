import { useState } from 'react';
import { createDesign } from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';

const DesignForm = () => {
  const [form, setForm] = useState({ name: '', city: '', WWR: '', SHGC: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDesign(form);
    setForm({ name: '', city: '', WWR: '', SHGC: '' });
  };

  return (
    <Container>
      <Typography variant="h4">Add Building Design</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Design Name" onChange={handleChange} value={form.name} fullWidth required />
        <TextField name="city" label="City" onChange={handleChange} value={form.city} fullWidth required />
        <TextField name="WWR" label="WWR" type="number" onChange={handleChange} value={form.WWR} fullWidth required />
        <TextField name="SHGC" label="SHGC" type="number" onChange={handleChange} value={form.SHGC} fullWidth required />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Container>
  );
};

export default DesignForm;
