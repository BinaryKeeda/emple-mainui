import axios from 'axios';
import { BASE_URL } from '../../lib/config';
import { setRankData, setError, setLoading } from '../slice/UserSlice';

export const getRank = (id, college) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${BASE_URL}/graphql` , {
      query:`#graphql
      query Query($userId: ID!, $university: String!) {
        getRank(userId: $userId, university: $university) {
          globalRank universityRank
          userRank {
            points
            solutions {
              aptitude { attempted average }
              core { attempted average }
              miscellaneous { attempted average }
              easy { attempted average }
              medium { attempted average }
              hard { attempted average }
            }
          }
          topGlobal { university rank avatar points name }
          topUniversity { university rank avatar  points name }
        }
      }`,
      variables: {
        userId: id,
        university: college
      }
    }
    , {withCredentials:true});
    dispatch(setRankData(response.data.data.getRank));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message || 'Failed to fetch rank data'));
    dispatch(setLoading(false));
  } finally {
    dispatch(setLoading(false));
  }
};
