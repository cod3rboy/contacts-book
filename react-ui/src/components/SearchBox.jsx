import { Col, Form, InputGroup, Row } from "react-bootstrap";

export default function SearchBox({
  id,
  placeholder,
  onChange,
  onInput,
  value,
  ...props
}) {
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
              id={id}
              placeholder={placeholder}
            />
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}
