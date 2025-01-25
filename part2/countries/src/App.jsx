import { useEffect, useState } from "react";

import countryService from "./services/countryService";
import CountrySearch from "./components/CountrySearch";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleSearchCountries = () => {
      countryService
        .getAll()
        .then((data) => setCountries(data.map((c) => c.name.common)));
    };
    if (searchQuery) {
      handleSearchCountries();
    }
  }, [searchQuery]);

  const handleSetSearchQuery = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const countryNames = countries.filter((country) =>
    country.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <CountrySearch handleSetSearchQuery={handleSetSearchQuery} />
      <Countries
        searchQuery={searchQuery}
        countryNames={countryNames}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default App;
