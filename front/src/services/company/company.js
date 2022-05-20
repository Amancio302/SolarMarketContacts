import api from "../api";

export async function createCompany({ name }) {
  return api.post("/company", { name }).catch((err) => err);
}

export async function listCompanies() {
  return api.get("/company").catch((err) => err);
}

export async function showCompany(id) {
  return api.get(`/company/${id}`).catch((err) => err);
}

export async function updateCompany(id, { name }) {
  return api.put(`/company/${id}`, { name }).catch((err) => err);
}

export async function deleteCompany(id) {
  return api.delete(`/company/${id}`).catch((err) => err);
}
