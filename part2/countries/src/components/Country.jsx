import { useEffect, useState } from "react";
import countryService from "../services/countryService";
import weatherService, { iconsURL } from "../services/weatherService";

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
  const tempInCelsius = `${Number(weatherData?.main?.temp - 273.15).toFixed(
    2
  )}`;
  const weatherIcon = `${iconsURL}/${weatherData?.weather[0].icon}@2x.png`;

  return (
    <div className="country-details">
      <h1>{name}</h1>

      <div>
        <span> capital</span> <span>{capital}</span>
      </div>
      <div>
        <span>area</span> <span>{countryData?.area}</span>
      </div>

      <h4>Languages:</h4>
      <ul>
        {countryData?.languages &&
          Object.entries(countryData.languages).map(([key, lang]) => (
            <li key={key}>{lang}</li>
          ))}
      </ul>

      <div>
        <img src={countryData?.flags.png} alt={name} />
      </div>

      <h2>Weather in {capital}</h2>
      {weatherData ? (
        <div>
          <div>
            <p>temperature {tempInCelsius}</p>
            <img src={weatherIcon} alt={weatherData?.weather[0].description} />
            <p>wind {weatherData?.wind.speed}m/s</p>
          </div>
        </div>
      ) : (
        <em>
          No weather details available for{" "}
          <span className="medium">{capital}</span>
        </em>
      )}
    </div>
  );
};

export default Country;
