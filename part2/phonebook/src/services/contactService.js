import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createContact = (contact) => {
  const request = axios.post(baseUrl, contact);
  return request.then((res) => res.data);
};

const updateContact = (updatedObj, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObj);
  return request.then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  createContact,
  updateContact,
  deleteContact,
};
