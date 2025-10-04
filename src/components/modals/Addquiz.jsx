import { Add, Close } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

export default function Addquiz({ setModalClose, isHidden }) {
  const user = useSelector((state) => state.auth.user);
  
  const [disable,setDisable] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    creator: user._id,
    duration: '',
    questions: [],
    marks: '',
    category: '',
    difficulty: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'marks' || name === 'duration' ? parseInt(value) : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisable(true);

    // Basic validation
    const { title, marks, duration, category, difficulty } = formData;
    if (!title || !marks || !duration || !category || !difficulty) {
    //   toast.error('Please fill in all required fields!');
      return;
    }
    if (marks <= 0 || duration <= 0) {
    //   toast.error('Marks and duration must be positive numbers.');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/quiz/add/`, formData);
    //   toast.success('Quiz added successfully!');
      setModalClose(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add quiz. Please try again.');
    }
  };

  return (
    <div className="h-screen w-screen bg-opacity-25 px-4 sm:px-36 py-10 sm:py-24 bg-black fixed top-0 left-0 ">
      <div
        className='rounded-md h-full w-full bg-white transition-all ease-linear duration-300'
      >
        <div className="flex justify-end p-2">
          <IconButton
            onClick={() => setModalClose(false)}
            aria-label="Close Modal"
          >
            <Close />
          </IconButton>
        </div>
        <form onSubmit={submitHandler} className="px-5">
          <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <TextField
              required
              variant="standard"
              label="Creator"
              disabled
              value={user._id}
            />
            <TextField
              required
              variant="standard"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              label="Quiz Title"
            />
            <TextField
              required
              variant="standard"
              type="number"
              name="marks"
              value={formData.marks}
              onChange={changeHandler}
              label="Quiz Marks"
            />
            <TextField
              required
              variant="standard"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={changeHandler}
              label="Quiz Duration (in minutes)"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                variant="standard"
                name="category"
                value={formData.category}
                onChange={changeHandler}
              >
                <MenuItem value="Aptitude">Aptitude</MenuItem>
                <MenuItem value="Core">Core</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                variant="standard"
                name="difficulty"
                value={formData.difficulty}
                onChange={changeHandler}
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            type="submit"
            disabled={disable}
            variant="contained"
            color="primary"
            sx={{ color: '#f1f1f1', fontWeight: 'bold' }}
          >
            Add Quiz <Add />
          </Button>
        </form>
      </div>
    </div>
  );
}
