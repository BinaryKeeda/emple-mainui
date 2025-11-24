import React, { useState, useEffect } from 'react';
import TestAttemptPage from './TestAttemptPage';
import { useSelector } from 'react-redux';
import { TestProvider } from './context/TestProvider';
import { OutputWindowProvider } from './context/TestOutputContext';
import { Modal, Box, Typography } from '@mui/material';

export default function TestAttempt({ id }) {
  const { user } = useSelector(s => s.auth);

  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    setIsPC(!mobileRegex.test(navigator.userAgent));
  }, []);

  // Popup styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  if (!isPC) {
    return (
      <Modal open={!isPC}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Open on PC Required
          </Typography>
          <Typography variant="body1">
            This test can only be attempted on a PC or laptop.  
            Please open this link from a desktop device.
          </Typography>
        </Box>
      </Modal>
    );
  }

  // Render test normally if PC
  return (
    <TestProvider userId={user._id} testId={id}>
      <OutputWindowProvider>
        <TestAttemptPage />
      </OutputWindowProvider>
    </TestProvider>
  );
}
