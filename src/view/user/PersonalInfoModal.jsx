
import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function PersonalInfoModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    dob: user?.dob || '',
    contact: user?.contact || '',
    address: user?.address || '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving personal info:', formData);
    // Add your save logic here (API call, Redux dispatch, etc.)
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ backgroundColor: '#E65100', height: '60px', position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16, color: 'white' }}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 3, px: 4, pb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Personal Information
        </Typography>

        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={(e) => handleChange('dob', e.target.value)}
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Contact Number"
          value={formData.contact}
          onChange={(e) => handleChange('contact', e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Address"
          multiline
          rows={3}
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          sx={{ mb: 3 }}
        />

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