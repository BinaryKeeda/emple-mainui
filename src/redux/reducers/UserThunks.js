import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { BASE_URL } from "../../lib/config";
export const getUser = createAsyncThunk('api/getuser', async (token, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true
        });
        const data = await response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const logOutUser = createAsyncThunk('api/logout', async (token, thunkAPI) => {
    try {
    
        const response = await axios.get(`${BASE_URL}/auth/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data.message);
    }

})