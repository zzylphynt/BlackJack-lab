let dealerSum,
  yourSum,
  dealerAceCount,
  yourAceCount = 0;

let hidden;
let deck;
let canHit = true;

//* On Load

window.onload = () => {
  buildDeck();
  shuffleDeck();
};

//* Func build deck

let buildDeck = () => {
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < types.length; j++) {
      deck.push(`${values[i]}-${types[j]}.png`); //? Concatenated so that the array result matches the img names.
    }
  }
};

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}
