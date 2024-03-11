import { Button, Stack } from "react-bootstrap";
import { genderName } from "../utils/utils.js";

function ContactRow({
  index,
  record = {},
  onEdit,
  onDelete,
  deleting,
  ...props
}) {
  return (
    <tr {...props}>
      <td>{index + 1}</td>
      <td>{record.firstName}</td>
      <td>{record.lastName}</td>
      <td>{genderName(record.gender)}</td>
      <td>{record.email}</td>
      <td>{record.mobileNumber}</td>
      <td>{Object.values(record.address).join(", ")}</td>
      <td>
        <Stack gap={2} direction="horizontal">
          <Button variant="primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(record.id, index)}
            disabled={deleting}
          >
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

function Heading() {
  return (
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
  );
}

ContactRow.Heading = Heading;

export default ContactRow;
