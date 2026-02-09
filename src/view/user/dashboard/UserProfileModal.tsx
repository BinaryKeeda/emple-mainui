import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import { Close, Edit } from '@mui/icons-material'

interface UserProfileModalProps {
  open: boolean
  onClose: () => void
  user: any
}

export default function UserProfileModal({ open, onClose, user }: UserProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    program: user?.program || '',
    specialisation: user?.specialisation || '',
    semester: user?.semester || '',
    graduationYear: user?.graduationYear || '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSaveChanges = () => {
    console.log('Saving changes:', formData)
    onClose()
  }

  const handleDiscard = () => {
    onClose()
  }

  // Program options
  const programOptions = [
    "Bachelor of Computer Applications (BCA)",
    "B.Sc in Information Technology",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Commerce (B.Com)",
    "Bachelor of Economics (B.Econ)",
    "Bachelor of Arts (BA) in English Literature",
    "BA in History",
    "B.Tech in Computer Science Engineering",
    "B.Tech in Mechanical Engineering",
    "B.Tech in Electrical Engineering",
    "B.Tech in Civil Engineering",
    "B.Tech in Electronics and Communication",
    "B.Tech in Information Technology",
    "Master of Computer Applications (MCA)",
    "M.Tech in Computer Science",
    "MBA (Master of Business Administration)",
    "M.Sc in Data Science",
    "M.Com (Master of Commerce)",
    "MA in English",
    "MA in Economics",
  ]

  // Specialisation options
  const specialisationOptions = [
    "Artificial Intelligence & Machine Learning",
    "Data Science",
    "Cyber Security",
    "Cloud Computing",
    "Full Stack Development",
    "Mobile App Development",
    "Blockchain Technology",
    "Internet of Things (IoT)",
    "DevOps",
    "Digital Marketing",
    "Finance & Accounting",
    "Human Resource Management",
    "Marketing Management",
    "Operations Management",
    "Not Applicable",
  ]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '95vh',
        },
      }}
    >
      {/* Orange Header */}
      <Box
        sx={{
          backgroundColor: '#E65100',
          height: '60px',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 0, px: 4, pb: 4, overflowY: 'auto' }}>
        {/* Avatar Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: -6,
            mb: 3,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                boxShadow: 3,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#E65100',
                color: 'white',
                width: 35,
                height: 35,
                '&:hover': {
                  backgroundColor: '#D84315',
                },
              }}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Name Field */}
        <TextField
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              fontSize: '18px',
              fontWeight: 600,
            },
          }}
        />

        {/* Email (Read-only) */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
          <Box
            component="span"
            sx={{
              color: '#E65100',
              fontSize: '18px',
            }}
          >
            ✉
          </Box>
          <Typography sx={{ color: '#666' }}>{formData.email}</Typography>
        </Box>

        {/* University & Program Row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          {/* University */}
          <Box>
            <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
              University <span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for your university"
              value={formData.university}
              onChange={(e) => handleChange('university', e.target.value)}
            />
          </Box>

          {/* Program */}
          <Box>
            <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
              Program <span style={{ color: 'red' }}>*</span>
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.program}
                onChange={(e) => handleChange('program', e.target.value)}
                displayEmpty
                    MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 300,  // Dropdown height limit
          },
        },
      }}
      sx={{
        '& .MuiMenuItem-root': {
          fontSize: '13px',  // Menu item font size
        },
      }}
              >
                <MenuItem value="" disabled>
                  Select your program
                </MenuItem>
                {programOptions.map((program) => (
                  <MenuItem key={program} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Specialisation & Semester Row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          {/* Specialisation */}
          <Box>
            <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
              Specialisation <span style={{ color: 'red' }}>*</span>
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.specialisation}
                onChange={(e) => handleChange('specialisation', e.target.value)}
                displayEmpty
                MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 300,  // Dropdown height limit
          },
        },
      }}
      sx={{
        '& .MuiMenuItem-root': {
          fontSize: '13px',  // Menu item font size
        },
      }}
              >
                <MenuItem value="" disabled>
                  Select your specialisation
                </MenuItem>
                {specialisationOptions.map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Semester */}
          <Box>
            <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
              Semester
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select your semester
                </MenuItem>
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
          </Box>
        </Box>

        {/* Graduation Year */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', fontWeight: 500 }}>
            Graduation Year <span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.graduationYear}
              onChange={(e) => handleChange('graduationYear', e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select graduation year
              </MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
              <MenuItem value="2028">2028</MenuItem>
              <MenuItem value="2029">2029</MenuItem>
              <MenuItem value="2030">2030</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="text"
            onClick={handleDiscard}
            sx={{
              color: '#666',
              textTransform: 'none',
              fontSize: '16px',
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            sx={{
              backgroundColor: '#E65100',
              textTransform: 'none',
              fontSize: '16px',
              px: 4,
              '&:hover': {
                backgroundColor: '#D84315',
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}