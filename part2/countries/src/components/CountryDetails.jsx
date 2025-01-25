import React from "react";

const CountryDetails = ({ countryData }) => {
  return (
    <div>
      <div>
        <span> capital</span> <span>{countryData?.capital}</span>
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
    </div>
  );
};

export default CountryDetails;
