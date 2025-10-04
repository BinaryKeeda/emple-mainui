import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../lib/config';
import ReactJson from 'react-json-view';
import Editor from '@monaco-editor/react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

const languageDefaults = [
  {
    language: 'c',
    signature: `int function_name(int arg1, int arg2) {
  // Your code here
  return 0;
}`
  },
  {
    language: 'cpp',
    signature: `int function_name(int arg1, int arg2) {
  // Your code here
  return 0;
}`
  },
  {
    language: 'java',
    signature: `public int functionName(int arg1, int arg2) {
  // Your code here
  return 0;
}`
  },
  {
    language: 'python',
    signature: `def function_name(arg1: int, arg2: int) -> int:
    # Your code here
    return 0`
  }
];

const initialForm = {
  title: '',
  description: '',
  difficulty: 'Easy',
  constraints: [''],
  topics: [''],
  hints: [''],
  examples: [{ input: '', output: '', explanation: '' }],
  functionSignature: languageDefaults,
  testCases: [{ input: '', output: '', explanation: '' }],
  performanceStats: {
    bestTime: '',
    bestMemory: '',
    averageTime: '',
    averageMemory: '',
  },
  tags: [''],
  visibility: 'public',
};

const AddProblem = () => {
  const [form, setForm] = useState(initialForm);
  const [editMode, setEditMode] = useState(false);
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState('');

  useEffect(() => {
    if (editMode) {
      axios
        .get(`${BASE_URL}/api/v2/test/problems/get`, { withCredentials: true })
        .then(res => setProblems(res.data))
        .catch(() => toast.error('Failed to load problems'));
    }
  }, [editMode]);

  useEffect(() => {
    if (editMode && selectedProblemId) {
      const selected = problems.find(p => p._id === selectedProblemId);
      if (selected) setForm(selected);
    } else if (!selectedProblemId) {
      setForm(initialForm);
    }
  }, [selectedProblemId, problems, editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleJsonEdit = (field, updatedSrc) => {
    setForm(prev => ({ ...prev, [field]: updatedSrc }));
  };

  const handleProblemSelect = (e) => setSelectedProblemId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedProblemId) {
        await axios.post(`${BASE_URL}/api/v2/test/problem/update/${selectedProblemId}`, form , {
            withCredentials:true
        });
        toast.success('Problem updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/v2/test/problem/add`, form , {
            withCredentials:true
        });
        toast.success('Problem created successfully');
        setForm(initialForm);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{editMode ? 'Edit Problem' : 'Create Problem'}</h2>
        <FormControlLabel
          control={<Switch checked={editMode} onChange={() => setEditMode(!editMode)} />}
          label="Edit Mode"
        />
      </div>

      {editMode && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="problem-select-label">Select Problem</InputLabel>
          <Select
            labelId="problem-select-label"
            value={selectedProblemId}
            label="Select Problem"
            onChange={handleProblemSelect}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {problems.map(problem => (
              <MenuItem key={problem._id} value={problem._id}>
                {problem.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2 h-32" required />
        </div>

        <div>
          <label className="block font-medium">Difficulty</label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border rounded p-2">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Visibility</label>
          <select name="visibility" value={form.visibility} onChange={handleChange} className="w-full border rounded p-2">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Function Signatures */}
        <div>
          <label className="block font-medium">Function Signatures</label>
          {form.functionSignature.map((sig, index) => (
            <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
              <label className="block font-medium mb-1 capitalize">{sig.language}</label>
              <Editor
                height="120px"
                defaultLanguage={sig.language === 'cpp' ? 'cpp' : sig.language}
                value={sig.signature}
                onChange={(value) => {
                  const updated = [...form.functionSignature];
                  updated[index].signature = value;
                  setForm(prev => ({ ...prev, functionSignature: updated }));
                }}
                theme="vs-light"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                }}
              />
            </div>
          ))}
        </div>

        {/* JSON Editors */}
        {['examples', 'testCases', 'hints', 'constraints' ,'topics'].map(field => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <ReactJson
              src={form[field]}
              onEdit={e => handleJsonEdit(field, e.updated_src)}
              onAdd={e => handleJsonEdit(field, e.updated_src)}
              onDelete={e => handleJsonEdit(field, e.updated_src)}
              displayDataTypes={false}
              collapsed={false}
              name={null}
              theme="rjv-default"
            />
          </div>
        ))}

        <Button type="submit" variant="contained" color="primary">
          {editMode ? 'Update Problem' : 'Create Problem'}
        </Button>
      </form>
    </div>
  );
};

export default AddProblem;
