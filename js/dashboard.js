// js/dashboard.js
import { loadData } from "./storage.js";

const TRACKER_KEY = "healthyKidsTracker";

// 1. DOM Elements (Add new stats elements to profile.html if not already there!)
const brushStats = document.getElementById("brushStats");
const handwashStats = document.getElementById("handwashStats");
const waterStats = document.getElementById("waterStats");

// 🎯 New DOM Elements (You must add these IDs to your profile.html dashboard)
const fruitVegStats = document.getElementById("fruitVegStats");
const activityStats = document.getElementById("activityStats");

const chartCanvas = document.getElementById("progressChart"); // The canvas element

// 2. Data Calculation
const trackerData = loadData(TRACKER_KEY) || {};
const dates = Object.keys(trackerData).slice(-7); // Last 7 unique dates

let brushCount = 0;
let handwashCount = 0;
let waterCount = 0;
let fruitVegCount = 0; // 🎯 NEW COUNT
let activityCount = 0; // 🎯 NEW COUNT

dates.forEach((date) => {
  const record = trackerData[date];

  if (record.brushed) brushCount++;
  if (record.handwash) handwashCount++;
  if (record.water) waterCount++;
  if (record.fruitVeg) fruitVegCount++; // 🎯 COUNT NEW HABIT
  if (record.activity) activityCount++; // 🎯 COUNT NEW HABIT
});

// 3. Update UI Summary
brushStats.textContent = `${brushCount} / 7 days`;
handwashStats.textContent = `${handwashCount} / 7 days`;
waterStats.textContent = `${waterCount} / 7 days`;

// 🎯 Update NEW UI STATS
if (fruitVegStats) fruitVegStats.textContent = `${fruitVegCount} / 7 days`;
if (activityStats) activityStats.textContent = `${activityCount} / 7 days`;

// --- 4. VANILLA CHARTING LOGIC (UPDATED FOR 5 BARS) ---

/**
 * Draws a simple bar chart on the canvas using the habit counts.
 * @param {HTMLCanvasElement} canvas The canvas element to draw on.
 * @param {Array<number>} data The count data [brush, handwash, water, fruitVeg, activity].
 */
function drawProgressChart(canvas, data) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const counts = data;
  const labels = ["Brush", "Wash", "Water", "Fruit/Veg", "Activity"]; // 5 Labels
  const maxCount = 7;
  const numBars = counts.length;

  // Adjust layout for 5 bars
  const barWidth = 45;
  const spacing = 55;
  const totalChartWidth = numBars * barWidth + (numBars - 1) * spacing;
  const startX = (width - totalChartWidth) / 2;

  const chartBottom = height - 20;
  const chartTop = 20;
  const scale = (chartBottom - chartTop) / maxCount;

  // Font settings
  ctx.font = "10px var(--font-body)";
  ctx.textAlign = "center";

  counts.forEach((count, index) => {
    const barHeight = count * scale;
    const x = startX + index * (barWidth + spacing);
    const y = chartBottom - barHeight;

    // Bar Background (Max 7)
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(x, chartTop, barWidth, chartBottom - chartTop);

    // Progress Bar
    const barColor = count === maxCount ? "#90ee90" : "#add8e6";
    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Label (Below the bar)
    ctx.fillStyle = "#333";
    ctx.fillText(labels[index], x + barWidth / 2, chartBottom + 15);

    // Count (On top of the bar)
    ctx.fillStyle = count > 0 ? "white" : "#333";
    ctx.fillText(`${count}`, x + barWidth / 2, y + 15);
  });
}

// Execute the chart drawing with the calculated data
drawProgressChart(chartCanvas, [
  brushCount,
  handwashCount,
  waterCount,
  fruitVegCount,
  activityCount,
]);
