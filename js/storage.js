// js/storage.js

// Save any data to localStorage
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Load saved data
export function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}