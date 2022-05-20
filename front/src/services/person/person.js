import api from "../api";

export async function createPerson({
  firstName,
  lastName,
  birthDate,
  company,
}) {
  return api
    .post("/person", { firstName, lastName, birthDate, company })
    .catch((err) => err);
}

export async function listPeople() {
  return api.get("/person").catch((err) => err);
}

export async function showPerson(id) {
  return api.get(`/person/${id}`).catch((err) => err);
}

export async function updatePerson(
  id,
  { firstName, lastName, birthDate, company }
) {
  return api
    .put(`/person/${id}`, { firstName, lastName, birthDate, company })
    .catch((err) => err);
}

export async function deletePerson(id) {
  return api.delete(`/person/${id}`).catch((err) => err);
}
