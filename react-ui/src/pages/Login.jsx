import { useState } from "react";
import Layout from "../components/Layout.jsx";
import {
  Button,
  Col,
  Container,
  Form,
  Stack,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../api/auth.js";
import useAuth from "../hooks/useAuth.js";
import GuestPage from "../components/GuestPage.jsx";
import { validateEmail, validatePwd } from "../utils/validation.js";

export default function Login() {
  const { setAccessGrant } = useAuth();
  const [creds, setCreds] = useState({ userEmail: "", userPwd: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [errs, setErrs] = useState({});

  const fieldInputHandler = (fieldName) => (e) => {
    setCreds((prevCreds) => ({ ...prevCreds, [fieldName]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrs({});
    setLoginError("");
    const errors = {
      userEmail: validateEmail(creds.userEmail),
      userPwd: validatePwd(creds.userPwd),
    };
    setErrs(errors);

    const hasError = Object.keys(errors).some((field) => !!errors[field]);
    if (hasError) {
      return;
    }

    setLoading(true);
    login(creds.userEmail, creds.userPwd)
      .then((response) => {
        setAccessGrant(response);
      })
      .catch((err) => {
        setLoginError(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <GuestPage>
      <Layout>
        <Container>
          <h2>User Login</h2>
          <hr />
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form method="POST" onSubmit={handleSubmit}>
            <Stack gap={2}>
              <Col xs="4">
                <Form.Group>
                  <Form.Label htmlFor="emailId">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="userEmail"
                    id="emailId"
                    value={creds.userEmail}
                    onInput={fieldInputHandler("userEmail")}
                  />
                  {errs.userEmail && (
                    <Alert className="mt-2" variant="danger">
                      {errs.userEmail}
                    </Alert>
                  )}
                </Form.Group>
              </Col>
              <Col xs="4">
                <Form.Group>
                  <Form.Label htmlFor="pwd">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="userPwd"
                    id="pwd"
                    value={creds.userPwd}
                    onInput={fieldInputHandler("userPwd")}
                  />
                  {errs.userPwd && (
                    <Alert className="mt-2" variant="danger">
                      {errs.userPwd}
                    </Alert>
                  )}
                </Form.Group>
              </Col>
            </Stack>

            <Stack className="mt-4" direction="horizontal" gap={4}>
              <Button type="submit" disabled={loading}>
                Login
              </Button>
              {loading && <Spinner animation="border" variant="primary" />}
              <Link to="/signup">Create Account</Link>
            </Stack>
          </Form>
        </Container>
      </Layout>
    </GuestPage>
  );
}
