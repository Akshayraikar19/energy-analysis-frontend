import { useEffect, useState } from 'react';
import { getDesigns, deleteDesign, updateDesign } from '../services/api';
import { Button, List, ListItem, Container, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DesignList = () => {
  const [designs, setDesigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState({ _id: '', name: '', city: '' });

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    const response = await getDesigns();
    setDesigns(response.data);
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
      <Typography variant="h4">Design List</Typography>
      <List>
        {designs.map((design) => (
          <ListItem key={design._id}>
            {design.name} - {design.city}
            <Button onClick={() => handleEdit(design)} color="primary">Edit</Button>
            <Button onClick={() => handleDelete(design._id)} color="error">Delete</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Design</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth value={currentDesign.name} onChange={(e) => setCurrentDesign({ ...currentDesign, name: e.target.value })} />
          <TextField label="City" fullWidth value={currentDesign.city} onChange={(e) => setCurrentDesign({ ...currentDesign, city: e.target.value })} />
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
