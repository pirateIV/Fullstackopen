export const MESSAGES = {
  addContactSuccess: (contact) => `Added ${contact}`,
  addContactError: (contact) => `Failed to add ${contact}`,
  deletedContact: (contact) => `${contact} removed from phonebook`,
  deleteError: (contact) =>
    `Information of ${contact} has already been removed from server`,
  requiredFields: "All fields are required",
  replaceContact: (contact) =>
    `${contact} is already to phonebook, replace the old number with the new one`,
  updateSuccess: (contact) => `Information ${contact} has been updated`,
  updateError: (contact) =>
    `Information ${contact} was already removed from the server`,
};

export const messageStyle = {
  margin: "15px 0",
  padding: "15px",
  borderRadius: "6px",
  backgroundColor: "lightgray",
  border: "4px solid",
  fontSize: "20px",
};
