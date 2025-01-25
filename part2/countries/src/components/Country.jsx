import { useEffect, useState } from "react";
import countryService from "../services/countryService";
import weatherService from "../services/weatherService";
import WeatherDetails from "./WeatherDetails";
import CountryDetails from "./CountryDetails";

const Country = ({ name }) => {
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const countryName = name.toLowerCase();

    countryService.getSingle(countryName).then((data) => {
      setCountryData(data);
      weatherService.getWeather(data?.capital[0]).then((weather) => {
        setWeatherData(weather);
      });
    });
  }, [name]);

  const capital = countryData?.capital[0];

  return (
    <div className="country-details">
      <h1>{name}</h1>
      <CountryDetails countryData={countryData} />

      <h2>Weather in {capital}</h2>
      <WeatherDetails weatherData={weatherData} capital={capital} />
    </div>
  );
};

export default Country;
