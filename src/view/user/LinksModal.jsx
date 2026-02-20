// import React, { useState } from 'react';
// import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography } from '@mui/material';
// import { Close } from '@mui/icons-material';

// export default function LinksModal({ open, onClose, user }) {
//   const [formData, setFormData] = useState({
//     github: user?.github || '',
//     linkedin: user?.linkedin || '',
//     codingProfile: user?.codingProfile || '',
//     resume: user?.resume || '',
//   });

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleSave = () => {
//     console.log('Saving professional links:', formData);
//     // Add your save logic here
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <Box sx={{ backgroundColor: '#E65100', height: '60px', position: 'relative' }}>
//         <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16, color: 'white' }}>
//           <Close />
//         </IconButton>
//       </Box>

//       <DialogContent sx={{ pt: 3, px: 4, pb: 4 }}>
//         <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//           Professional Links
//         </Typography>

//         <TextField
//           fullWidth
//           label="GitHub Profile URL"
//           value={formData.github}
//           onChange={(e) => handleChange('github', e.target.value)}
//           placeholder="https://github.com/username"
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           fullWidth
//           label="LinkedIn Profile URL"
//           value={formData.linkedin}
//           onChange={(e) => handleChange('linkedin', e.target.value)}
//           placeholder="https://linkedin.com/in/username"
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           fullWidth
//           label="Coding Profile URL"
//           value={formData.codingProfile}
//           onChange={(e) => handleChange('codingProfile', e.target.value)}
//           placeholder="https://leetcode.com/username"
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           fullWidth
//           label="Resume URL"
//           value={formData.resume}
//           onChange={(e) => handleChange('resume', e.target.value)}
//           placeholder="https://drive.google.com/..."
//           sx={{ mb: 3 }}
//         />

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//           <Button variant="text" onClick={onClose} sx={{ color: '#666' }}>
//             Discard
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSave}
//             sx={{ backgroundColor: '#E65100', '&:hover': { backgroundColor: '#D84315' } }}
//           >
//             Save Changes
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }



import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography } from '@mui/material';
import { Close, UploadFile } from '@mui/icons-material';

export default function LinksModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    codingProfile: user?.codingProfile || '',
    resume: user?.resume || '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(user?.resume ? 'Resume uploaded' : '');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleSave = () => {
    console.log('Saving professional links:', formData);
    console.log('Resume file:', resumeFile);
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

        {/* Resume Upload */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
            Resume
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              sx={{
                borderColor: '#E65100',
                color: '#E65100',
                '&:hover': {
                  borderColor: '#D84315',
                  backgroundColor: 'rgba(230, 81, 0, 0.04)'
                },
                textTransform: 'none',
                px: 3,
                py: 1.2
              }}
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />
            </Button>
            {resumeFileName && (
              <Typography
                variant="body2"
                sx={{
                  color: '#4caf50',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                ✓ {resumeFileName}
              </Typography>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#999', mt: 0.5, display: 'block' }}>
            Accepted formats: PDF, DOC, DOCX
          </Typography>
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