const cards = document.querySelectorAll('.memory-card');

const reloadButton = document.getElementById('reload-button');

reloadButton.addEventListener('click', () => {
    location.reload();
});


let hasFLippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return; // verhindert, dass der spieler zu schnell klickt -- während die Karte zurückgedreht wird.
    if (this === firstCard) return; // (this) referenziert die Karte die aktuell angeklickt wird. der vergleich prüft ob der Spieler dieselbe Karte zweimal angeklickt hat. Wenn ja, passiert nichts! 
    this.classList.toggle('flip'); // fügt der angeklickten Karte die Klasse "flip" hinzu, wenn sie nicht vorhanden ist, oder entfernt sie, wenn sie vorhanden ist. 

    if (!hasFLippedCard) { // prüft ob schon eine Karte angeklickt wurde 
        //erster Klick
        hasFLippedCard = true; 
        firstCard = this;
        return;
    } //zweiter klick
        hasFLippedCard = false;
        secondCard = this;
        
        checkForMatch(); //ruft die Methode checkForMatch() auf. 
    }

// Check ob ein Match erzielt wurde!
function checkForMatch() {

    let isMatch = firstCard.dataset.framework ===
        secondCard.dataset.framework
    isMatch ? disableCards() : unflipCards();    
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        }, 1000);
}

function resetBoard() {
    [hasFLippedCard, lockBoard] = [false, false]; // hasFlippedCard wird auf false zurückgesetzt, da kein Kartenpaar aktiv sein soll. --lockboard wird auf false zurückgesetzt um das SPielfeld wieder zu entsperren.
    [firstCard, secondCard] = [null, null]; // firstCard und secondCard speichert ob sie angeklickt wurden. Sie werden danach auf null gesetzt um die Referenz zu entfernen. 
}

// Mischen funktion, damit die Memorykarten random generiert wird.
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));