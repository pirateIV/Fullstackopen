import Filter from "./Filter";

const Persons = ({ persons, filterQuery, handleDeleteContact }) => {
  // If query is specified (not an empty string), filter based on query
  const filteredPersons = filterQuery
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterQuery.trim().toLowerCase())
      )
    : persons;

  // Update message (empty/unempty contacts)
  const message =
    persons.length > 0
      ? `No contact matches "${filterQuery}"`
      : "No contacts found...";

  return (
    <div>
      {filteredPersons.length > 0
        ? filteredPersons.map((person) => (
            <FilteredPersons
              key={person.id}
              person={person}
              handleDeleteContact={handleDeleteContact}
            />
          ))
        : message}
    </div>
  );
};

const FilteredPersons = ({ person, handleDeleteContact }) => {
  return (
    <p>
      <span>
        {person.name} {person.number}
      </span>
      <button onClick={() => handleDeleteContact(person.name, person.id)}>
        Delete
      </button>
    </p>
  );
};

export default Persons;
