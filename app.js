let dealerSum = 0,
  yourSum = 0,
  dealerAceCount = 0,
  yourAceCount = 0;

let hidden;
let deck;
let canHit = true;

//*     On Load

window.onload = () => {
  buildDeck();
  shuffleDeck();
  startGame();
};

//*    Func build deck

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
      deck.push(`${values[i]}-${types[j]}.png`); //?   Concatenated so that the array result matches the img names.
    }
  }
};

//?    This function shuffles the deck whit the Fisher-Yates algorithm

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

//*    Start Game Func

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount = checkAce(hidden);

  //   ? Dealing cards
  //* Dealer
  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card;
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }

  //* Player (you)

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }
  //?  Hit, Stay, and New Game Button
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("new-game").addEventListener("click", newGame);
}

//* hit button

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card;
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
    stay(true);
  }
}

//*   stay button

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden;

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  }
  //both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
}
//* New Game button

function newGame() {
  location.reload();
}

//*    Value of cards Func
function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    //?   if: isNotANumber _ value do-

    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

//*    Ace card condition

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

//* Ace to 1 or 11

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
