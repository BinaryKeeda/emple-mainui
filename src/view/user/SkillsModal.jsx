import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography, Chip } from '@mui/material';
import { Close, Add } from '@mui/icons-material';

export default function SkillsModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    skills: user?.skills || [],
    projectsLink: user?.projectsLink || '',
  });
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToDelete)
    });
  };

  const handleSave = () => {
    console.log('Saving skills & projects:', formData);
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
          Skills & Projects
        </Typography>

        <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Add a skill (e.g., React, Python)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddSkill}
            sx={{ backgroundColor: '#E65100', '&:hover': { backgroundColor: '#D84315' } }}
          >
            <Add />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, minHeight: 50 }}>
          {formData.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              sx={{ backgroundColor: '#FFF3E0', color: '#E65100' }}
            />
          ))}
        </Box>

        <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
          Projects Link
        </Typography>
        <TextField
          fullWidth
          placeholder="https://github.com/username/projects"
          value={formData.projectsLink}
          onChange={(e) => setFormData({ ...formData, projectsLink: e.target.value })}
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