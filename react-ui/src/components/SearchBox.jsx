import { Col, Form, InputGroup, Row } from "react-bootstrap";

export default function SearchBox({ onChange, onInput, value, ...props }) {
  return (
    <Form {...props}>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>?</InputGroup.Text>
            <Form.Control
              value={value}
              onChange={onChange}
              onInput={onInput}
              id="searchName"
              placeholder="search any name"
            />
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}
