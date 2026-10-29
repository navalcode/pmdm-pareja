import { text, pagePath } from "./copy.mjs";
import { FIELDS, fieldError, validate } from "./validation.mjs";

const page = document.body.dataset.page;
let language = document.documentElement.lang;
const form = document.querySelector("#practice-form");
const fields = form
  ? Object.fromEntries(FIELDS.map((key) => [key, document.getElementById(key)]))
  : {};
let errors = {};
let attempted = false;
let result = "";

function renderForm() {
  if (!form) return;
  for (const field of FIELDS) {
    const input = fields[field];
    const error = document.getElementById(field + "-error");
    const code = errors[field];
    error.textContent = code ? text(language, "error." + code) : "";
    error.hidden = !code;
    input.setAttribute(
      "aria-describedby",
      field + "-hint" + (code ? " " + field + "-error" : ""),
    );
    if (code) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
  const summary = document.querySelector("#errors");
  const list = document.querySelector("#error-list");
  list.replaceChildren();
  const keys = Object.keys(errors);
  document.querySelector("#error-title").textContent = text(
    language,
    keys.length === 1 ? "summaryOne" : "summaryMany",
  );
  for (const field of keys) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + field;
    link.textContent =
      text(language, field) + ": " + text(language, "error." + errors[field]);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      fields[field].focus();
    });
    item.append(link);
    list.append(item);
  }
  summary.hidden = keys.length === 0;
  const status = document.querySelector("#result");
  status.textContent = result ? text(language, result) : "";
  status.hidden = !result;
}

function renderLanguage() {
  document.documentElement.lang = language;
  document.title = text(language, page === "index" ? "homeTitle" : "formTitle");
  for (const element of document.querySelectorAll("[data-copy]"))
    element.textContent = text(language, element.dataset.copy);
  for (const element of document.querySelectorAll("[data-label]"))
    element.setAttribute("aria-label", text(language, element.dataset.label));
  for (const link of document.querySelectorAll("[data-route]"))
    link.href = pagePath(link.dataset.route, language);
  for (const link of document.querySelectorAll("[data-language]")) {
    link.href = pagePath(page, link.dataset.language);
    if (link.dataset.language === language)
      link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  renderForm();
}

if (form) {
  if (FIELDS.some((field) => !fields[field]))
    throw new Error("Incomplete practice form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    attempted = true;
    result = "";
    errors = validate(
      Object.fromEntries(FIELDS.map((field) => [field, fields[field].value])),
    );
    if (Object.keys(errors).length === 0) {
      fields.password.value = "";
      result = "checked";
      attempted = false;
    }
    renderForm();
    document.querySelector(result ? "#result" : "#errors").focus();
  });
  form.addEventListener("reset", () => {
    attempted = false;
    errors = {};
    result = "cleared";
    renderForm();
    queueMicrotask(() => fields.firstName.focus());
  });
  for (const field of FIELDS) {
    const update = () => {
      result = "";
      if (attempted) {
        const code = fieldError(field, fields[field].value);
        if (code) errors[field] = code;
        else delete errors[field];
      }
      renderForm();
    };
    fields[field].addEventListener("input", update);
  }
}

for (const link of document.querySelectorAll("[data-language]")) {
  link.addEventListener("click", (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    language = link.dataset.language;
    renderLanguage();
    history.replaceState(null, "", pagePath(page, language));
  });
}

renderLanguage();
if (form) {
  document.querySelector("#availability").hidden = true;
  document.querySelector("#practice-fields").disabled = false;
}
