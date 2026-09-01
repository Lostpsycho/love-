// config.js
// This is the one place your phone number lives. The page reads it from here.
//
// Note on ".env": plain GitHub Pages sites have no server, so a browser
// can never read a real .env file — there's nothing to run it through.
// This config.js *is* your env file for a static site. Keep the number
// here, and if you ever add a build step (Vite, Next, etc.) later, you
// can swap this for a real .env + import.meta.env without touching
// index.html or script.js.
//
// The number below is stored reversed + base64-encoded so it doesn't sit
// in your repo as a plain, searchable string. script.js decodes it right
// before building the WhatsApp link. Worth knowing: this only stops
// casual skimming of the source — it's not real security, since anything
// a browser needs to use is technically readable by a determined person.
// If you want it truly hidden, the repo itself needs to be private.

const CONFIG = {
  PHONE_ENCODED: "MTk2MTA0OTMyNg==", // decode: base64 -> reverse the string
  COUNTRY_CODE: "91" // change if the number isn't a US/Canada number
};
