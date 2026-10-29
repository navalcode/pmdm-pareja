export const FIELDS = Object.freeze([
  "firstName",
  "lastName",
  "email",
  "password",
]);

const controls = /\p{Cc}/u;

function emailFormat(value) {
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (
    !local ||
    local.length > 64 ||
    !/^[a-z0-9.!#$%&'*+\/=?^_\x60{|}~-]+$/iu.test(local)
  )
    return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return false;
  const labels = domain.split(".");
  return (
    labels.length > 1 &&
    labels.every((label) =>
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/iu.test(label),
    ) &&
    /^[a-z]{2,63}$/iu.test(labels.at(-1))
  );
}

export function fieldError(field, value) {
  if (!FIELDS.includes(field)) throw new RangeError("Unknown practice field");
  const raw = typeof value === "string" ? value : "";
  if (!raw.trim()) return "required";
  if (controls.test(raw)) return "control";
  if (field === "firstName" || field === "lastName") {
    return raw.length > 80 ? "nameLength" : null;
  }
  if (field === "email") {
    if (raw.length > 254) return "emailLength";
    return emailFormat(raw.trim()) ? null : "emailFormat";
  }
  return raw.length < 8 || raw.length > 72 ? "passwordLength" : null;
}

export function validate(values = {}) {
  const errors = {};
  for (const field of FIELDS) {
    const code = fieldError(field, values[field]);
    if (code) errors[field] = code;
  }
  return errors;
}
