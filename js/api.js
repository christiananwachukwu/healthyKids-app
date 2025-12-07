// js/api.js - SECURE FRONTEND LOGIC (Final Version)

// ----------------------------------------- WIKIMEDIA COMMONS API (Image Search) ------------------------------------------
// Remains direct as it is key-less and must be called by the browser.
export async function searchImages(query) {
  const WIKIMEDIA_ENDPOINT = "https://commons.wikimedia.org/w/api.php";

  const url = `${WIKIMEDIA_ENDPOINT}?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Wikimedia API request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.query.search || [];
  } catch (error) {
    console.error("Wikimedia API Error:", error);
    return [];
  }
}

// ----------------------------------------- YOUTUBE API (Secure Proxy Search) ------------------------------------------
// Calls the secure Netlify Function endpoint: /youtube-search
export async function searchYouTube(query) {
  const url = `/youtube-search?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `YouTube Proxy Request failed with status: ${response.status}`,
        errorText,
      );
      throw new Error(`Proxy Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("YouTube Proxy Error:", error);
    return [];
  }
}

// ----------------------------------------- SPOONACULAR API (Secure Proxy Search) ------------------------------------------
// Calls the secure Netlify Function endpoint: /food-search
export async function searchFood(query) {
  const url = `/food-search?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Spoonacular Proxy Error:", error);
    return [];
  }
}

// ----------------------------------------- SPOONACULAR API (Secure Proxy Details) ------------------------------------------
// Calls the secure Netlify Function endpoint: /food-details
export async function getFoodDetails(id) {
  const url = `/food-details?id=${encodeURIComponent(id)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Food Details Proxy Error:", error);
    return null;
  }
}