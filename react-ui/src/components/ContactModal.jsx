import { Button, Form, Modal, Stack } from "react-bootstrap";

export default function ContactModal({
  heading,
  show,
  onHide,
  onSave,
  ...props
}) {
  return (
    <Modal show={show} onHide={onHide} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="firstName"
                id="firstName"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="lastName"
                id="lastName"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                name="gender"
                id="gender-male"
                label="Male"
                value="1"
                checked
              />
              <Form.Check
                type="radio"
                name="gender"
                id="gender-female"
                label="Female"
                value="2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control size="sm" type="email" id="email" name="email" />
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
              <Form.Label>Address</Form.Label>
              <Stack gap={1}>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Street"
                  id="address.street"
                  name="address.street"
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Area"
                  id="address.area"
                  name="address.area"
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="City"
                  id="address.city"
                  name="address.city"
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Province/State"
                  id="address.provinceState"
                  name="address.provinceState"
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Country"
                  id="address.country"
                  name="address.country"
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Pincode"
                  id="address.pincode"
                  name="address.pincode"
                />
              </Stack>
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
