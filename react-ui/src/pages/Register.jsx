import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Spinner,
  Stack,
} from "react-bootstrap";
import GuestPage from "../components/GuestPage.jsx";
import {
  validateEmail,
  validatePwd,
  validateFullName,
  validateMobileNumber,
  validateRepeatPwd,
} from "../utils/validation.js";
import { register } from "../api/user.js";

export default function Register() {
  const [account, setAccount] = useState({
    fullName: "",
    gender: "male",
    emailId: "",
    password: "",
    mobileNumber: "",
  });
  const [repeatPwd, setRepeatPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [errs, setErrs] = useState({});

  function resetForm() {
    setAccount({
      fullName: "",
      gender: "male",
      emailId: "",
      password: "",
      mobileNumber: "",
    });
    setRepeatPwd("");
  }

  function fieldInputHandler(fieldName) {
    return (e) =>
      setAccount((prevAccount) => ({
        ...prevAccount,
        [fieldName]: e.target.value,
      }));
  }

  function genderChange(e) {
    setAccount((prevAccount) => ({ ...prevAccount, gender: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrs({});
    setSignupError("");
    const errors = {
      fullName: validateFullName(account.fullName),
      emailId: validateEmail(account.emailId),
      mobileNumber: validateMobileNumber(account.mobileNumber),
      password: validatePwd(account.password),
      repeatPwd: validateRepeatPwd(account.password, repeatPwd),
    };
    setErrs(errors);

    const hasError = Object.keys(errors).some((field) => !!errors[field]);
    if (hasError) {
      return;
    }

    setLoading(true);
    register(account)
      .then(() => {
        alert("Account created successfully! You can now login.");
        resetForm();
      })
      .catch((err) => {
        setSignupError(err);
      })
      .finally(() => setLoading(false));
  }
  return (
    <GuestPage>
      <Layout>
        <Container>
          <h2>Create Account</h2>
          <hr />
          {signupError && <Alert variant="danger">{signupError}</Alert>}
          <Form method="POST" onSubmit={handleSubmit}>
            <Col xs={4}>
              <Stack gap={2}>
                <Form.Group>
                  <Form.Label htmlFor="fullName">Full Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={account.fullName}
                    onInput={fieldInputHandler("fullName")}
                  />
                  {errs.fullName && (
                    <Alert variant="danger" className="mt-1 py-1">
                      {errs.fullName}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    name="gender"
                    id="gender-male"
                    label="Male"
                    value="male"
                    checked={account.gender === "male"}
                    onChange={genderChange}
                  />
                  <Form.Check
                    type="radio"
                    name="gender"
                    id="gender-female"
                    label="Female"
                    value="female"
                    checked={account.gender === "female"}
                    onChange={genderChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="emailId">Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={account.emailId}
                    onInput={fieldInputHandler("emailId")}
                  />
                  {errs.emailId && (
                    <Alert variant="danger" className="mt-1 py-1">
                      {errs.emailId}
                    </Alert>
                  )}
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
                    value={account.mobileNumber}
                    onInput={fieldInputHandler("mobileNumber")}
                  />
                  {errs.mobileNumber && (
                    <Alert variant="danger" className="mt-1 py-1">
                      {errs.mobileNumber}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="pwd">Password</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    id="pwd"
                    name="password"
                    value={account.password}
                    onInput={fieldInputHandler("password")}
                  />
                  {errs.password && (
                    <Alert variant="danger" className="mt-1 py-1">
                      {errs.password}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="pwd">Repeat Password</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    id="rpwd"
                    name="rpassword"
                    value={repeatPwd}
                    onInput={(e) => setRepeatPwd(e.target.value)}
                  />
                  {errs.repeatPwd && (
                    <Alert variant="danger" className="mt-1 py-1">
                      {errs.repeatPwd}
                    </Alert>
                  )}
                </Form.Group>
              </Stack>
            </Col>

            <Stack className="mt-4" direction="horizontal" gap={4}>
              <Button type="submit" disabled={loading}>
                Register
              </Button>
              {loading && <Spinner animation="border" variant="primary" />}
              <Link to="/login">Already Registered?</Link>
            </Stack>
          </Form>
        </Container>
      </Layout>
    </GuestPage>
  );
}
