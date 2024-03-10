import Layout from "../components/Layout.jsx";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Layout>
      <Container>
        <h2>User Login</h2>
        <hr />
        <Form method="POST">
          <Stack gap={2}>
            <Col xs="4">
              <Form.Group>
                <Form.Label for="emailId">Email Address</Form.Label>
                <Form.Control type="email" name="emailId" id="emailId" />
              </Form.Group>
            </Col>
            <Col xs="4">
              <Form.Group>
                <Form.Label for="pwd">Password</Form.Label>
                <Form.Control type="password" name="password" id="pwd" />
              </Form.Group>
            </Col>
          </Stack>

          <Stack className="mt-4" direction="horizontal" gap={4}>
            <Button type="submit">Login</Button>
            <Link to="/signup">Create Account</Link>
          </Stack>
        </Form>
      </Container>
    </Layout>
  );
}
