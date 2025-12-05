// js/utils.js

// Create an HTML element from a string
export function createElement(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html.trim();
  return temp.firstChild;
}

// Format text: Capitalize
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Show a loading spinner
export function showLoading(element) {
  element.innerHTML = `<p class="loading">Loading...</p>`;
}

// Clear an element
export function clear(element) {
  element.innerHTML = "";
}
