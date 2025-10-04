import { createSlice, current } from '@reduxjs/toolkit'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    category: "",
    loading: false,
    error: null,
    data: {},
    page: 1,
    totalPages: 1,
    currentPage: 1,
    hasMore: true,
    search: null,
    filters: {        
      difficulty: null,
      sortBy: "createdAt",
      sortOrder: "desc",
    search : ""
    }
  },
  reducers: {
    resetState(state) {
      state.loading = false
      state.error = null
      state.data = {}
      state.page = 1
      state.totalPages = 1
      state.hasMore = true
      state.search = null
      state.filter = { difficulty: null, sortBy: "createdAt", sortOrder: "desc" }
    },
    setCategory(state, action) {
      state.category = action.payload
    },
    setTotalPage(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    incrementPage(state) {
      state.page += 1;
    },
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload } 
    },
    setHasMore(state) {
      state.hasMore = false;
    },
    quizRequest(state) {
      state.loading = true
      state.error = null
    },
    quizSuccess(state, action) {
      state.loading = false
      state.data = { ...state.data, [action.payload.key]: action.payload.value }
    },
    quizFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export default quizSlice.reducer;
export const {
  resetState,
  setCategory,
  quizFailure,
  setTotalPage,
  setCurrentPage,
  setHasMore,
  quizRequest,
  quizSuccess,
  incrementPage,
  setFilter
} = quizSlice.actions;
