import test from "node:test";
import assert from "node:assert/strict";
import { FIELDS, fieldError, validate } from "../validation.mjs";
import { COPY, text, pagePath } from "../copy.mjs";

const example = () => ({
  firstName: "Álex",
  lastName: "Demo",
  email: "ada+test@example.invalid",
  password: "fictional-only",
});
test("Unicode names and a common plus-addressed example pass without mutating input", () => {
  const values = Object.freeze(example());
  assert.deepEqual(validate(values), {});
  assert.equal(values.firstName, "Álex");
});
test("every blank or missing required field is reported", () => {
  assert.deepEqual(
    validate(),
    Object.fromEntries(FIELDS.map((key) => [key, "required"])),
  );
  assert.deepEqual(
    validate({
      firstName: "  ",
      lastName: null,
      email: "\t",
      password: "        ",
    }),
    Object.fromEntries(FIELDS.map((key) => [key, "required"])),
  );
});
test("both names enforce the 80-unit boundary", () => {
  for (const field of ["firstName", "lastName"]) {
    assert.equal(fieldError(field, "x".repeat(80)), null);
    assert.equal(fieldError(field, "x".repeat(81)), "nameLength");
  }
});
test("control characters are rejected in every field", () => {
  for (const field of FIELDS)
    assert.equal(fieldError(field, example()[field] + "\u0001"), "control");
});
test("malformed common email shapes are rejected", () => {
  for (const value of [
    "ada",
    "ada@",
    "@example.invalid",
    "ada@@example.invalid",
    "ada@example",
    "ada@ex ample.invalid",
    "ada@.invalid",
    "ada@example..invalid",
    "ada..demo@example.invalid",
    "ada@-example.invalid",
    "a".repeat(65) + "@example.invalid",
  ]) {
    assert.equal(fieldError("email", value), "emailFormat");
  }
});
test("email boundary is checked before format and does not truncate", () => {
  const max =
    "a".repeat(64) +
    "@" +
    "b".repeat(63) +
    "." +
    "c".repeat(63) +
    "." +
    "d".repeat(61);
  assert.equal(max.length, 254);
  assert.equal(fieldError("email", max), null);
  assert.equal(fieldError("email", max + "x"), "emailLength");
});
test("password example length is bounded at both ends", () => {
  for (const size of [7, 73])
    assert.equal(fieldError("password", "x".repeat(size)), "passwordLength");
  for (const size of [8, 72])
    assert.equal(fieldError("password", "x".repeat(size)), null);
});
test("a corrected field leaves other errors intact in a fresh validation", () => {
  const values = { ...example(), email: "bad", lastName: "" };
  assert.deepEqual(validate(values), {
    lastName: "required",
    email: "emailFormat",
  });
  values.email = "ada@example.invalid";
  assert.deepEqual(validate(values), { lastName: "required" });
});
test("markup remains an ordinary name value rather than being transformed into HTML", () => {
  const values = example();
  values.firstName = "<svg>fiction</svg>";
  assert.deepEqual(validate(values), {});
  assert.equal(values.firstName, "<svg>fiction</svg>");
});
test("unknown fields cannot silently gain a validation rule", () => {
  assert.throws(() => fieldError("account", "demo"), RangeError);
});
test("ES and fallback EN have the same complete resource keys", () => {
  assert.deepEqual(Object.keys(COPY.es).sort(), Object.keys(COPY.en).sort());
  for (const key of Object.keys(COPY.en))
    assert.ok(text("es", key) && text("en", key));
});
test("unsupported locale falls back to English and unknown keys fail visibly", () => {
  assert.equal(text("fr", "check"), "Check form");
  assert.throws(() => text("en", "missing"), RangeError);
});
test("localized routes stay relative and keep both historical entry names", () => {
  assert.equal(pagePath("index", "es"), "index.html");
  assert.equal(pagePath("register", "es"), "register.html");
  assert.equal(pagePath("register", "en"), "register.en.html");
  assert.throws(() => pagePath("account", "en"), RangeError);
});
