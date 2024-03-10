import Layout from "../components/Layout.jsx";
import { Container, Stack } from "react-bootstrap";
import Avatar from "boring-avatars";

export default function Profile() {
  return (
    <Layout>
      <Container>
        <h2>User Profile</h2>
        <hr />
        <Stack className="mt-4 pt-4 pb-4" gap={2}>
          <Avatar
            size={140}
            title={true}
            variant="beam"
            name="Foo Person"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <h3 className="mt-2">Foo Person</h3>
        </Stack>
        <Stack
          direction="horizontal"
          className="mt-4 pt-4 justify-content-between"
        >
          <div>
            <h5>Gender</h5>
            <p>Male</p>
          </div>
          <div>
            <h5>Email Address</h5>
            <p>foo@example.com</p>
          </div>
          <div>
            <h5>Mobile Number</h5>
            <p>9876543210</p>
          </div>
        </Stack>
      </Container>
    </Layout>
  );
}
