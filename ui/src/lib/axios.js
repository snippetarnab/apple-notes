import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? `http://localhost:3000/api` : `/api`;
const api = axios.create({
  baseURL: BASE_URL,
});

let clerkTokenGetter = null;

export function setClerkTokenGetter(getToken) {
  clerkTokenGetter = getToken;
}

api.interceptors.request.use(async (config) => {
  if (!clerkTokenGetter) {
    throw new Error("Clerk authentication is not initialized.");
  }

  const token = await clerkTokenGetter();
  if (!token) {
    throw new Error("No Clerk session token is available.");
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
