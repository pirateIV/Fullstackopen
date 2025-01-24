const CountriesDisplay = ({ searchQuery, setCountries, countryNames }) => {
  return (
    <div>
      {countryNames.length > 10 ? (
        <em>To many matches specify another filter</em>
      ) : countryNames.length === 0 ? (
        <em>
          No results found for <span className="medium">{searchQuery}</span>...
        </em>
      ) : (
        countryNames.map((name) => (
          <div key={name} className="country-name">
            <span>{name}</span>{" "}
            <button onClick={() => setCountries([name])}>Show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CountriesDisplay;
