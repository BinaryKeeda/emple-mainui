import axios from "axios";
import { BASE_URL } from "../../../lib/config";

export const fetchParticular = async ({ queryKey }) => {
  const [_key, { endpoint, params }] = queryKey;

  const response = await axios.get(`${BASE_URL}/api/data/user/${endpoint.prefix}/${endpoint.suffix}`, {
    params,
    withCredentials: true,
  });

  return response.data;
};
