// js/timer.js - FINAL UNIFIED TIMER LOGIC

const startButton = document.getElementById("start-timer-btn");
const timerSecondsSpan = document.getElementById("timer-seconds");
const timerMinutesSpan = document.getElementById("timer-minutes");
const timerMessage = document.getElementById("timer-message");
const dynamicInstruction = document.getElementById("dynamic-instruction");
const brushVideo = document.getElementById("brushVideo"); // Only exists on brush_timer.html
const handwashVideo = document.getElementById("handwashVideo"); // Only exists on handwash_timer.html
const rinseImage = document.getElementById("rinseImage"); // Only exists on handwash_timer.html

// 1. Define Durations and Zones
const DURATION_SECONDS = parseInt(startButton.dataset.duration) || 20;

// Brushing instructions list (for 120s timer)
const BRUSH_ZONES = {
  120: "Starting with the UPPER RIGHT side (outer teeth)!",
  90: "Move to the UPPER LEFT side (outer teeth). Keep going!",
  60: "Now switch to the BOTTOM LEFT side (outer teeth). Halfway there!",
  30: "Finish strong on the BOTTOM RIGHT side (outer teeth).",
  10: "Quick sweep of the tongue and inner surfaces!",
};

// Handwashing instructions list (for 20s timer)
const HANDWASH_ZONES = {
  20: "WET hands and LATHER with soap!",
  15: "RUB the back of your hands and between your fingers!",
  10: "SCRUB your thumbs and fingernails in your palms!",
  5: "RINSE well under running water!",
};

// Get the zone images (only available on brush_timer.html)
const zoneImages = {
  120: document.getElementById("zoneImage1"),
  90: document.getElementById("zoneImage2"),
  60: document.getElementById("zoneImage3"),
  30: document.getElementById("zoneImage4"),
};

let timeLeft;
let timerInterval;

// 2. Function to Update the Display and Logic
function updateTimerDisplay(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  timerMinutesSpan.textContent = String(minutes).padStart(2, "0");
  timerSecondsSpan.textContent = String(seconds).padStart(2, "0");

  // --- LOGIC FOR 2-MINUTE BRUSH TIMER (Handling Zone Images) ---
  if (DURATION_SECONDS === 120) {
    if (BRUSH_ZONES[totalSeconds]) {
      dynamicInstruction.textContent = BRUSH_ZONES[totalSeconds];

      // Hide all images/video
      if (brushVideo) brushVideo.style.display = "none";
      Object.values(zoneImages).forEach((img) => {
        if (img) img.style.display = "none";
      });

      // Show the appropriate media
      if (totalSeconds === 120 && brushVideo) {
        brushVideo.style.display = "block";
      }
      if (zoneImages[totalSeconds]) {
        zoneImages[totalSeconds].style.display = "block";
      }
    }
  }

  // --- LOGIC FOR 20-SECOND HANDWASH TIMER (Handling Rinse Image) ---
  if (DURATION_SECONDS === 20) {
    if (HANDWASH_ZONES[totalSeconds]) {
      dynamicInstruction.textContent = HANDWASH_ZONES[totalSeconds];

      // At 5 seconds, switch from video to static rinse image
      if (handwashVideo && totalSeconds === 5) {
        handwashVideo.style.display = "none"; // Hides the video
        if (rinseImage) rinseImage.style.display = "block"; // Shows the image
        if (handwashVideo) handwashVideo.pause();
      }
    }
  }
}

// 3. Start Timer Function
function startTimer() {
  startButton.disabled = true;
  timerMessage.textContent = "Timer started! Follow the steps.";

  // **FIXED HERE:** Ensure the video is visible before playing
  if (handwashVideo) {
    handwashVideo.style.display = "block"; // Ensure it starts visible
    if (rinseImage) rinseImage.style.display = "none"; // Ensure image is hidden
    handwashVideo.play();
  }

  // Play the relevant video for brushing
  if (brushVideo) brushVideo.play();

  // Reset time
  timeLeft = DURATION_SECONDS;
  updateTimerDisplay(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      // Final messages
      if (DURATION_SECONDS === 120) {
        timerMessage.textContent = "Time's Up! Perfect brushing! 🦷✨";
        dynamicInstruction.textContent = "You earned a healthy habit point!";
        if (brushVideo) brushVideo.pause();
      } else {
        // 20s Handwash
        timerMessage.textContent = "Time's Up! You earned a habit point! 🎉";
        if (handwashVideo) handwashVideo.pause();
        if (rinseImage) rinseImage.style.display = "none";
      }

      startButton.disabled = false;
    }
  }, 1000);
}

// 4. Initial Setup and Event Listener
document.addEventListener("DOMContentLoaded", () => {
  updateTimerDisplay(DURATION_SECONDS);
  startButton.addEventListener("click", startTimer);

  // Initial State Check: If it's the handwash page, ensure the image is hidden
  // and video is ready to be shown when started.
  if (handwashVideo) {
    if (rinseImage) rinseImage.style.display = "none";
    handwashVideo.pause();
  }
  if (brushVideo) brushVideo.pause();
});
