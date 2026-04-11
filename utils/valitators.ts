const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (phone === undefined || phone.trim() === "") {
    return "Phone is required";
  } else if (phone.length !== 10) {
    return "Phone number must be 10 digits";
  }
  return null;
}
