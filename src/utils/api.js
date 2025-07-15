// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
  }
});

console.log("키:", process.env.REACT_APP_API_KEY); 

export default api;
