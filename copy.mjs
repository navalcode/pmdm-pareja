export const COPY = {
  en: {
    brand: "Forms",
    navigation: "Main navigation",
    language: "Language",
    home: "Home",
    practice: "Practice",
    skip: "Skip to content",
    homeTitle: "A form, step by step.",
    homeLead: "Fill in fictional fields, review the errors and start again.",
    open: "Open practice",
    scope: "Local practice. It sends no data and creates no account.",
    complete: "Fill in",
    completeBody: "Use example values to try the fields.",
    review: "Review",
    reviewBody: "Errors are explained next to each field.",
    restart: "Reset",
    restartBody: "Clear the values to begin another check.",
    attribution:
      "Original paired practice · Manuel Naval and Alejandro Ramírez",
    formTitle: "Check the form.",
    formLead: "Local practice. It sends no data and creates no account.",
    requiredHint: "All four fields are required. Use fictional values.",
    fieldsLegend: "Example fields",
    firstName: "Fictional first name",
    lastName: "Fictional surname",
    nameHint: "Up to 80 characters.",
    email: "Example email",
    emailHint: "For example, ada@example.invalid. This checks format only.",
    password: "Example password",
    passwordHint:
      "For practice only: 8–72 characters. Do not use a real password.",
    check: "Check form",
    clear: "Clear",
    unavailable:
      "JavaScript is needed to check this practice. Fields stay disabled while it is unavailable.",
    summaryOne: "Review the indicated field.",
    summaryMany: "Review the indicated fields.",
    checked:
      "Check complete. No data was sent and no account was created. The example password has been cleared.",
    cleared: "Fields cleared. You can start another check.",
    "error.required": "Complete this field.",
    "error.control": "Remove line breaks and control characters.",
    "error.nameLength": "Use up to 80 characters.",
    "error.emailLength": "Use an email of up to 254 characters.",
    "error.emailFormat": "Use an email such as ada@example.invalid.",
    "error.passwordLength": "Use 8–72 characters for this example.",
  },
  es: {
    brand: "Formularios",
    navigation: "Navegación principal",
    language: "Idioma",
    home: "Inicio",
    practice: "Práctica",
    skip: "Saltar al contenido",
    homeTitle: "Un formulario, paso a paso.",
    homeLead:
      "Completa campos ficticios, revisa los errores y vuelve a empezar.",
    open: "Abrir práctica",
    scope: "Práctica local. No envía datos ni crea una cuenta.",
    complete: "Completar",
    completeBody: "Usa datos de ejemplo para probar los campos.",
    review: "Revisar",
    reviewBody: "Los errores se explican junto a cada campo.",
    restart: "Restablecer",
    restartBody: "Limpia los valores para comenzar otra prueba.",
    attribution:
      "Práctica original en pareja · Manuel Naval y Alejandro Ramírez",
    formTitle: "Comprueba el formulario.",
    formLead: "Práctica local. No envía datos ni crea una cuenta.",
    requiredHint: "Los cuatro campos son obligatorios. Usa valores ficticios.",
    fieldsLegend: "Campos de ejemplo",
    firstName: "Nombre ficticio",
    lastName: "Apellidos ficticios",
    nameHint: "Hasta 80 caracteres.",
    email: "Email de ejemplo",
    emailHint:
      "Por ejemplo, ada@example.invalid. Solo se comprueba el formato.",
    password: "Contraseña de ejemplo",
    passwordHint:
      "Solo para practicar: 8–72 caracteres. No uses una contraseña real.",
    check: "Comprobar formulario",
    clear: "Limpiar",
    unavailable:
      "Esta práctica necesita JavaScript para comprobar los campos. Permanecen deshabilitados mientras no esté disponible.",
    summaryOne: "Revisa el campo indicado.",
    summaryMany: "Revisa los campos indicados.",
    checked:
      "Comprobación completada. No se han enviado datos ni creado una cuenta. La contraseña de ejemplo se ha borrado.",
    cleared: "Campos limpios. Puedes comenzar otra prueba.",
    "error.required": "Completa este campo.",
    "error.control": "Quita los saltos de línea y caracteres de control.",
    "error.nameLength": "Usa hasta 80 caracteres.",
    "error.emailLength": "Usa un email de hasta 254 caracteres.",
    "error.emailFormat": "Usa un email como ada@example.invalid.",
    "error.passwordLength": "Usa entre 8 y 72 caracteres para este ejemplo.",
  },
};

export function text(language, key) {
  const value = COPY[language]?.[key] ?? COPY.en[key];
  if (typeof value !== "string")
    throw new RangeError("Unknown copy key: " + key);
  return value;
}

export function pagePath(page, language) {
  if (!["index", "register"].includes(page))
    throw new RangeError("Unknown page");
  return page + (language === "en" ? ".en" : "") + ".html";
}
