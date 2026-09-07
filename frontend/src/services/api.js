import axios from "axios";

const baseUrl = "http://localhost:3000";

const api = {
  // Enforces a structural forward slash between the domain and the endpoint name
  get: (endpoint) => axios.get(`${baseUrl}/${endpoint.replace(/^\//, '')}`),
  post: (endpoint, data) => axios.post(`${baseUrl}/${endpoint.replace(/^\//, '')}`, data),
  delete: (endpoint) => axios.delete(`${baseUrl}/${endpoint.replace(/^\//, '')}`),
};

export default api;
