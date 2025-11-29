// js/api.js
import { API_KEYS } from './config.js';

const RAPIDAPI_HOST = 'youtube342.p.rapidapi.com';
const RAPIDAPI_URL = 'hrrps://${RAPIDAPI_HOST}/search?part=snippet&type=video';

export async function searchYouTube(query) {
  const url = `${RAPIDAPI_URL}&q=${encodeURIComponent(query)}&maxResults=10`;

  try {
    const response = await fetch(url, {
    method: 'GET',
    headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': API_KEYS.youtubeKey
    }
    });
    if (!response.ok) {
        throw new Error(`API Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
   } catch (error) {
    console.error("YouTube API Error:", error);
    return [];
   }
}
/* -----------------------------------------
   SPOONACULAR API (Search Foods)
------------------------------------------ */
export async function searchFood(query) {
  const url = `https://api.spoonacular.com/food/products/search?query=${encodeURIComponent(query)}&apiKey=${API_KEYS.spoonacularKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Spoonacular API Error:", error);
    return [];
  }
}

/* -----------------------------------------
   SPOONACULAR API (Nutrition Details)
------------------------------------------ */
export async function getFoodDetails(id) {
  const url = `https://api.spoonacular.com/food/products/${id}?apiKey=${API_KEYS.spoonacularKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Food Details Error:", error);
    return null;
  }
}