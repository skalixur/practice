const [maxX, maxY] = [window.innerWidth, window.innerHeight];
const counterElement = document.querySelector(".counter");
const messageElement = document.querySelector(".message");

let successThreshold = parseInt(localStorage.getItem("successThreshold")) || 7;

let count = parseInt(localStorage.getItem("count")) ?? 0;
let shouldDisplayMessage = false;

updateCountDisplay();
document.addEventListener("click", (e) => {
  const { x, y } = e;
  const [percentX, percentY] = [x / maxX, y / maxY];
  const isTopHalf = percentY < 0.5;

  if (isTopHalf) count = 0;
  else count += 1;

  if (count === successThreshold) shouldDisplayMessage = true;
  else shouldDisplayMessage = false;
  if (count > successThreshold) count = 0;

  updateMessageDisplay();
  updateCountDisplay();
});

function updateMessageDisplay() {
  if (shouldDisplayMessage) {
    messageElement.textContent = getRandomMessage();
    messageElement.style.opacity = 1;
  } else messageElement.style.opacity = 0;
}

function getRandomMessage() {
  const messages = ["good job", "well done", "onto the next"];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return randomMessage;
}

function updateCountDisplay() {
  localStorage.setItem("count", count);
  counterElement.textContent = count;
}
