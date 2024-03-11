import { useContext } from "react";
import ContactsContext from "../context/contacts.js";

export default function useContacts() {
  return useContext(ContactsContext);
}
