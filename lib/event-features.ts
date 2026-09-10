// Server-side release switch shared by the page and its submission endpoint.
// Keep registration unavailable unless explicitly enabled for an environment.
export function isEventRegistrationEnabled() {
  return process.env.EVENT_REGISTRATION_ENABLED === "true";
}
