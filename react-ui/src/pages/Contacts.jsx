import Layout from "../components/Layout.jsx";
import { Button, Container, Stack, Table } from "react-bootstrap";
import SearchBox from "../components/SearchBox.jsx";
import ContactModal from "../components/ContactModal.jsx";
import { useState } from "react";

export default function Contacts() {
  const [newContactModalVisible, setNewContactModalVisible] = useState(false);
  return (
    <Layout>
      <Container>
        <Stack gap={4} direction="horizontal">
          <h2>My Contact List</h2>
          <SearchBox />
          <Button
            className="ms-auto"
            variant="success"
            size="sm"
            onClick={() => setNewContactModalVisible(true)}
          >
            New Contact
          </Button>
        </Stack>
        <hr />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Foo</td>
              <td>Person</td>
              <td>Male</td>
              <td>foo@example.com</td>
              <td>9876543210</td>
              <td>
                Foo Street, Foo Area, Foo City, Foo State, Foo Country, 123456
              </td>
              <td>
                <Stack gap={2} direction="horizontal">
                  <Button variant="primary" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <ContactModal
        heading="New Contact"
        show={newContactModalVisible}
        onHide={() => setNewContactModalVisible(false)}
      />
      <ContactModal heading="Edit Contact" show={false} />
    </Layout>
  );
}
