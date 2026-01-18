export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GOOGLE_CLIENT_ID =  import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const CODE_EXECUTION_API = import.meta.env.VITE_CODE_EXECUTION_API;
export const MESSAGE_QUEUE_URL = import.meta.env.VITE_MESSAGE_QUEUE_URL;
export const PAYMENT_KEY =  import.meta.env.VITE_PAYMENT_KEY;
export const PAYMENT_URL =  import.meta.env.VITE_PAYMENT_URL;
export const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import axios from "axios";
axios.defaults.withCredentials = true;

export const headers = {
  "X-Auth-User": "binarykeeda-admin-token-bkzsecure",
  "X-Auth-Token": "binarykeeda-admin-authtoken-secure",
};
export const LOGO =
  "https://res.cloudinary.com/drzyrq7d5/image/upload/v1744699895/binarykeeda/zipjouvv161c11xywrwk.jpg";

// export const LOGO = "http://localhost:5173/logo.png"
export const LOGO2 =
  "https://res.cloudinary.com/drzyrq7d5/image/upload/v1749625316/keeda_o2vv8e.png";

export const client = new ApolloClient({
  link: createHttpLink({
    uri: `${BASE_URL}/graphql`, 
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

// const USER_API = axios.create()
