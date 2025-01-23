import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleSetNewName,
  handleSetNewNumber,
  handleNewContact,
}) => {
  return (
    <form onSubmit={handleNewContact}>
      <div>
        <label>name:</label>
        <input value={newName} onChange={handleSetNewName} />
        <br />
        <label>number:</label>
        <input value={newNumber} onChange={handleSetNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
