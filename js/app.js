/*
 * Create a list that holds all of your cards
 */
let classNames  = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
  ]
let openCards = [];
let openCardsIndex = [];
let deck = document.getElementById("deck")


const cardHtml = (card) => 
  `<li class="card">
      <i class="${card}"></i>
  </li>`;
const addCard = (El,index) => {
  openCards.push(El.children[0].className.split(" ")[1].substring(3));
  openCardsIndex.push(index);
}

const isMatch = openCards => openCards[0] === openCards[1] && openCardsIndex[0] !== openCardsIndex[1]
const openMatchedCards = openCardsIndex => {
  cards = Array.from(cards);
  cards[openCardsIndex[0]].classList.remove("open");
  cards[openCardsIndex[0]].classList.remove("show");
  cards[openCardsIndex[0]].classList.add("match");
  cards[openCardsIndex[1]].classList.remove("open");
  cards[openCardsIndex[1]].classList.remove("show");
  cards[openCardsIndex[1]].classList.add("match");
  removeOpenCards()
};
const removeOpenCards = () => {
  for (const card of cards) {
    card.classList.remove("open");
    card.classList.remove("show");
    card.classList.remove("error");
  }
  openCards = [];
  openCardsIndex = [];
  return console.log("Removed open cards.")
}

const makeRed = () => {
  cards[openCardsIndex[0]].classList.add("error");
  cards[openCardsIndex[1]].classList.add("error");
}
// timer https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
//setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
}}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(classNames)
for (const className of classNames) {
  deck.insertAdjacentHTML('beforeend', cardHtml(className));
}

let cards = document.getElementsByClassName("card")

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

for (let [i,card] of Array.from(cards).entries() ) {
  card.addEventListener("click", event => {
    if (openCards.length > 2) return console.log("More than 2 elementss Already")
    card.classList.add("open");
    card.classList.add("show");
    addCard(card,i);
    if (openCards.length === 2 && !isMatch(openCards)) {
      makeRed();
      setTimeout(() => removeOpenCards(),200);
      
    } else if (openCards.length === 1 ) {
      return "One element is showing."
    } else {
      
      openMatchedCards(openCardsIndex)
    }
    
  })
}





