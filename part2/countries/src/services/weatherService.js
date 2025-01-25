import axios from "axios";
import { weatherUrl } from "../config";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (name) => {
  const request = axios.get(`${weatherUrl}?q=${name}&appId=${apiKey}`);
  return request.then((res) => res.data);
};

export default { getWeather };
