import api from "../api";

export async function createContactMarker({ name, tag, contactCategory }) {
  return api
    .post("/contacts/marker", { name, tag, contactCategory })
    .catch((err) => err);
}

export async function listContactMarkers() {
  return api.get("/contacts/marker").catch((err) => err);
}

export async function showContactMarker(id) {
  return api.get(`/contacts/marker/${id}`).catch((err) => err);
}

export async function updateContactMarker(id, { name, tag, contactCategory }) {
  return api
    .put(`/contacts/marker/${id}`, { name, tag, contactCategory })
    .catch((err) => err);
}

export async function deleteContactMarker(id) {
  return api.delete(`/contacts/marker/${id}`).catch((err) => err);
}
