import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getIncidents = async () => {
  const response = await API.get("/api/incidents");
  return response.data;
};

export const getHospitals = async () => {
  const response = await API.get("/api/hospitals");
  return response.data;
};

export default API;
