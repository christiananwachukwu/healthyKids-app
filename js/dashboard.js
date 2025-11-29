// js/dashboard.js
import { loadData } from "./storage.js";

const TRACKER_KEY = "healthyKidsTracker";

const brushStats = document.getElementById("brushStats");
const handwashStats = document.getElementById("handwashStats");
const waterStats = document.getElementById("waterStats");

// Load data
const trackerData = loadData(TRACKER_KEY) || {};

const dates = Object.keys(trackerData).slice(-7); // last 7 days

let brushCount = 0;
let handwashCount = 0;
let waterCount = 0;

dates.forEach(date => {
  const record = trackerData[date];

  if (record.brushed) brushCount++;
  if (record.handwash) handwashCount++;
  if (record.water) waterCount++;
});

// Update UI
brushStats.textContent = `${brushCount} / 7 days`;
handwashStats.textContent = `${handwashCount} / 7 days`;
waterStats.textContent = `${waterCount} / 7 days`;