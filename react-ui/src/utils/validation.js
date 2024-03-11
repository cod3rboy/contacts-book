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

export function validateFullName(password = "") {
  if (password.trim() === "") {
    return "full name is empty";
  }
  return "";
}

export function validateMobileNumber(mobileNumber) {
  if (mobileNumber.trim() === "") {
    return "mobile number is empty";
  }
  if (!/^\d{10}$/.test(mobileNumber)) {
    return "invalid mobile number";
  }
  return "";
}

export function validateRepeatPwd(pwd, rPwd) {
  if (pwd !== rPwd) {
    return "password does not match";
  }
  return "";
}
