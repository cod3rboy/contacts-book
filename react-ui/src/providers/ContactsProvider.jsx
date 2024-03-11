import { useEffect, useReducer } from "react";
import ContactsContext from "../context/contacts.js";
import contactsReducer, {
  INITIAL_STATE,
  ACTION_CONTACT_ADD,
  ACTION_CONTACT_DELETE,
  ACTION_CONTACT_UPDATE,
  ACTION_CONTACT_LIST,
} from "../store/contacts.js";
import useAuth from "../hooks/useAuth.js";
import { getContactList } from "../api/contacts.js";

export default function ContactsProvider({ children }) {
  const [contacts, contactsDispatch] = useReducer(
    contactsReducer,
    INITIAL_STATE
  );

  const { token } = useAuth();

  useEffect(() => {
    if (token?.jwt && token?.expiry) {
      getContactList(token)
        .then((list) => {
          contactsDispatch({
            type: ACTION_CONTACT_LIST,
            payload: {
              records: list.recordsList,
            },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  function setContacts(records) {
    contactsDispatch({
      type: ACTION_CONTACT_LIST,
      payload: {
        records,
      },
    });
  }

  function addContact(record) {
    contactsDispatch({
      type: ACTION_CONTACT_ADD,
      payload: {
        record,
      },
    });
  }

  function getContact(id) {
    return contacts.records.find((record) => record.id === id);
  }

  function listContacts(filterName = "") {
    if (filterName.trim() !== "") {
      return contacts.records.filter(
        (record) =>
          record.firstName.toLowerCase().includes(filterName.toLowerCase()) ||
          record.lastName.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    return contacts.records;
  }

  function updateContact(id, record) {
    contactsDispatch({
      type: ACTION_CONTACT_UPDATE,
      payload: {
        id,
        record,
      },
    });
  }

  function deleteContact(id) {
    contactsDispatch({
      type: ACTION_CONTACT_DELETE,
      payload: {
        id,
      },
    });
  }

  const value = {
    setContacts,
    addContact,
    getContact,
    listContacts,
    updateContact,
    deleteContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
