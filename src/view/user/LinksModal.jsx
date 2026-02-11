import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function LinksModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    codingProfile: user?.codingProfile || '',
    resume: user?.resume || '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving professional links:', formData);
    // Add your save logic here
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
          Professional Links
        </Typography>

        <TextField
          fullWidth
          label="GitHub Profile URL"
          value={formData.github}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="https://github.com/username"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="LinkedIn Profile URL"
          value={formData.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/username"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Coding Profile URL"
          value={formData.codingProfile}
          onChange={(e) => handleChange('codingProfile', e.target.value)}
          placeholder="https://leetcode.com/username"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Resume URL"
          value={formData.resume}
          onChange={(e) => handleChange('resume', e.target.value)}
          placeholder="https://drive.google.com/..."
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

