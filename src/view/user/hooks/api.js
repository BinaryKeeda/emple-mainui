import axios from "axios";
import { BASE_URL } from "../../../lib/config";
export const GROUP_ROUTES = {
    GET_USER_GROUP:'/api/data/user/groups/' ,
    GET_USER_INVITE: '/api/data/user/invites/' ,
    GET_USER_SECTION: '/api/data/user/sections/'
}

export const evaluatorApi = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userApi = axios.create({
  baseURL: `${BASE_URL}`, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});