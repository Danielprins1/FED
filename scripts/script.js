/* de grappengenerator in de footer */

// 1. de elementen selecteren
const grapKnop = document.querySelector("footer > section:nth-of-type(4) button");
const grapTekst = document.querySelector("footer > section:nth-of-type(4) p");

// de grappen en de teller die bijhoudt welke je ziet
const grappen = [
    "Welke planeet is heel blij? Joepi-ter!",
    "Wat is het tegenovergestelde van een vuurvlieg? Een waterval..",
    "Wat zegt een haai als hij een clownvis eet? Smaakt een beetje grappig!"
];

let huidigeGrap = 0;

// 2. luisteren naar klik
grapKnop.onclick = volgendeGrap;

// 3. de volgende grap
function volgendeGrap() {
    huidigeGrap = huidigeGrap + 1;

    // weer vooraan beginnen als je aan het eind bent
    if (huidigeGrap >= grappen.length) {
        huidigeGrap = 0;
    }

    grapTekst.textContent = grappen[huidigeGrap];
}

//* product toevoegen aan het winkelmandje 
const minderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)");
// alle plusknoppen in één keer selecteren
const plusKnoppen = document.querySelectorAll("main article button");
const mandjeTeller = document.querySelector("header output");
const mandjeLink = document.querySelector("header output").closest("a");

let aantalInMandje = 0;

// elke knop afzonderlijk laten luisteren
for (const knop of plusKnoppen) {
    knop.onclick = voegToe;
}


// class weer weghalen zodra de animatie klaar is,
// anders speelt hij de tweede keer niet opnieuw af
mandjeTeller.addEventListener("animationend", verwijderSprong);

function verwijderSprong() {
    mandjeTeller.classList.remove("sprong");
}


function voegToe(event) {
    aantalInMandje = aantalInMandje + 1;
    mandjeTeller.textContent = aantalInMandje;
    mandjeLink.setAttribute("aria-label", "winkelmandje, " + aantalInMandje + " producten");
    mandjeTeller.classList.add("sprong");

    // de reep alleen laten vliegen als de bezoeker beweging wil zien
    if (minderBeweging.matches === false) {
        laatReepVliegen(event.currentTarget);
    }
}

/* --- de reep vliegt naar het mandje --- */

function laatReepVliegen(knop) {
    // de afbeelding in hetzelfde kaartje als de knop
    const reep = knop.closest("article").querySelector("img");

    // waar staat de reep nu, en waar moet hij heen?
    const start = reep.getBoundingClientRect();
    const doel = mandjeTeller.getBoundingClientRect();

    // een kopie maken die mag vliegen
    const kopie = reep.cloneNode();
    kopie.classList.add("vliegt");

    // de coördinaten doorgeven aan de CSS
    kopie.style.setProperty("--start-x", start.left + "px");
    kopie.style.setProperty("--start-y", start.top + "px");
    kopie.style.setProperty("--eind-x", doel.left + "px");
    kopie.style.setProperty("--eind-y", doel.top + "px");
    kopie.style.setProperty("--breedte", start.width + "px");

    document.body.append(kopie);

    // opruimen zodra hij er is
    kopie.addEventListener("animationend", function () {
        kopie.remove();
    });
}
