import { createSlice } from "@reduxjs/toolkit"


const locationSlice = createSlice({
  name: 'path',
  initialState: {
    location: null
  },
  reducers: {
    setLocation (state, action) {
      state.location = action.payload
    }
  }
})

export default locationSlice.reducer;
export const {setLocation} = locationSlice.actions;