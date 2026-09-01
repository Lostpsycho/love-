// script.js
// Reads the phone number from config.js (see that file for why it's not a
// real .env — plain static sites can't read those in the browser).

const stages = [
  {
    emoji: "🐱",
    headline: "Will you go on a date with me?",
    subtext: "Highkey asking for a friend (it's me, I'm the friend) 🥺👉👈",
    footnote: 'click "nah" if you dare'
  },
  {
    emoji: "🙀",
    headline: "wait, really? click yes instead",
    subtext: "the cat is judging you rn, ngl",
    footnote: "the yes button is getting bigger for a reason"
  },
  {
    emoji: "😿",
    headline: "ok that hurt a little",
    subtext: "I already told my mom about you. don't do this to her",
    footnote: "the nah button is shrinking. that's not a bug"
  },
  {
    emoji: "😾",
    headline: "bro. BRO.",
    subtext: "I have a whole restaurant picked out and everything",
    footnote: "it's getting harder to even find that button"
  },
  {
    emoji: "🥲",
    headline: "one more click and I'm changing your contact name",
    subtext: "to 'the one that got away' 😔",
    footnote: "good luck aiming for this tiny thing"
  },
  {
    emoji: "😭",
    headline: "okay you win, I respect the commitment",
    subtext: "but the yes button is right there. it's huge now. it's basically the whole card",
    footnote: "just saying"
  }
];

const MAX_STAGE = stages.length - 1;

let stageIndex = 0;
let yesScale = 1;
let noScale = 1;

const emojiEl = document.getElementById("emoji");
const headlineEl = document.getElementById("headline");
const subtextEl = document.getElementById("subtext");
const footnoteEl = document.getElementById("footnote");
const eyebrowEl = document.getElementById("eyebrow");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const root = document.documentElement;

function renderStage(index) {
  const s = stages[index];
  emojiEl.style.transform = "scale(0.6)";
  setTimeout(() => {
    emojiEl.textContent = s.emoji;
    headlineEl.textContent = s.headline;
    subtextEl.textContent = s.subtext;
    footnoteEl.textContent = s.footnote;
    emojiEl.style.transform = "scale(1)";
  }, 140);
}

noBtn.addEventListener("click", () => {
  if (stageIndex < MAX_STAGE) {
    stageIndex += 1;
  }
  renderStage(stageIndex);

  yesScale = Math.min(yesScale + 0.16, 2.4);
  noScale = Math.max(noScale - 0.13, 0.35);

  root.style.setProperty("--yes-scale", yesScale.toFixed(2));
  root.style.setProperty("--no-scale", noScale.toFixed(2));

  if (noScale <= 0.4) {
    noBtn.style.opacity = "0.55";
  }
});

function decodePhone(encoded) {
  if (!encoded) return "";
  try {
    const reversed = atob(encoded);
    return reversed.split("").reverse().join("");
  } catch (e) {
    return "";
  }
}

const PLACE_OPTIONS = [
  "Coffee date ☕",
  "Dinner 🍝",
  "Movie night 🎬",
  "Walk in the park 🌳",
  "Surprise me 🎲"
];

function formatDate(value) {
  if (!value) return "a day soon (TBD)";
  const d = new Date(value + "T00:00:00");
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

yesBtn.addEventListener("click", () => {
  card.classList.add("answered");
  emojiEl.textContent = "🥳";
  headlineEl.textContent = "yesss, it's a date";
  eyebrowEl.textContent = "confirmed";
  footnoteEl.textContent = "pick a day and a place, then send it over";
  noBtn.remove();
  yesBtn.remove();

  subtextEl.innerHTML = "";

  const form = document.createElement("div");
  form.className = "plan-form";

  const dateLabel = document.createElement("label");
  dateLabel.className = "plan-label";
  dateLabel.textContent = "pick a day";
  dateLabel.setAttribute("for", "planDate");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "plan-input";
  dateInput.id = "planDate";

  const placeLabel = document.createElement("label");
  placeLabel.className = "plan-label";
  placeLabel.textContent = "pick a place";
  placeLabel.setAttribute("for", "planPlace");

  const placeSelect = document.createElement("select");
  placeSelect.className = "plan-input";
  placeSelect.id = "planPlace";
  PLACE_OPTIONS.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt;
    o.textContent = opt;
    placeSelect.appendChild(o);
  });

  const sendBtn = document.createElement("button");
  sendBtn.type = "button";
  sendBtn.className = "btn yes plan-send";
  sendBtn.textContent = "send it 💌";

  const confirmMsg = document.createElement("p");
  confirmMsg.className = "plan-confirm";

  form.appendChild(dateLabel);
  form.appendChild(dateInput);
  form.appendChild(placeLabel);
  form.appendChild(placeSelect);
  form.appendChild(sendBtn);
  form.appendChild(confirmMsg);

  subtextEl.appendChild(form);

  sendBtn.addEventListener("click", () => {
    const phone = typeof CONFIG !== "undefined" ? decodePhone(CONFIG.PHONE_ENCODED) : "";
    const country = (typeof CONFIG !== "undefined" && CONFIG.COUNTRY_CODE) || "";

    const chosenDate = formatDate(dateInput.value);
    const chosenPlace = placeSelect.value;
    const message = `it's a date! 📅 ${chosenDate} 📍 ${chosenPlace}`;

    if (phone) {
      const digits = phone.replace(/\D/g, "");
      const waNumber = `${country}${digits}`;
      const link = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(link, "_blank", "noopener,noreferrer");
      confirmMsg.textContent = "opening WhatsApp with your plan…";
    } else {
      confirmMsg.textContent = `plan set: ${chosenDate}, ${chosenPlace} — now go tell them in person`;
    }
  });
});
