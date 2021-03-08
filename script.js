const gameContainer = document.getElementById("game");
let twoClicked = false;
let card1 = null;
let card2 = null;
let cardsMatched = 0;
let numOfAttempts = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);

  // Checks to see if two cards have been clicked to prevent further clicks.
  if (twoClicked) {
    return;
  }

  numOfAttempts++;

  let currentCard = event.target;
  console.log("Current Card: ", currentCard);

  currentCard.style.backgroundColor = currentCard.className;

  // Assigns card values and if 2 cards clicked sets 'twoClicked' to true.
  if (card1 === null) {
    card1 = currentCard;
    console.log("Card 1: ", card1)
    card1.removeEventListener('click', handleCardClick);
  } else if (card2 === null) {
    card2 = currentCard;
    console.log("Card 2: ", card2)
    card2.removeEventListener('click', handleCardClick);
    twoClicked = true;
  }

  if (card1 && card2) {
    if (card1.className === card2.className) {
      console.log("They Match")
      cardsMatched += 2;
      card1 = null;
      card2 = null;
      twoClicked = false;
    } else {
      console.log("They do not match")

      setTimeout(function() {
      card1.style.backgroundColor = "white";
      card2.style.backgroundColor = "white";
      card1.addEventListener('click', handleCardClick);
      card2.addEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      twoClicked = false;
      }, 1000)
    }
  }

  // Checks for win.
  setTimeout(function() {
    if (cardsMatched === 10) {
      numOfAttempts /= 2;
      alert("You win!\nIt took you " + numOfAttempts + " tries.")
      location.reload();
    }
  }, 500);

}

// when the DOM loads
createDivsForColors(shuffledColors);
