import { iconsUrl } from "../config";

const WeatherDetails = ({ weatherData, capital }) => {
  const tempInKelvin = weatherData?.main?.temp;
  const tempInCelsius = `${Number(tempInKelvin - 273.15).toFixed(2)}`;
  const weatherIcon = `${iconsUrl}/${weatherData?.weather[0].icon}@2x.png`;

  return (
    <div>
      {weatherData ? (
        <div>
          <div>
            <p>
              temperature{" "}
              <span className="medium">
                {tempInCelsius}c ({tempInKelvin}K)
              </span>
            </p>
            <img src={weatherIcon} alt={weatherData?.weather[0].description} />
            <p>
              wind <span className="medium">{weatherData?.wind.speed}m/s</span>
            </p>
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

export default WeatherDetails;
