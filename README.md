# will-you-go-on-a-date-with-me

A one-page "will you go on a date with me?" card. Click "nah" and it keeps
changing the image/text, shrinking the "nah" button and growing "yes! fr fr"
until you give in. Clicking "yes" reveals a WhatsApp link to the number in
`config.js`.

## Files
- `index.html` — the page
- `style.css` — all styling
- `script.js` — the click logic (stage cycling, button growth/shrink, yes handler)
- `config.js` — **your phone number lives here**, used to build the WhatsApp link
- `.env` — reference copy of the number only (browsers can't read this on a static site — see note below)
- `.gitignore` — keeps `.env` out of git

## About the phone number / ".env"
You asked to keep the number in an env file. Worth knowing upfront: a plain
static site (like GitHub Pages) has no server, so a browser literally cannot
read a `.env` file — there's nothing that runs it. Because of that:

- `config.js` is the file the page actually reads the number from, and it
  **does** need to be uploaded/committed for the site to work.
- `.env` is kept as your own private record and is git-ignored, in case you
  later add a real build tool (Vite, Next.js, etc.) — at that point you'd
  swap `config.js` for real `import.meta.env` / `process.env` usage without
  touching `index.html` or `script.js`.

**The number itself isn't stored in plain text.** In `config.js` it's
reversed and base64-encoded, and `script.js` decodes it right before
building the WhatsApp link — so a quick skim of your repo won't show your
digits. Be clear-eyed about what this does and doesn't do: it stops casual
searching/skimming, but it's not real security. Anything a browser needs
in order to work is technically readable by someone determined enough to
open dev tools and decode it. If you want it genuinely hidden, make the
GitHub repo **private** — that's the only real guarantee.

## How to upload to GitHub
1. Unzip this folder.
2. Go to your GitHub repo → **Add file → Upload files**.
3. Drag in all files (`index.html`, `style.css`, `script.js`, `config.js`,
   `.gitignore`; skip `.env`, it's just for you).
4. Commit.
5. To make it a live link: repo **Settings → Pages → Deploy from branch →
   main → / (root) → Save**. Your page will be live at
   `https://<your-username>.github.io/<repo-name>/`.

That's it — no build step, no npm install, just static files.
