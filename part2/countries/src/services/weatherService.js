import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
export const iconsURL = `https://openweathermap.org/img/wn`;

const getWeather = (name) => {
  const request = axios.get(`${baseUrl}?q=${name}&appId=${apiKey}`);
  return request.then((res) => res.data);
};

export default { getWeather };
