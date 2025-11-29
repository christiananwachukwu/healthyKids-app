// js/games.js

// Handwashing timer (20 seconds)
const handwashGame = document.getElementById("handwashGame");

handwashGame.addEventListener("click", () => {
  alert("Start washing your hands! Timer: 20 seconds.");

  let timeLeft = 20;
  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Great job! You washed your hands for 20 seconds! 🎉");
    }
    timeLeft--;
  }, 1000);
});

// Teeth brushing timer (2 minutes)
const brushGame = document.getElementById("brushGame");

brushGame.addEventListener("click", () => {
  alert("Start brushing your teeth! Timer: 2 minutes.");

  let timeLeft = 120;
  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Nice work! You brushed for 2 minutes! 🦷✨");
    }
    timeLeft--;
  }, 1000);
});

// Simple health quiz
const quizGame = document.getElementById("quizGame");

quizGame.addEventListener("click", () => {
  const answer = prompt("How long should you wash your hands?\nA) 5 seconds\nB) 10 seconds\nC) 20 seconds");

  if (answer?.toLowerCase() === "c") {
    alert("Correct! 🎉");
  } else {
    alert("Oops! The correct answer is C: 20 seconds.");
  }
});