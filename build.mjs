import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { text, pagePath } from "./copy.mjs";

const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function render(page, language) {
  const t = (key) => escape(text(language, key));
  const copy = (key, tag = "span", attributes = "") =>
    `<${tag} data-copy="${key}"${attributes ? " " + attributes : ""}>${t(key)}</${tag}>`;
  const route = (target, key, attributes = "") =>
    `<a data-route="${target}" data-copy="${key}" href="${pagePath(target, language)}"${attributes.trim() ? " " + attributes.trim() : ""}>${t(key)}</a>`;
  const field = (id, type, hint, max) => `<div class="field">
            <label for="${id}" data-copy="${id}">${t(id)}</label>
            ${copy(hint, "p", `class="hint" id="${id}-hint"`)}
            <input id="${id}" type="${type}" maxlength="${max}" required autocomplete="off" aria-describedby="${id}-hint" />
            <p id="${id}-error" class="field-error" hidden></p>
          </div>`;
  const body =
    page === "index"
      ? `<main id="main" class="home-main" tabindex="-1">
    <section class="home-intro" aria-labelledby="title">
      ${copy("homeTitle", "h1", 'id="title"')}
      ${copy("homeLead", "p", 'class="lead"')}
      ${route("register", "open", 'class="primary-action"')}
      ${copy("scope", "p", 'class="scope"')}
    </section>
    <dl class="steps">
      <div>${copy("complete", "dt")}${copy("completeBody", "dd")}</div>
      <div>${copy("review", "dt")}${copy("reviewBody", "dd")}</div>
      <div>${copy("restart", "dt")}${copy("restartBody", "dd")}</div>
    </dl>
  </main>`
      : `<main id="main" class="practice-main" tabindex="-1">
    <section class="form-intro" aria-labelledby="title">
      ${copy("formTitle", "h1", 'id="title"')}
      ${copy("formLead", "p", 'class="lead"')}
      ${copy("requiredHint", "p")}
    </section>
    <div class="form-content">
      ${copy("unavailable", "p", 'id="availability"')}
      <section id="errors" class="error-summary" aria-labelledby="error-title" tabindex="-1" hidden>
        <h2 id="error-title">${t("summaryMany")}</h2>
        <ul id="error-list"></ul>
      </section>
      <form id="practice-form" method="post" novalidate autocomplete="off">
        <fieldset id="practice-fields" disabled>
          ${copy("fieldsLegend", "legend", 'class="sr-only"')}
          ${field("firstName", "text", "nameHint", 80)}
          ${field("lastName", "text", "nameHint", 80)}
          ${field("email", "email", "emailHint", 254)}
          ${field("password", "password", "passwordHint", 72)}
          <div class="actions">
            ${copy("check", "button", 'type="submit"')}
            ${copy("clear", "button", 'type="reset" class="secondary"')}
          </div>
        </fieldset>
      </form>
      <p id="result" class="result" role="status" tabindex="-1" hidden></p>
    </div>
  </main>`;
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'" />
  <title>${t(page === "index" ? "homeTitle" : "formTitle")}</title>
  <link rel="icon" href="data:," />
  <link rel="stylesheet" href="styles.css" />
  <script type="module" src="app.mjs"></script>
</head>
<body data-page="${page}">
  <a class="skip" href="#main" data-copy="skip">${t("skip")}</a>
  <header>
    <div class="header-inner">
      ${route("index", "brand", 'class="brand"')}
      <nav class="primary-nav" data-label="navigation" aria-label="${t("navigation")}">
        ${route("index", "home", page === "index" ? 'aria-current="page"' : "")}
        ${route("register", "practice", page === "register" ? 'aria-current="page"' : "")}
      </nav>
      <nav class="languages" data-label="language" aria-label="${t("language")}">
        <a data-language="es" href="${pagePath(page, "es")}" hreflang="es" lang="es" ${language === "es" ? 'aria-current="page"' : ""}>ES</a>
        <span aria-hidden="true">/</span>
        <a data-language="en" href="${pagePath(page, "en")}" hreflang="en" lang="en" ${language === "en" ? 'aria-current="page"' : ""}>EN</a>
      </nav>
    </div>
  </header>
  ${body}
  <footer>${copy("attribution", "p")}</footer>
</body>
</html>
`;
}

const check = process.argv.includes("--check");
for (const page of ["index", "register"]) {
  for (const language of ["es", "en"]) {
    const path = new URL(pagePath(page, language), import.meta.url);
    const expected = render(page, language);
    if (check) {
      if ((await readFile(path, "utf8")) !== expected)
        throw new Error("Outdated generated page: " + fileURLToPath(path));
    } else await writeFile(path, expected);
  }
}
console.log(
  check
    ? "Four localized pages match their source."
    : "Four localized pages generated.",
);
