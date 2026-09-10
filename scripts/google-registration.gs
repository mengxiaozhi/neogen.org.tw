// Retired 2026-09-10: keep existing responses in the original Google Form.
// The new form must collect identity, consent and branching answers in Google Forms.
const REGISTRATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe-Rg7S0rSBlEUfXWQH12bRS86au6uT-kU2L6lhFkhfUKZ0ng/viewform';
function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  return json_({ service: 'neogen-registration-2027', configured: false, mode: 'google-forms', formUrl: REGISTRATION_FORM_URL });
}
function doPost() {
  return json_({ ok: false, code: 'CLOSED', reason: 'FORM_REPLACED', formUrl: REGISTRATION_FORM_URL });
}
function setupRegistration() {
  throw new Error('This legacy connector is retired. Manage the new form in Google Forms; do not recreate its questions.');
}
