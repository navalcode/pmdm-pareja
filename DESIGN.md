# Design: a local form with explicit recovery

Two independent internal references were inspected before frontend work: a centered home introduction above ruled steps, and an asymmetric introduction beside an open form. The implementation keeps their typographic hierarchy, paper/ink/copper palette, open structure, 12px control corners and clear action hierarchy. It omits decorative icons, fake registration/account states and unverified historical media. Concepts stay internal; docs/images contains actual browser captures.

## Composition and interaction

Outfit is served locally with its full OFL. Paper #FAF8F3, ink #202421, secondary #5E625C and copper #9B432F follow the shared system; boundaries use #74776D. Desktop uses 1240px width, 48px insets and unequal form columns. At 720px the header uses two rows and the form stacks with 20px gutters. The home has three ruled definition rows, not repeated cards. Its title and primary action fit at 1366×768 and 360×800; the desktop form submit ends at 677px.

Inputs/buttons are at least 48px high. Navigation and error-summary links have targets of at least 44px. Wrapped summary links are block elements so bullets align with the first line. Focus uses a visible 3px outline, and the only transition is a 160ms field border change with a reduced-motion override. Browser/OS preference emulation and screen-reader certification were not performed.

Empty submit focuses a summary whose links focus their corresponding fields. Inputs reference help and error text and expose aria-invalid. After an attempted check, editing updates relevant errors. Locale changes preserve the live draft and translate messages; they do not serialize values into the URL. Success is a local check result, not account creation, and clears the example password. Reset clears every field/error and focuses the first field.

## Language and fallback

Spanish product resources and English fallback share a key set. Four generated static pages give both languages actual navigation targets and correct initial copy. With scripts, changing language updates textContent/labels/routes and replaces only the page pathname. Without scripts, home/language links still navigate, while the form remains disabled with a localized explanation.

## Data and scope

All fields are fictional examples. No backend exists. Submit is canceled before validation; fields have no serializable name attributes, CSP prohibits form actions/connections, and controls are enabled only after handlers are installed. There is no storage/cookie/fetch/beacon implementation. Common ASCII email checks and illustrative password length constraints are not identity verification or production security guarantees.

The original paired authorship remains explicit. Historical image/text blobs are preserved but not used or relicensed. The review adds original local implementations rather than importing proprietary material. Thirteen local tests, generated-page consistency, source/HTTP hashes and actual browser paths are recorded in docs/verification.json. No new hosted CI or Pages deployment is claimed.
