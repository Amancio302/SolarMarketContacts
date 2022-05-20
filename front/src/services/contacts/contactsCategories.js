import api from "../api";

export async function createContactCategory({ name, tag }) {
  return api.post("/contacts/category", { name, tag }).catch((err) => err);
}

export async function listContactCategories() {
  return api.get("/contacts/category").catch((err) => err);
}

export async function showContactCategory(id) {
  return api.get(`/contacts/category/${id}`).catch((err) => err);
}

export async function updateContactCategory(id, { name, tag }) {
  return api.put(`/contacts/category/${id}`, { name, tag }).catch((err) => err);
}

export async function deleteContactCategory(id) {
  return api.delete(`/contacts/category/${id}`).catch((err) => err);
}
