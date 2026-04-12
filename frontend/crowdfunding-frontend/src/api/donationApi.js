import api from "./axios";

export const donate = (projectId, data) =>
  api.post(`/donations/${projectId}`, data);