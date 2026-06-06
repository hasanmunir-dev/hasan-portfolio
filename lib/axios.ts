import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONTACT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
