import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDesign } from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DesignForm = () => {
  const [form, setForm] = useState({
    name: '',
    city: '',
    WWR: '',
    SHGC: '',
    dimensions: { height: '', width: '' }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 🔹 Validate Inputs
  const validateField = (name, value) => {
    let errorMsg = '';

    if (['WWR', 'SHGC', 'height', 'width'].includes(name)) {
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

    if (name === 'height' || name === 'width') {
      setForm((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [name]: value }
      }));
      validateField(name, value);
    } else {
      setForm({ ...form, [name]: value });
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validate all fields before submission
    const isValid = Object.keys(form).every((key) => {
      if (key === 'dimensions') {
        return validateField('height', form.dimensions.height) && validateField('width', form.dimensions.width);
      }
      return validateField(key, form[key]);
    });

    if (!isValid) {
      toast.error('Please fix validation errors!');
      return;
    }

    setIsSubmitting(true);

    const formattedForm = {
      ...form,
      WWR: parseFloat(form.WWR),
      SHGC: parseFloat(form.SHGC),
      dimensions: {
        height: parseFloat(form.dimensions.height),
        width: parseFloat(form.dimensions.width)
      }
    };

    try {
      await createDesign(formattedForm);
      toast.success('Design successfully created!');
      setForm({ name: '', city: '', WWR: '', SHGC: '', dimensions: { height: '', width: '' } });
      setErrors({}); // Clear errors on successful submission

      setTimeout(() => navigate('/heat-gain-calculator'), 1500);
    } catch (error) {
      toast.error('Failed to create design');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add Building Design</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField name="name" label="Design Name" onChange={handleChange} value={form.name} fullWidth
          error={!!errors.name} helperText={errors.name} />

        <TextField name="city" label="City" onChange={handleChange} value={form.city} fullWidth
          error={!!errors.city} helperText={errors.city} />

        <TextField name="WWR" label="WWR (%)" type="number" onChange={handleChange} value={form.WWR} fullWidth
          error={!!errors.WWR} helperText={errors.WWR} />

        <TextField name="SHGC" label="SHGC" type="number" step="0.01" onChange={handleChange} value={form.SHGC} fullWidth
          error={!!errors.SHGC} helperText={errors.SHGC} />

        <TextField name="height" label="Height (m)" type="number" onChange={handleChange} value={form.dimensions.height} fullWidth
          error={!!errors.height} helperText={errors.height} />

        <TextField name="width" label="Width (m)" type="number" onChange={handleChange} value={form.dimensions.width} fullWidth
          error={!!errors.width} helperText={errors.width} />

        <Button type="submit" variant="contained" disabled={isSubmitting}>Submit</Button>
      </form>
    </Container>
  );
};

export default DesignForm;
