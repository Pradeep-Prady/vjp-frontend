import axios from "axios";

const LOCAL_HOST = "http://localhost:8002/api/v1";

const PROD_URL = "http://www.api.vjpenterprises.in:7000/api/v1";

export const axiosInstance = axios.create({
  baseURL: PROD_URL,
  withCredentials: true,
});
