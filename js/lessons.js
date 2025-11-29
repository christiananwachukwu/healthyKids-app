// js/lessons.js
import { searchYouTube } from './api.js';

const searchInput = document.getElementById('lessonSearch');
const resultsContainer = document.getElementById('lessonResults');

// Trigger search when user types
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();

  if (query.length < 2) {
    resultsContainer.innerHTML = "";
    return;
  }

  const videos = await searchYouTube(query);
  displayVideos(videos);
});

// Display video cards
function displayVideos(videoList) {
  resultsContainer.innerHTML = "";

  if (!videoList || videoList.length === 0) {
    resultsContainer.innerHTML = "<p>No videos found.</p>";
    return;
  }

  videoList.forEach(item => {
    const videoId = item.id.videoId;
    const snippet = item.snippet;

    const card = document.createElement('div');
    card.classList.add('lesson-card');

    card.innerHTML = `
      <img src="${snippet.thumbnails.high.url}" alt="${snippet.title}">
      <h3>${snippet.title}</h3>
      <p>${snippet.channelTitle}</p>
    `;

    // Open video when clicked
    card.addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    });

    resultsContainer.appendChild(card);
  });
}