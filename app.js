//Access all boxes
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let newGameButton = document.querySelector("#newGame");
let message = document.querySelector("#message");
let messageContainer = document.querySelector(".messageContainer");
let turnIndicator = document.querySelector("#turnIndicator");

let turnO = true; //true = O turn; false = X turn
const winsPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key; 
  if (key >= "1" && key <= "9") {
    const index = parseInt(key) - 1;
    const box = boxes[index];
    if (!box.disabled) {
      box.click(); // Trigger click event on the box
    }
  }
});

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO; // Switch turn
    turnIndicator.innerText = `Turn: ${turnO ? "O" : "X"}`;
    checkWinner();
  });
});


// Reset the game
const resetGame = () => {
  turnO = true;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "rgb(199, 117, 24)";
  });
  messageContainer.classList.add("hide");
  turnIndicator.innerText = "Turn: O";
};


//disable all boxes
const disableAllBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes
const enableAllBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinnerMessage = (winner, pattern) => {
  message.innerText = `Congratulations, ${winner} is the Winner!`;
  messageContainer.classList.remove("hide"); // Show the message container
  disableAllBoxes();
  pattern.forEach((index) => {
    boxes[index].style.backgroundColor = "limegreen";
  });
};

const checkWinner = () => {
  for (let pattern of winsPattern) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinnerMessage(val1, pattern);
      return;
    }
  } 

const allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled) {
    message.innerText = "It's a Draw!";
    messageContainer.classList.remove("hide");
  }
};  

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
