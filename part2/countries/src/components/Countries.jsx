import Country from "./Country";
import CountriesDisplay from "./CountriesDisplay";
import CountriesFallback from "./CountriesFallback";

const Countries = ({ searchQuery, countryNames, setSearchQuery }) => {
  return (
    <div className="countries">
      {countryNames.length === 1 ? (
        <Country name={countryNames[0]} />
      ) : searchQuery ? (
        <CountriesDisplay
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          countryNames={countryNames}
        />
      ) : (
        <CountriesFallback />
      )}
    </div>
  );
};

export default Countries;
