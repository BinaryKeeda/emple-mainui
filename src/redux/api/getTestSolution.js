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
} from "../reducers/testSolutionReducer";

export const getTestSolutions = async () => {
    const {  page , category} = store.getState().testSolution;
    const userId = store.getState().auth.user?._id;
    store.dispatch(solutionRequest());
    try {

        const res = await fetchSolutions({
            userId,
            page,
            limit:20,
            search: '',
        })
        const result = res.data.getUserTestSolutions;

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
    query GetUserTestSolutions($userId: String!, $page: Int, $limit: Int, $search: String) {
        getUserTestSolutions(userId: $userId, page: $page, limit: $limit, search: $search) {
            limit
            page
            totalItems
            totalPages
            data {
            testName
            testResponseId
            }
        }
    }`,
      variables: { userId, page, limit, search },
    },
    { withCredentials: true }
  );
  return res.data;
};
  // status
        //     _id
        //   attemptNo
        //   createdAt
        //   isSubmitted
        //   quizId {
        //     slug
        //     title
        //     duration
        //     difficulty
        //     duration
        //   }
        //   score