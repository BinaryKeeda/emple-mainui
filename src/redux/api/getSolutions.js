import axios from "axios";
import store from "../store";
import { BASE_URL } from "../../lib/config";
import {
  incrementPage,
  setCurrentPage,
  setHasMore,
  setTotalPage,
  solutionFailure,
  solutionRequest,
  solutionSuccess,
} from "../reducers/solutionReducer";

export const getSolutions = async () => {
    const {  page , category} = store.getState().solution;
    const userId = store.getState().auth.user?._id;
    store.dispatch(solutionRequest());
    try {

        const res = await fetchSolutions({
            userId,
            page,
            limit:20,
            search: '',
        })
        const result = res.data.getSolutions;

        store.dispatch(solutionSuccess({ key: result.page, value: result.data }));
        store.dispatch(setTotalPage(result.totalPages));
        store.dispatch(setCurrentPage(result.page));
        store.dispatch(incrementPage());
        if (result.totalPages <= page) store.dispatch(setHasMore());

    } catch (error) {
        store.dispatch(solutionFailure(error.message));
        console.log(error)
    }
}



const fetchSolutions = async ({ userId, page, limit, search }) => {
  const res = await axios.post(
    `${BASE_URL}/graphql`,
    {
      query: `
     query Query($userId: String!, $page: Int, $limit: Int, $search: String) {
      getSolutions(userId: $userId, page: $page, limit: $limit, search: $search) {
        data {
          _id
          attemptNo
          createdAt
          isSubmitted
          quizId {
            slug
            title
            duration
            difficulty
            duration
            rank
          }
          score
          rank
          totalSubmissions
        }
        status
        page
        limit
        totalItems
        totalPages
      }
    }`,
      variables: { userId, page, limit, search },
    },
    { withCredentials: true }
  );
  return res.data;
};
