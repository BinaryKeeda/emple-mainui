import axios from "axios";
import store from "../store";
import {
  quizFailure,
  quizRequest,
  quizSuccess,
  incrementPage,
  setCurrentPage,
  setHasMore,
  setTotalPage,
} from "../reducers/quizReducer";
import { BASE_URL } from "../../lib/config";

// 🔹 Axios-based GraphQL fetcher
const fetchQuizzes = async ({ page, limit, search, category, userId, filters }) => {
  return axios.post(
    `${BASE_URL}/graphql`,
    {
      query: `
        query GetQuizzes(
          $page: Int
          $limit: Int
          $search: String
          $category: String
          $filters: QuizFilterInput
          $userId: String!
        ) {
          getQuizzes(
            page: $page
            limit: $limit
            search: $search
            category: $category
            filters: $filters
            userId: $userId
          ) {
            status
            data {
              _id
              title
              category
              difficulty
              duration
              marks
              isSubmitted
              slug
              totalAttempts
              hasAttempted
            }
            page
            limit
            totalItems
            totalPages
          }
        }
      `,
      variables: { page, limit, search, category, filters, userId },
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // for session/cookies
    }
  );
};

// 🔹 Main Redux fetcher
export const getQuiz = async () => {
  const { page, category, filters } = store.getState().quiz;
  const userId = store.getState().auth.user?._id;

  try {
    store.dispatch(quizRequest());

    const response = await fetchQuizzes({
      page,
      limit: 20,
      search: "",
      category,
      filters,
      userId,
    });

    const result = response.data.data.getQuizzes;
    console.log("Fetched quizzes:", result);

    store.dispatch(quizSuccess({ key: result.page, value: result.data }));
    store.dispatch(setTotalPage(result.totalPages));
    store.dispatch(setCurrentPage(result.page));
    store.dispatch(incrementPage());

    if (result.totalPages <= page) store.dispatch(setHasMore());
  } catch (error) {
    store.dispatch(quizFailure(error.message || "Fetch failed"));
  }
};
