import { useEffect, useState } from 'react';
import { getDesigns, deleteDesign, updateDesign } from '../services/api';
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress
} from '@mui/material';

const DesignList = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState({ _id: '', name: '', city: '' });

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const response = await getDesigns();
      setDesigns(response.data);
    } catch (err) {
      setError('Failed to fetch designs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDesign(id);
    fetchDesigns();
  };

  const handleEdit = (design) => {
    setCurrentDesign(design);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDesign({ _id: '', name: '', city: '' });
  };

  const handleUpdate = async () => {
    await updateDesign(currentDesign._id, { name: currentDesign.name, city: currentDesign.city });
    fetchDesigns();
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Design List</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>City</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designs.map((design) => (
                <TableRow key={design._id}>
                  <TableCell>{design.name}</TableCell>
                  <TableCell>{design.city}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(design)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(design._id)} color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Design</DialogTitle>
        <DialogContent>
          <TextField 
            label="Name" 
            fullWidth 
            value={currentDesign.name} 
            onChange={(e) => setCurrentDesign({ ...currentDesign, name: e.target.value })} 
            margin="dense"
          />
          <TextField 
            label="City" 
            fullWidth 
            value={currentDesign.city} 
            onChange={(e) => setCurrentDesign({ ...currentDesign, city: e.target.value })} 
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DesignList;
