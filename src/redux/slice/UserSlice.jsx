import { createSlice } from '@reduxjs/toolkit'
import { getUser, logOutUser } from '../reducers/UserThunks';

const userSlice = createSlice({
    initialState: {
        user: null,
        loading: true,
        error: null,
        rankData: {
            data:null,
            loading: true,
        }
    },
    name: 'user',
    reducers: {
        setError(state, action) {
            state.error = action.payload || null
        },
        setRankData(state, action){
            state.rankData.data = action.payload || null;
            state.rankData.loading = false

        },
        setLoading(state, action) {
            state.loading = action.payload || false
        },
        loginRequest(state, action) {
            state.loading = true
            state.error = null
        },
        loginSuccess(state, action) {
            state.loading = false
            state.user = action.payload
        },
        loginFailed(state, action) {
            state.loading = false
            state.error = action.payload
        },
        logoutUser(state) {
            state.user = null,
            state.loading = false
        }
    },
    extraReducers: b => {
        b.addCase(getUser.pending , (state)=>{
            state.loading = true;
        })
        b.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        }).addCase(getUser.rejected, (state, action) => {
            state.loading = false

        })
        b.addCase(logOutUser.fulfilled , (state)=>{
            state.user = null
        })
    }
})

export const { loginSuccess , setRankData, logoutUser, loginFailed, setLoading, setError, loginRequest } = userSlice.actions
export default userSlice.reducer
