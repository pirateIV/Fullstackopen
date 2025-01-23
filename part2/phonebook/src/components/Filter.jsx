const Filter = ({ handleSearchContact }) => {
  return (
    <div>
      <label>filter shown with</label>
      <input type="text" onChange={handleSearchContact} />
    </div>
  );
};

export default Filter;
