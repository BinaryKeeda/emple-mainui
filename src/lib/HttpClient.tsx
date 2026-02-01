import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface HttpOptions {
  isAuthenticated?: boolean;
}

interface HttpHeaders {
  "Content-Type": string;
  Accept: string;
  Authorization?: string;
}

interface HttpError extends Error {
  response?: {
    data: any;
  };
}

const getHeaders = (isAuthenticated = false): HttpHeaders => {
  const headers: HttpHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

export const get = async <T,>(url: string, options: HttpOptions = {}): Promise<T> => {
  try {
    const { isAuthenticated = false } = options;
    const response: AxiosResponse<T> = await axios.get(url, { headers: getHeaders(isAuthenticated) });
    return response.data;
  } catch (error: any) {
    const httpError: HttpError = error;
    throw httpError.response?.data || httpError.message;
  }
};

export const post = async <T, R>(url: string, data: T, options: HttpOptions = {}): Promise<R> => {
  try {
    const { isAuthenticated = false } = options;
    const response: AxiosResponse<R> = await axios.post(url, data, { headers: getHeaders(isAuthenticated) });
    return response.data;
  } catch (error: any) {
    const httpError: HttpError = error;
    throw httpError.response?.data || httpError.message;
  }
};

export const postForm = async <R>(url: string, formData: FormData, options: HttpOptions = {}): Promise<R> => {
  try {
    const { isAuthenticated = true } = options;
    const headers = getHeaders(isAuthenticated);
    headers["Content-Type"] = "multipart/form-data";
    const response: AxiosResponse<R> = await axios.post(url, formData, { headers });
    return response.data;
  } catch (error: any) {
    const httpError: HttpError = error;
    throw httpError.response?.data || httpError.message;
  }
};

export const put = async <T, R>(url: string, data: T, options: HttpOptions = {}): Promise<R> => {
  try {
    const { isAuthenticated = true } = options;
    const response: AxiosResponse<R> = await axios.put(url, data, { headers: getHeaders(isAuthenticated) });
    return response.data;
  } catch (error: any) {
    const httpError: HttpError = error;
    throw httpError.response?.data || httpError.message;
  }
};

export const del = async <T,>(url: string, options: HttpOptions = {}): Promise<T> => {
  try {
    const { isAuthenticated = true } = options;
    const response: AxiosResponse<T> = await axios.delete(url, { headers: getHeaders(isAuthenticated) });
    return response.data;
  } catch (error: any) {
    const httpError: HttpError = error;
    throw httpError.response?.data || httpError.message;
  }
};
