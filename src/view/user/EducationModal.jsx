import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function EducationModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    university: user?.university || '',
    program: user?.program || '',
    semester: user?.semester || '',
    specialisation: user?.specialisation || '',
    cgpa: user?.cgpa || '',
    marks10th: user?.marks10th || '',
    marks12th: user?.marks12th || '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving education details:', formData);
    // Add your save logic here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ backgroundColor: '#E65100', height: '60px', position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16, color: 'white' }}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 3, px: 4, pb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Education Details
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="University"
            value={formData.university}
            onChange={(e) => handleChange('university', e.target.value)}
          />

          <TextField
            fullWidth
            label="Program"
            value={formData.program}
            onChange={(e) => handleChange('program', e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select
              value={formData.semester}
              onChange={(e) => handleChange('semester', e.target.value)}
              label="Semester"
            >
              <MenuItem value="1">1st Semester</MenuItem>
              <MenuItem value="2">2nd Semester</MenuItem>
              <MenuItem value="3">3rd Semester</MenuItem>
              <MenuItem value="4">4th Semester</MenuItem>
              <MenuItem value="5">5th Semester</MenuItem>
              <MenuItem value="6">6th Semester</MenuItem>
              <MenuItem value="7">7th Semester</MenuItem>
              <MenuItem value="8">8th Semester</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Specialisation"
            value={formData.specialisation}
            onChange={(e) => handleChange('specialisation', e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="CGPA"
            type="number"
            value={formData.cgpa}
            onChange={(e) => handleChange('cgpa', e.target.value)}
          />

          <TextField
            fullWidth
            label="10th Marks (%)"
            type="number"
            value={formData.marks10th}
            onChange={(e) => handleChange('marks10th', e.target.value)}
          />

          <TextField
            fullWidth
            label="12th Marks (%)"
            type="number"
            value={formData.marks12th}
            onChange={(e) => handleChange('marks12th', e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="text" onClick={onClose} sx={{ color: '#666' }}>
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: '#E65100', '&:hover': { backgroundColor: '#D84315' } }}
          >
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}