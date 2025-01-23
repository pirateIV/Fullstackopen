import { useEffect, useState } from "react";

import { MESSAGES } from "./helpers";
import contactService from "./services/contactService";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import NotificationMessage from "./components/NotificationMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [message, setMessage] = useState({
    content: "",
    success: false,
  });

  const setNotificationMessage = (message, success) => {
    setMessage({ content: message, success });
    setTimeout(() => {
      setMessage({ ...message, content: "" });
    }, 2000);
  };

  useEffect(() => {
    // Get all contacts
    contactService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  // Add new/updated contact to JSON server
  const handleNewContact = (e) => {
    e.preventDefault();

    if (!(newName && newNumber)) {
      setNotificationMessage(MESSAGES.requiredFields, false);
      return;
    }

    // Check if name exists in  contacts list
    let isDuplicate = persons.find((person) =>
      person.name.toLowerCase().includes(newName.toLowerCase())
    );

    if (isDuplicate) {
      const confirmReplace = confirm(MESSAGES.replaceContact(newName));
      const updatedContact = { name: newName, number: newNumber };

      if (confirmReplace) {
        contactService
          .updateContact(updatedContact, isDuplicate.id)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id === data.id ? { ...person, ...data } : person
              )
            );

            setNotificationMessage(
              MESSAGES.updateSuccess(updatedContact.name),
              true
            );

            resetForm();
          })
          .catch(() => {
            setNotificationMessage(MESSAGES.updateError(newName), false);
          });
        return;
      } else {
        return;
      }
    }

    const contact = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    contactService
      .createContact(contact)
      .then((newContact) => {
        setPersons([...persons, newContact]);
        setNotificationMessage(
          MESSAGES.addContactSuccess(newContact.name),
          true
        );
        resetForm();
      })
      .catch(() => {
        setNotificationMessage(MESSAGES.addContactError(newName), false);
      });
  };

  // Remove contact form JSON server
  const handleDeleteContact = (name, id) => {
    if (!confirm(`Delete ${name}`)) {
      return;
    }

    contactService
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotificationMessage(MESSAGES.deletedContact(name), true);
      })
      .catch(() => {
        // refetch to update stale data
        contactService.getAll().then((data) => {
          setPersons(data);
        });
        setNotificationMessage(MESSAGES.deleteError(name), false);
      });
  };

  // Find contact that matches filter query
  const handleSearchContact = (e) => {
    setFilterQuery(e.target.value);
  };

  // Set person's contact name
  const handleSetNewName = (e) => {
    setNewName(e.target.value);
  };

  // Set person's contact number
  const handleSetNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationMessage message={message} />

      <Filter handleSearchContact={handleSearchContact} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSetNewName={handleSetNewName}
        handleSetNewNumber={handleSetNewNumber}
        handleNewContact={handleNewContact}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterQuery={filterQuery}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
