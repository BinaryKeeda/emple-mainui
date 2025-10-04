import { createSlice, current } from '@reduxjs/toolkit'

const testSolutionSlice = createSlice({
  name: 'testSolution',
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
      state.loading = true
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
    solutionRequest (state) {
      state.loading = true
      state.error = null
    },
    solutionSuccess (state, action) {
      state.loading = false
      state.data = {...state.data ,[action.payload.key] :action.payload.value}
    },
    solutionFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})


export default testSolutionSlice.reducer;
export const { resetState,setCategory, solutionFailure,setTotalPage , setCurrentPage , setHasMore, solutionRequest,solutionSuccess , incrementPage } = testSolutionSlice.actions;