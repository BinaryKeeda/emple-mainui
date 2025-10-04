import React from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@mui/material';

function LinearProgressWithLabel({ value }) {
  const getColor = () => {
    if (value < 40) return 'error'; // red
    if (value < 70) return 'warning'; // orange
    return 'success'; // default blue
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={value}
          // color={getColor()}
          aria-valuenow={value || 0}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Box>
      <Box minWidth={50}>
        <p className='text-nowrap text-xs'>
          {`${Math.round(value)} marks`}
        </p>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
