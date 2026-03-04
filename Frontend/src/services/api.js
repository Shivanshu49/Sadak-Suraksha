import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getIncidents = async (page = 1, severity = "") => {
  const params = { page };
  if (severity) params.severity = severity;
  const response = await API.get("/api/incidents", { params });
  return response.data;
};

export const createIncident = async (data) => {
  const response = await API.post("/api/incidents", data);
  return response.data;
};

export const getHospitals = async () => {
  const response = await API.get("/api/hospitals");
  return response.data;
};

export default API;
