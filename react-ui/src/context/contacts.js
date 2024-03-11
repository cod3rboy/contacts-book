import { createContext } from "react";

const ContactsContext = createContext({
  setContacts: (records) => {},
  addContact: (record) => {},
  getContact: (id) => {},
  listContacts: (filterName) => {},
  updateContact: (id, record) => {},
  deleteContact: (id) => {},
});

export default ContactsContext;
