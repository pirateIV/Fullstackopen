const CountrySearch = ({ handleSetSearchQuery }) => {
  return (
    <div>
      <label>find countries</label>
      <input
        type="text"
        onChange={handleSetSearchQuery}
        placeholder="Enter country to search..."
      />
    </div>
  );
};

export default CountrySearch;
