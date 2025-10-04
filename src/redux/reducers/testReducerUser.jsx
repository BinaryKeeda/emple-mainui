import { createSlice } from '@reduxjs/toolkit'

const testSliceUser = createSlice({
  name: 'test',
  initialState: {
    category:"",
    loading: false,
    error: null,
    data: {},
    page:1,
    totalPages:1,
    currentPage:1,
    hasMore:true,
    search:null
  },
  reducers: {
    resetState(state){
      state.loading = false
      state.error = null
      state.data = {}
      state.page = 1
      state.totalPages = 1
      state.hasMore = true
      state.search = null
    },
    setCategory(state,action){
      state.category = action.payload
    },
    setTotalPage(state,action){
      state.totalPages = action.payload;
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload;
    },
    setSearch(state,action){
      state.search = action.payload
    },
    incrementPage(state){
      state.page += 1;
    },
    setHasMore(state){
      state.hasMore = false;
    },
    testRequest (state) {
      state.loading = true
      state.error = null
    },
    testSuccess (state, action) {
      state.loading = false
      state.data = {...state.data ,[action.payload.key] :action.payload.value}
    },
    testFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})


export default testSliceUser.reducer;
export const { resetState,setCategory, testFailure,setTotalPage , setCurrentPage , setHasMore, testRequest,testSuccess , incrementPage } = testSliceUser.actions;