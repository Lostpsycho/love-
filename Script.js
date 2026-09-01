const phoneNumber = "916239401691";

const messages = [

    {
        image: "🙀",
        title: "WAIT... you said NO?! 😭",
        text: "Okay okay... maybe reconsider? 🥺👉👈"
    },

    {
        image: "😿",
        title: "Ouch. That hurt. 💔",
        text: "I'm going to pretend you didn't click that."
    },

    {
        image: "🥺",
        title: "PLEASE 😭",
        text: "Look at this face. How can you say no?"
    },

    {
        image: "😾",
        title: "EXCUSE ME?! 😤",
        text: "You have another chance. Choose wisely."
    },

    {
        image: "😭",
        title: "BROOOOO 😭😭",
        text: "I'm running out of dignity here."
    },

    {
        image: "🥹",
        title: "Last chance... 🥹",
        text: "Just press the BIG pink button."
    },

    {
        image: "😔",
        title: "Seriously? 😔",
        text: "After everything we've been through..."
    }

];


let noClicks = 0;


const noButton = document.getElementById("noBtn");
const yesButton = document.getElementById("yesBtn");

const image = document.getElementById("cat");
const title = document.getElementById("title");
const subtext = document.getElementById("subtext");

const questionScreen = document.getElementById("question");
const resultScreen = document.getElementById("result");

const whatsappButton = document.getElementById("whatsappBtn");


/* -------------------------
   NO BUTTON
------------------------- */

noButton.addEventListener("click", function () {

    const message =
        messages[Math.min(noClicks, messages.length - 1)];


    /* Change image */

    image.textContent = message.image;


    /* Change text */

    title.textContent = message.title;

    subtext.textContent = message.text;


    /* Little animation */

    image.style.transform =
        "scale(1.15) rotate(" +
        (noClicks % 2 === 0 ? "-4deg" : "4deg") +
        ")";


    setTimeout(function () {

        image.style.transform =
            "scale(1) rotate(0deg)";

    }, 300);


    noClicks++;


    /* Change button text */

    if (noClicks >= messages.length) {

        noButton.textContent = "STILL NO?! 😭";

    }


    /* Move NO button */

    moveNoButton();

});


/* -------------------------
   MOVE NO BUTTON
------------------------- */

function moveNoButton() {

    const area =
        document.querySelector(".button-area");


    const maxX =
        area.clientWidth - noButton.offsetWidth;


    const maxY =
        area.clientHeight - noButton.offsetHeight;


    const randomX =
        Math.random() * Math.max(maxX, 0);


    const randomY =
        Math.random() * Math.max(maxY, 0);


    noButton.style.left =
        randomX + "px";


    noButton.style.top =
        randomY + "px";


    noButton.style.transform =
        "none";
}


/* -------------------------
   YES BUTTON
------------------------- */

yesButton.addEventListener("click", function () {

    questionScreen.style.display = "none";

    resultScreen.style.display = "block";


    const message =
        "YES! FR FR 💅❤️ I saw your question... " +
        "so when are you taking me on that date? 👀";


    whatsappButton.href =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    createHearts();

});


/* -------------------------
   HEART ANIMATION
------------------------- */

function createHearts() {

    for (let i = 0; i < 25; i++) {

        setTimeout(function () {

            const heart =
                document.createElement("div");


            heart.className = "heart";


            const hearts = [
                "❤️",
                "💕",
                "💗",
                "💖",
                "✨"
            ];


            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() * hearts.length
                    )
                ];


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.animationDuration =
                (3 + Math.random() * 2) + "s";


            document.body.appendChild(heart);


            setTimeout(function () {

                heart.remove();

            }, 5000);

        }, i * 80);

    }

}
