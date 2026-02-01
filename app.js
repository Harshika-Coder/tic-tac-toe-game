//Access all boxes
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let newGameButton = document.querySelector("#newGame");
let message = document.querySelector("#message");
let messageContainer = document.querySelector(".messageContainer");

let turnO = true; //true = O turn; false = X turn
const winsPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [2, 4, 6],
  [6, 7, 8],
];

// keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase(); // Get the key pressed in lowercase
  if (key >= "1" && key <= "9") {
    const index = parseInt(key) - 1;
    const box = boxes[index];
    if (!box.disabled) {
      box.click(); // Trigger click event on the box
    }
  }
});

//Add event listener to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box clicked");
    if (turnO === true) {
      //O turn
      box.innerText = "O";
      turnO = false;
    } else {
      //X turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //disable the box after click

    //Check for win
    checkWinner();
  });
});

// Reset the game
const resetGame = () => {
  turnO = true; //O starts first
  enableAllBoxes();
  messageContainer.classList.add("hide"); // Hide the message container
};

//disable all boxes
const disableAllBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes
const enableAllBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinnerMessage = (winner) => {
  message.innerText = `Congratulations, ${winner} is the Winner!`;
  messageContainer.classList.remove("hide"); // Show the message container
  disableAllBoxes();
};

const checkWinner = () => {
  for (let index of winsPattern) {
    let box1 = boxes[index[0]].innerText;
    let box2 = boxes[index[1]].innerText;
    let box3 = boxes[index[2]].innerText;

    if (box1 !== "" && box2 !== "" && box3 !== "") {
      if (box1 === box2 && box2 === box3) {
        // use alert to show winner
        alert(box1, `is the Winner!`);
        // display winner message in the message container
        showWinnerMessage(box1);
      }
    }
  }
};
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
