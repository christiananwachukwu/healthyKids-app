// js/api.js - FINAL UNIFIED API FILE

import { API_KEYS } from './config.js';

// ----------------------------------------- YOUTUBE API (Video Search) ------------------------------------------
// Used for user searches (requires valid Google API Key)

const GOOGLE_API_HOST = 'www.googleapis.com';
const YOUTUBE_SEARCH_ENDPOINT = `https://${GOOGLE_API_HOST}/youtube/v3/search`;

export async function searchYouTube(query) {
   
    // Uses the standard Google endpoint and the key from config.js
    const url = `${YOUTUBE_SEARCH_ENDPOINT}?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=10&key=${API_KEYS.youtubeKey}`;

    try {
        const response = await fetch(url);
       
        if (!response.ok) {
            // Logs detailed error from Google, often saying API key is invalid or quota exceeded
            const errorText = await response.text();
            console.error(`YouTube API Request failed with status: ${response.status}`, errorText);
            throw new Error(`API Request failed with status: ${response.status}`);
        }
       
        const data = await response.json();
        return data.items || [];
       
    } catch (error) {
        console.error("YouTube API Error:", error);
        return [];
    }
}

// ----------------------------------------- WIKIMEDIA COMMONS API (Image Search) ------------------------------------------
// Used for default content on page load (No key required, highly reliable)

export async function searchImages(query) {
    const WIKIMEDIA_ENDPOINT = 'https://commons.wikimedia.org/w/api.php';
   
    // Searches for files (images, namespace 6) on Wikimedia Commons
    const url = `${WIKIMEDIA_ENDPOINT}?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&origin=*`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Wikimedia API request failed: ${response.status}`);
        }
        const data = await response.json();
       
        // Returns the search list of file names/titles
        return data.query.search || [];
    } catch (error) {
        console.error("Wikimedia API Error:", error);
        return [];
    }
}

// ----------------------------------------- SPOONACULAR API (Search Foods) ------------------------------------------
// Existing Nutrition Search function

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

// ----------------------------------------- SPOONACULAR API (Nutrition Details) ------------------------------------------
// Existing Nutrition Details function

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