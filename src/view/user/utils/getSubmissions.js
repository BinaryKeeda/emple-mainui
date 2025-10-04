import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../../../lib/config';
import { useSelector } from 'react-redux';

const fetchSolutions = async (userId) => {
  const res = await axios.post(`${BASE_URL}/graphql`  , {
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
          }
          score
        }
        status
        page
        limit
        totalItems
        totalPages
      }
    }`, 
  variables: {userId , page : 1 , limit:10, search: ""}
  } , {withCredentials:true});
  return res.data;
};

export const useUserSolutions = () => {
  const { user } = useSelector(state => state.auth); 
  return useQuery({
    queryKey: ['solutions', user._id],
    queryFn: () => fetchSolutions(user._id),
    enabled: !!user, 
    staleTime: 5 * 60 * 1000,
  });
};
