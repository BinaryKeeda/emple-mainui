import axios from "axios";
import { BASE_URL } from "../../../lib/config";

export const fetchContent = async ({ queryKey }) => {
  const [_key, { endpoint, params }] = queryKey;

  const response = await axios.get(`${BASE_URL}/api/admin/${endpoint}`, {
    params,
    withCredentials: true,
  });

  return response.data;
};
