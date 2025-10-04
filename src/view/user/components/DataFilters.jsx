import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

const TableFilters = ({ filters, setFilters, type }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
      <TextField 
        name="search"
        value={filters.search}
        onChange={handleChange}
        label={`Search ${type} by title`}
        variant="outlined"
        size="small"
        sx={{ width: 200 }}
      />

      {(type === 'solutions/quiz' || type === 'problems') && (
        <TextField
          name="difficulty"
          onChange={handleChange}
          value={filters.difficulty}
          label="Difficulty"
          variant="outlined"
          size="small"
          sx={{ width: 150 }}
          select
        >
          <MenuItem value="">All Difficulty</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
      )}

      {/* You can uncomment and modify the below fields as needed */}

     <TextField
        name="category"
        onChange={handleChange}
        value={filters.category}
        label="Category"
        variant="outlined"
        size="small"
        sx={{ width: 150 }}
        select
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Aptitude">Aptitude</MenuItem>
        <MenuItem value="Core">Core</MenuItem>
        <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
      </TextField> 

      {/* <TextField
        name="isAvailable"
        onChange={handleChange}
        value={filters.isAvailable}
        label="Availability"
        variant="outlined"
        size="small"
        sx={{ width: 150 }}
        select
      >
        <MenuItem value="">Availability</MenuItem>
        <MenuItem value="true">Available</MenuItem>
        <MenuItem value="false">Unavailable</MenuItem>
      </TextField>  */}
    </Box>
  );
};

export default TableFilters;
