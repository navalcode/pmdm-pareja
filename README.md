# Paired form practice

[Español](README.es.md) · [Design](DESIGN.md) · [Executed checks](docs/verification.json)

A historical paired HTML exercise, reviewed as a small local form practice. The original authors are **Manuel Naval and Alejandro Ramírez**. This review adds clear navigation, field validation, ES/EN resources and accessible error recovery while preserving the original credits and history.

<img src="docs/images/form-en-desktop.png" alt="Actual English practice on a laptop, with four labeled fictional fields and visible actions" width="900" />

The practice sends no field values and creates no account. The old `POST /registro` had no backend; it has been replaced with an explicit browser-only check. Name, surname, email and password are fictional examples.

## Run locally

From this repository, serve the existing static files with Python 3:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/index.html` for Spanish or `index.en.html` for English. The existing `register.html` entry remains; `register.en.html` is its English counterpart. Use HTTP rather than opening files directly so the browser can load ES modules. No package installation or backend is needed.

The home page and language/navigation links work without scripts. Form fields stay disabled until their handlers are installed; an explanation remains visible when JavaScript is unavailable.

## What to try

- Submit empty fields: a focused summary links to each input, and errors reference the corresponding hint.
- Correct a field or change ES/EN: entered values stay in the live form, and messages translate.
- Submit a valid fictional example with Enter: a local completion message appears and the example password is cleared.
- Clear: every value/error is reset and focus returns to the first field.

Names accept up to 80 UTF-16 code units, email up to 254 and the example password 8–72. Controls and blank required values are rejected. Email validation covers common ASCII mailbox/domain shapes; it does not verify delivery, identity or every RFC-valid address. The password length is a teaching constraint, not a production authentication policy.

<img src="docs/images/form-es-mobile.png" alt="Actual Spanish form at 360 pixels" width="260" />
<img src="docs/images/form-es-error-mobile.png" alt="Actual mobile errors, preserved fictional fields and keyboard focus on the email input" width="260" />

## Implementation and checks

`copy.mjs` contains ES and fallback EN resources. `build.mjs` generates the four committed HTML pages; `app.mjs` handles DOM state and `validation.mjs` contains pure validation. There is no framework, CDN or runtime dependency. Local Outfit includes its full [OFL notice](fonts/OFL.txt).

For editing and tests, use Node.js 22 (verified with 22.22.3):

```sh
node build.mjs
node build.mjs --check
node --test tests/validation.test.mjs
```

Thirteen local tests passed. Browser paths cover laptop, 360-pixel mobile and horizontal layouts, keyboard, errors, correction, language, reset and a controlled copy without the script element. All ten served assets match source bytes. These are local checks; no new hosted CI, Pages deployment, screen-reader certification or physical-device claim is made.

The form cancels submit before validation, has no serializable input names, and uses `form-action 'none'` / `connect-src 'none'` in its CSP. Values remain only in the page; there is no storage, cookie, fetch or beacon code. The observed form workflow added zero HTTP requests. Dynamic copy uses `textContent`; values are never interpolated into HTML. This small exercise is not an account service.

## Original scope and credits

The original image and text remain as historical files but are not loaded by this UI; no new license or provenance claim is made for them. Existing coursework is not relicensed by this review. [Component details](THIRD_PARTY.md).

<details>
<summary>Original documentation and credits · Documentación y créditos originales</summary>

# pmdm-pareja
## Manuel, Naval Rodríguez.
## Alejandro, Ramírez Ramos.
---
Repositorio dedicado a hacer ejercicios de práctica en pareja. 

</details>

[More mobile engineering work](https://github.com/navalcode)
