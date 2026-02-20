// import React, { useState } from 'react';
// import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography, Chip } from '@mui/material';
// import { Close, Add } from '@mui/icons-material';

// export default function SkillsModal({ open, onClose, user }) {
//   const [formData, setFormData] = useState({
//     skills: user?.skills || [],
//     projectsLink: user?.projectsLink || '',
//   });
//   const [skillInput, setSkillInput] = useState('');

//   const handleAddSkill = () => {
//     if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, skillInput.trim()]
//       });
//       setSkillInput('');
//     }
//   };

//   const handleDeleteSkill = (skillToDelete) => {
//     setFormData({
//       ...formData,
//       skills: formData.skills.filter(skill => skill !== skillToDelete)
//     });
//   };

//   const handleSave = () => {
//     console.log('Saving skills & projects:', formData);
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
//           Skills & Projects
//         </Typography>

//         <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
//           Skills
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//           <TextField
//             fullWidth
//             placeholder="Add a skill (e.g., React, Python)"
//             value={skillInput}
//             onChange={(e) => setSkillInput(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleAddSkill();
//               }
//             }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleAddSkill}
//             sx={{ backgroundColor: '#E65100', '&:hover': { backgroundColor: '#D84315' } }}
//           >
//             <Add />
//           </Button>
//         </Box>

//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, minHeight: 50 }}>
//           {formData.skills.map((skill, index) => (
//             <Chip
//               key={index}
//               label={skill}
//               onDelete={() => handleDeleteSkill(skill)}
//               sx={{ backgroundColor: '#FFF3E0', color: '#E65100' }}
//             />
//           ))}
//         </Box>

//         <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
//           Projects Link
//         </Typography>
//         <TextField
//           fullWidth
//           placeholder="https://github.com/username/projects"
//           value={formData.projectsLink}
//           onChange={(e) => setFormData({ ...formData, projectsLink: e.target.value })}
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
import { Dialog, DialogContent, IconButton, TextField, Button, Box, Typography, Chip } from '@mui/material';
import { Close, Add } from '@mui/icons-material';

// GitHub Icon SVG
const GitHubIcon = () => (
  <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

export default function SkillsModal({ open, onClose, user }) {
  const [formData, setFormData] = useState({
    skills: user?.skills || [],
    projectsLink: user?.projectsLink || '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [githubConnected, setGithubConnected] = useState(!!user?.github);

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

  const handleConnectGitHub = () => {
    // GitHub OAuth redirect
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=repo,user`;
  };

  const handleSave = () => {
    console.log('Saving skills & projects:', formData);
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

        {/* Connect GitHub Button */}
        <Box sx={{ mb: 3, p: 2, border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#f9fafb' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ color: '#24292e' }}>
                <GitHubIcon />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#24292e' }}>
                  {githubConnected ? `Connected: ${user?.github || 'GitHub'}` : 'Connect GitHub'}
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>
                  {githubConnected ? 'Your GitHub is connected' : 'View your projects & repositories'}
                </Typography>
              </Box>
            </Box>
            <Button
              variant={githubConnected ? 'outlined' : 'contained'}
              onClick={githubConnected ? () => setGithubConnected(false) : handleConnectGitHub}
              startIcon={<GitHubIcon />}
              sx={githubConnected ? {
                borderColor: '#e5e7eb',
                color: '#ef4444',
                textTransform: 'none',
                fontSize: '13px',
                '&:hover': { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.04)' }
              } : {
                backgroundColor: '#24292e',
                color: 'white',
                textTransform: 'none',
                fontSize: '13px',
                '&:hover': { backgroundColor: '#1a1f24' }
              }}
            >
              {githubConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </Box>

          {/* Show GitHub profile link if connected */}
          {githubConnected && user?.github && (
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #e5e7eb' }}>
              <Typography
                component="a"
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontSize: '13px', color: '#E65100', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                🔗 {user.github}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Skills */}
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
              if (e.key === 'Enter') handleAddSkill();
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

        {/* Projects Link */}
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