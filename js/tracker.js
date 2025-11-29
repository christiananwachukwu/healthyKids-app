// js/tracker.js
import { saveData, loadData } from "./storage.js";

const TRACKER_KEY = "healthyKidsTracker";

// DOM elements
const brushCheck = document.getElementById("brushCheckbox");
const handwashCheck = document.getElementById("handwashCheckbox");
const waterCheck = document.getElementById("waterCheckbox");
const saveBtn = document.getElementById("saveTracker");
const messageBox = document.getElementById("trackerMessage");

// Load previous data
let trackerData = loadData(TRACKER_KEY) || {};

// Save today's progress
saveBtn.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];

  trackerData[today] = {
    brushed: brushCheck.checked,
    handwash: handwashCheck.checked,
    water: waterCheck.checked,
  };

  saveData(TRACKER_KEY, trackerData);

  messageBox.textContent = "Your progress has been saved! 🎉";
  messageBox.style.color = "green";

  setTimeout(() => (messageBox.textContent = ""), 3000);
});