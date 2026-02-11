import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, Button, Box, Typography, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function AccountSettingsModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    profileVisibility: 'public',
    twoFactorAuth: false,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving account settings:', formData);
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
          Account Settings
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={formData.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              color="warning"
            />
          }
          label="Email Notifications"
          sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', ml: 0 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Profile Visibility</InputLabel>
          <Select
            value={formData.profileVisibility}
            onChange={(e) => handleChange('profileVisibility', e.target.value)}
            label="Profile Visibility"
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="friends">Friends Only</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={formData.twoFactorAuth}
              onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
              color="warning"
            />
          }
          label="Two-Factor Authentication"
          sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', ml: 0 }}
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