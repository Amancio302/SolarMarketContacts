import api from "../api";

export async function createContact({ value, contactMarker, person }) {
  return api
    .post("/contacts", { value, contactMarker, person })
    .catch((err) => err);
}

export async function listContacts() {
  return api.get("/contacts").catch((err) => err);
}

export async function showContact(id) {
  return api.get(`/contacts/${id}`).catch((err) => err);
}

export async function updateContact(id, { value, contactMarker, person }) {
  return api
    .put(`/contacts/${id}`, { value, contactMarker, person })
    .catch((err) => err);
}

export async function deleteContact(id) {
  return api.delete(`/contacts/${id}`).catch((err) => err);
}
