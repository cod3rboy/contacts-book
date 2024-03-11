export function validateEmail(email = "") {
  email = email.trim().toLowerCase();
  if (email === "") {
    return "email is empty";
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return "invalid email address";
  }
  return "";
}

export function validatePwd(password = "") {
  if (password.trim() === "") {
    return "password is empty";
  }
  return "";
}
