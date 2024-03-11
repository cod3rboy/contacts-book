import Layout from "../components/Layout.jsx";
import { Alert, Button, Container, Stack, Table } from "react-bootstrap";
import SearchBox from "../components/SearchBox.jsx";
import ContactModal from "../components/ContactModal.jsx";
import { useState } from "react";
import useContacts from "../hooks/useContacts.js";
import AuthPage from "../components/AuthPage.jsx";
import useAuth from "../hooks/useAuth.js";
import ContactRow from "../components/ContactRow.jsx";
import {
  updateContact,
  createContact,
  deleteContact,
} from "../api/contacts.js";

export default function Contacts() {
  const contacts = useContacts();
  const { token } = useAuth();
  const [filterName, setFilterName] = useState("");
  const [showNewModel, setShowNewModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const records = contacts.listContacts(filterName);
  const [modalError, setModalError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  function handleRecordEdit(record) {
    const recordId = records[editingIndex].id;
    setModalError("");
    setSaving(true);
    updateContact(token, recordId, record)
      .then((updatedRecord) => {
        contacts.updateContact(updatedRecord.id, updatedRecord);
        setEditingIndex(null);
      })
      .catch((error) => {
        setModalError(error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleRecordSave(record) {
    setModalError("");
    setSaving(true);
    createContact(token, record)
      .then(({ id }) => {
        record.id = id;
        contacts.addContact(record);
        setShowNewModal(false);
      })
      .catch((error) => {
        setModalError(error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleRecordDelete(id, index) {
    setDeletingIndex(index);
    deleteContact(token, id)
      .then(() => {
        contacts.deleteContact(id);
      })
      .catch((error) => {
        alert("failed to delete record with id " + id);
      })
      .finally(() => {
        setDeletingIndex(null);
      });
  }

  function modalCleanup() {
    setModalError("");
    setSaving(false);
  }

  return (
    <AuthPage>
      <Layout>
        <Container>
          <Stack gap={4} direction="horizontal">
            <h2>My Contact List</h2>
            <SearchBox
              id="searchBox"
              placeholder="search by name"
              value={filterName}
              onInput={(e) => setFilterName(e.target.value)}
            />
            <Button
              className="ms-auto"
              variant="success"
              size="sm"
              onClick={() => setShowNewModal(true)}
            >
              New Contact
            </Button>
          </Stack>
          <hr />
          <Table>
            <thead>
              <ContactRow.Heading />
            </thead>
            <tbody>
              {records.map((record, index) => (
                <ContactRow
                  key={record.id}
                  record={record}
                  index={index}
                  deleting={deletingIndex === index}
                  onEdit={() => setEditingIndex(index)}
                  onDelete={handleRecordDelete}
                />
              ))}
            </tbody>
          </Table>
          {records.length == 0 && (
            <Alert variant="secondary" className="mt-2">
              No records found
            </Alert>
          )}
        </Container>
        {showNewModel && (
          <ContactModal
            heading="New Contact"
            show={true}
            onHide={() => {
              setShowNewModal(false);
              modalCleanup();
            }}
            onSave={handleRecordSave}
            error={modalError}
            loading={saving}
          />
        )}
        {editingIndex !== null && (
          <ContactModal
            record={records[editingIndex]}
            heading="Edit Contact"
            show={true}
            onHide={() => {
              setEditingIndex(null);
              modalCleanup();
            }}
            onSave={handleRecordEdit}
            error={modalError}
            loading={saving}
          />
        )}
      </Layout>
    </AuthPage>
  );
}
