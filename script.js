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

yesBtn.addEventListener("click", () => {
  card.classList.add("answered");
  emojiEl.textContent = "🥳";
  headlineEl.textContent = "yesss, it's a date";
  eyebrowEl.textContent = "confirmed";
  footnoteEl.textContent = "";
  noBtn.remove();

  function decodePhone(encoded) {
    if (!encoded) return "";
    try {
      const reversed = atob(encoded);
      return reversed.split("").reverse().join("");
    } catch (e) {
      return "";
    }
  }

  const phone = typeof CONFIG !== "undefined" ? decodePhone(CONFIG.PHONE_ENCODED) : "";
  const country = (typeof CONFIG !== "undefined" && CONFIG.COUNTRY_CODE) || "";

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    const waNumber = `${country}${digits}`;
    subtextEl.innerHTML = "";
    const link = document.createElement("a");
    link.href = `https://wa.me/${waNumber}?text=${encodeURIComponent("it's a yes 🎉")}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "btn yes";
    link.style.display = "inline-block";
    link.style.textDecoration = "none";
    link.style.marginTop = "6px";
    link.textContent = "text me now 💌";
    subtextEl.appendChild(link);
  } else {
    subtextEl.textContent = "go tell them in person, this is exciting";
  }
});
