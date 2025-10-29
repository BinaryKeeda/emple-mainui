export const BASE_URL =  true ? 'http://localhost:5000' : 'https://api.binarykeeda.com';
export const GOOGLE_CLIENT_ID = "969367563916-sco9e8grkep5rf113sk0bkik1aert4fr.apps.googleusercontent.com";
export const CODE_EXECUTION_API = "https://execution.api.binarykeeda.com" ||  "https://judge0.binarykeeda.com";
export const MESSAGE_QUEUE_URL = true ? "http://localhost:3001" : "https://evaluator.binarykeeda.com";

// export const BASE_URL =  import.meta.env.VITE_API_BASE_URL;
// export const GOOGLE_CLIENT_ID = "969367563916-sco9e8grkep5rf113sk0bkik1aert4fr.apps.googleusercontent.com";
// export const CODE_EXECUTION_API = "https://execution.api.binarykeeda.com" ||  "https://judge0.binarykeeda.com";
// export const MESSAGE_QUEUE_URL = true ? "http://localhost:3001" : "https://evaluator.binarykeeda.com";

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
