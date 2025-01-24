import Country from "./Country";
import CountriesDisplay from "./CountriesDisplay";
import CountriesFallback from "./CountriesFallback";

const Countries = ({ searchQuery, countryNames, setCountries }) => {
  return (
    <div className="countries">
      {countryNames.length === 1 ? (
        <Country name={countryNames[0]} />
      ) : searchQuery ? (
        <CountriesDisplay
          searchQuery={searchQuery}
          setCountries={setCountries}
          countryNames={countryNames}
        />
      ) : (
        <CountriesFallback />
      )}
    </div>
  );
};

export default Countries;
