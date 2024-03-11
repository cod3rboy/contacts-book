import { useState } from "react";
import { Alert, Button, Form, Modal, Spinner, Stack } from "react-bootstrap";
import { genderName } from "../utils/utils.js";

const emptyRecord = {
  firstName: "",
  lastName: "",
  gender: 1,
  email: "",
  mobileNumber: "",
  address: {
    street: "",
    area: "",
    city: "",
    provinceState: "",
    country: "",
    pincode: "",
  },
};

export default function ContactModal({
  record = emptyRecord,
  heading,
  show,
  onHide,
  onSave,
  error,
  loading,
  ...props
}) {
  const [basicInfo, setBasicInfo] = useState({
    firstName: record.firstName,
    lastName: record.lastName,
    gender: genderName(record.gender),
    email: record.email,
    mobileNumber: record.mobileNumber,
  });
  const [address, setAddress] = useState({
    street: record.address.street,
    area: record.address.area,
    city: record.address.city,
    provinceState: record.address.provinceState,
    country: record.address.country,
    pincode: record.address.pincode,
  });

  const basicInputHandler = (fieldName) => (e) => {
    setBasicInfo((prevInfo) => ({ ...prevInfo, [fieldName]: e.target.value }));
  };
  const addressInputHandler = (fieldName) => (e) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [fieldName]: e.target.value,
    }));
  };

  const handleGenderChange = (e) => {
    setBasicInfo((prevInfo) => ({ ...prevInfo, gender: e.target.value }));
  };

  const handleSave = () => {
    const record = { ...basicInfo, address: { ...address } };
    record.gender = record.gender.toLowerCase();
    onSave(record);
  };

  return (
    <Modal show={show} onHide={onHide} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
        )}
        <Form>
          <Stack gap={2}>
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="firstName"
                id="firstName"
                value={basicInfo.firstName}
                onInput={basicInputHandler("firstName")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="lastName"
                id="lastName"
                value={basicInfo.lastName}
                onInput={basicInputHandler("lastName")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                name="gender"
                id="gender-male"
                label="Male"
                value="Male"
                onChange={handleGenderChange}
                checked={basicInfo.gender === "Male"}
              />
              <Form.Check
                type="radio"
                name="gender"
                id="gender-female"
                label="Female"
                value="Female"
                onChange={handleGenderChange}
                checked={basicInfo.gender === "Female"}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                size="sm"
                type="email"
                id="email"
                name="email"
                value={basicInfo.email}
                onInput={basicInputHandler("email")}
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
                value={basicInfo.mobileNumber}
                onInput={basicInputHandler("mobileNumber")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Stack gap={1}>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Street"
                  id="address.street"
                  name="address.street"
                  value={address.street}
                  onInput={addressInputHandler("street")}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Area"
                  id="address.area"
                  name="address.area"
                  value={address.area}
                  onInput={addressInputHandler("area")}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="City"
                  id="address.city"
                  name="address.city"
                  value={address.city}
                  onInput={addressInputHandler("city")}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Province/State"
                  id="address.provinceState"
                  name="address.provinceState"
                  value={address.provinceState}
                  onInput={addressInputHandler("provinceState")}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Country"
                  id="address.country"
                  name="address.country"
                  value={address.country}
                  onInput={addressInputHandler("country")}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Pincode"
                  id="address.pincode"
                  name="address.pincode"
                  value={address.pincode}
                  onInput={addressInputHandler("pincode")}
                />
              </Stack>
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={4}>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            Save
          </Button>
          {loading && <Spinner animation="border" variant="primary" />}
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
