const form = document.querySelector("#guess-form");
const input = document.querySelector("#guess-input");
const message = document.querySelector("#message");
const attemptCount = document.querySelector("#attempt-count");
const resetButton = document.querySelector("#reset-button");

let secretNumber;
let attempts;
let gameOver;

function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;
  attemptCount.textContent = attempts;
  input.value = "";
  input.disabled = false;
  message.textContent = "Make your first guess!";
  message.className = "message";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (gameOver) return;

  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    message.textContent = "Enter a whole number from 1 to 100.";
    message.className = "message error";
    return;
  }

  attempts += 1;
  attemptCount.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent = `You got it in ${attempts} ${attempts === 1 ? "guess" : "guesses"}! 🎉`;
    message.className = "message success";
    gameOver = true;
    input.disabled = true;
  } else if (guess < secretNumber) {
    message.textContent = "Too low — try a bigger number.";
    message.className = "message";
  } else {
    message.textContent = "Too high — try a smaller number.";
    message.className = "message";
  }

  if (!gameOver) {
    input.value = "";
    input.focus();
  }
});

resetButton.addEventListener("click", startNewGame);
startNewGame();
