import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { Button, Col, Container, Form, Stack } from "react-bootstrap";

export default function Register() {
  return (
    <Layout>
      <Container>
        <h2>Create Account</h2>
        <hr />
        <Form method="POST">
          <Col xs={4}>
            <Stack gap={2}>
              <Form.Group>
                <Form.Label htmlFor="fullName">Full Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="fullName"
                  id="fullName"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  name="gender"
                  id="gender-male"
                  label="Male"
                  value="male"
                  checked
                />
                <Form.Check
                  type="radio"
                  name="gender"
                  id="gender-female"
                  label="Female"
                  value="female"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="emailId">Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="emailId"
                  id="emailId"
                  name="emailId"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label size="sm" htmlFor="mobileNumber">
                  Mobile Number
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="pwd">Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  id="pwd"
                  name="password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="pwd">Repeat Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  id="rpwd"
                  name="rpassword"
                />
              </Form.Group>
            </Stack>
          </Col>

          <Stack className="mt-4" direction="horizontal" gap={4}>
            <Button type="submit">Register</Button>
            <Link to="/login">Already Registered?</Link>
          </Stack>
        </Form>
      </Container>
    </Layout>
  );
}
