import { phone } from "phone";

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email");
  }
  return email;
}

export function validatePassword(password: string): string {
  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long");
  }
  return password;
}

export function validateFirstName(fname: string): string {
  if (fname.length < 1) {
    throw new ValidationError("First name must be at least 1 character long");
  } else if (fname.length > 50) {
    throw new ValidationError(
      "First name must not be more than 50 characters long"
    );
  }
  return fname;
}

export function validateLastName(lname: string): string {
  if (lname.length < 1) {
    throw new ValidationError("Last name must be at least 1 character long");
  } else if (lname.length > 50) {
    throw new ValidationError(
      "Last name must not be more than 50 characters long"
    );
  }
  return lname;
}

export function validatePhoneNumber(phoneNumber: string): string {
  const output = phone(phoneNumber, { country: "NG" });
  if (!output.isValid) {
    throw new ValidationError("Invalid phone number");
  }
  return output.phoneNumber;
}
