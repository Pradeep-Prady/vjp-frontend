import axios from "axios";

const LOCAL_HOST = "http://localhost:8000/api/v1";
const PROD_URL = "https://vjp-backend.onrender.com/api/v1";

export const axiosInstance = axios.create({
  baseURL: PROD_URL,
  withCredentials: true,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});


// "proxy": "http://vjpenterprises.in/api/v1",