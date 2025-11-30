// js/tracker.js

import { saveData, loadData } from "./storage.js";

const TRACKER_KEY = "healthyKidsTracker";
const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)

// DOM elements (5 HABITS)
const brushCheck = document.getElementById("brushCheckbox");
const handwashCheck = document.getElementById("handwashCheckbox");
const waterCheck = document.getElementById("waterCheckbox");
const fruitVegCheck = document.getElementById("fruitVegCheckbox"); // 🎯 NEW
const activityCheck = document.getElementById("activityCheckbox"); // 🎯 NEW

const saveBtn = document.getElementById("saveTracker");
const messageBox = document.getElementById("trackerMessage");

// Load previous data
let trackerData = loadData(TRACKER_KEY) || {};

// 1. --- LOAD TODAY'S STATUS ---
function loadDailyStatus() {
    const todayRecord = trackerData[today];

    if (todayRecord) {
        // Set the checked state based on saved data, defaulting to false if undefined
        brushCheck.checked = todayRecord.brushed || false;
        handwashCheck.checked = todayRecord.handwash || false;
        waterCheck.checked = todayRecord.water || false;
        fruitVegCheck.checked = todayRecord.fruitVeg || false;  // 🎯 LOAD NEW HABIT
        activityCheck.checked = todayRecord.activity || false; // 🎯 LOAD NEW HABIT

        messageBox.textContent = "Today's progress loaded successfully.";
    }
}

// 2. --- SAVE TODAY'S PROGRESS ---
saveBtn.addEventListener("click", () => {
   
    // Create or overwrite today's record
    trackerData[today] = {
        brushed: brushCheck.checked,
        handwash: handwashCheck.checked,
        water: waterCheck.checked,
       
        // 🎯 SAVE NEW HABITS
        fruitVeg: fruitVegCheck.checked,
        activity: activityCheck.checked,
    };

    saveData(TRACKER_KEY, trackerData);

    messageBox.textContent = "Your progress has been saved! 🎉";
    messageBox.style.color = "var(--fresh-green)"; // Use CSS variable for consistency

    // Clear message after 3 seconds
    setTimeout(() => (messageBox.textContent = ""), 3000);
});

// 3. --- RUN on PAGE LOAD ---
document.addEventListener("DOMContentLoaded", loadDailyStatus);