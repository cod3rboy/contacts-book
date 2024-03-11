export function genderName(id) {
  switch (id) {
    case 1:
      return "Male";
    case 2:
      return "Female";
    default:
      return "Unknown";
  }
}

export function genderNumber(name) {
  switch (name.toLowerCase()) {
    case "male":
      return 1;
    case "female":
      return 2;
  }
}
