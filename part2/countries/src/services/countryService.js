import axios from "axios";
import { countriesUrl } from "../config";

const getAll = () => {
  const request = axios.get(`${countriesUrl}/all`);
  return request.then((res) => res.data);   
};

const getSingle = (name) => {
  const request = axios.get(`${countriesUrl}/name/${name}`);
  return request.then((res) => res.data);
};

export default { getAll, getSingle };
