// js/lessons.js - FINAL HYBRID VERSION

// 🎯 Import both search functions
import { searchYouTube, searchImages } from "./api.js";

const searchInput = document.getElementById("lessonSearch");
const resultsContainer = document.getElementById("lessonResults");

const DEFAULT_TOPICS = [
  "healthy eating for children",
  "fun fitness for kids",
  "dental hygiene steps",
  "proper handwashing technique",
];

// --------------------------------------------------------------------
// 🎯 NEW: Image Display Function (for Wikimedia results)
// NOTE: Wikimedia search only returns filenames; this links to the file page.
function displayImages(imageList) {
  resultsContainer.innerHTML = "";

  if (!imageList || imageList.length === 0) {
    resultsContainer.innerHTML = "<p>No educational images found.</p>";
    return;
  }

  imageList.forEach((item) => {
    const title = item.title;
    const card = document.createElement("div");
    card.classList.add("lesson-card");

    // Use a placeholder image or an icon for demonstration,
    // linking to the file page on Wikimedia
    card.innerHTML = `
            <a href="https://commons.wikimedia.org/wiki/${title}" target="_blank" rel="noopener noreferrer">
                <div class="image-placeholder"><img src="images/lesson_placeholder.webp" alt="${title}" class="lesson-icon"></div> 
                <h3>${title.replace("File:", "")}</h3>
                <p>Source: Wikimedia Commons (Click to view)</p>
            </a>
        `;
    resultsContainer.appendChild(card);
  });
}
// --------------------------------------------------------------------

// --- Core Display Function (for YouTube results) ---
function displayVideos(videoList) {
  resultsContainer.innerHTML = "";
  const videoItems = videoList.filter(
    (item) => item.id.kind === "youtube#video",
  );

  if (videoItems.length === 0) {
    // Use a clearer message to distinguish between error and no results
    resultsContainer.innerHTML =
      "<p>No videos found for your search. The API key may be invalid. Please try another topic.</p>";
    return;
  }

  videoItems.forEach((item) => {
    const videoId = item.id.videoId;
    const snippet = item.snippet;
    const card = document.createElement("div");
    card.classList.add("lesson-card");

    card.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer">
                <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}">
                <h3>${snippet.title}</h3>
                <p>${snippet.channelTitle}</p>
            </a>
        `;
    resultsContainer.appendChild(card);
  });
}

// --- Search Handler (Uses YouTube) ---
async function handleUserSearch() {
  const query = searchInput.value.trim();
  if (query.length < 2) {
    resultsContainer.innerHTML =
      "<p>Please type at least 2 characters to search.</p>";
    return;
  }

  resultsContainer.innerHTML = `<p>Searching for videos for "${query}"...</p>`;

  // Calls the YouTube API
  const videos = await searchYouTube(query);
  displayVideos(videos);
}

// --- Default Content Loader (Uses Wikimedia Images) ---
async function loadDefaultLessons() {
  resultsContainer.innerHTML = `<p>Loading fun educational images...</p>`;

  const randomIndex = Math.floor(Math.random() * DEFAULT_TOPICS.length);
  const defaultQuery = DEFAULT_TOPICS[randomIndex];

  searchInput.placeholder = `Default Images for: ${defaultQuery}`;

  // 🎯 Calls the Wikimedia Image API
  const images = await searchImages(defaultQuery);
  displayImages(images);
}

// --- Event Listeners and Initial Load ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load default content (images) immediately upon page load
  loadDefaultLessons();

  // 2. Attach handler to the search input for the Enter key (uses YouTube videos)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleUserSearch();
    }
  });

  // 3. If the user clears the input box, reload default content
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      loadDefaultLessons();
    }
  });
});
