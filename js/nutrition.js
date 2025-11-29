import { searchFood, getFoodDetails } from './api.js';

// DOM Elements
const searchInput = document.getElementById('foodSearch');
const searchResultsContainer = document.getElementById('searchResults');
const detailsPanel = document.getElementById('nutritionDetails');
const detailTitle = document.getElementById('detailTitle');
const detailsContent = document.getElementById('detailsContent');

// --- Main Search Handler ---
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();

    // Only search if the query is at least 3 characters long
    if (query.length < 3) {
        searchResultsContainer.innerHTML = "";
        detailsPanel.style.display = 'none';
        return;
    }

    searchResultsContainer.innerHTML = '<p class="loading">Searching...</p>';

    // 1. Call the Spoonacular search function
    const foods = await searchFood(query);
   
    // 2. Display the list of food products
    displayFoodResults(foods, query);
});

// --- Display Search Results ---
function displayFoodResults(foods, query) {
    if (!foods || foods.length === 0) {
        searchResultsContainer.innerHTML = `<p class="no-results">No food products found for "${query}".</p>`;
        return;
    }

    // Create a list of clickable food items
    const foodListHTML = foods.map(food => `
        <div class="food-result-card" data-id="${food.id}" data-name="${food.title}">
            <img src="https://spoonacular.com/productImages/${food.id}-100x100.jpg" alt="${food.title}" class="food-thumbnail">
            <span class="food-title">${food.title}</span>
        </div>
    `).join('');

    searchResultsContainer.innerHTML = foodListHTML;
   
    // Add click listeners to each result card
    document.querySelectorAll('.food-result-card').forEach(card => {
        card.addEventListener('click', () => {
            const foodId = card.getAttribute('data-id');
            const foodName = card.getAttribute('data-name');
            fetchAndDisplayDetails(foodId, foodName);
        });
    });
}

// --- Fetch and Display Nutrition Details ---
async function fetchAndDisplayDetails(foodId, foodName) {
    detailsPanel.style.display = 'block';
    detailTitle.textContent = foodName;
    detailsContent.innerHTML = '<p class="loading">Loading nutrition details...</p>';
   
    // 1. Call the Spoonacular details function
    const details = await getFoodDetails(foodId);

    if (!details || !details.nutrition) {
        detailsContent.innerHTML = '<p class="no-data">Could not retrieve detailed nutrition information for this item.</p>';
        return;
    }
   
    // 2. Extract and format the key nutrition facts
    const nutritionFacts = details.nutrition.nutrients;
    const keyNutrients = {};
   
    // Filter for the main facts relevant to a kid's app
    const targetNutrients = ['Calories', 'Fat', 'Carbohydrates', 'Sugar', 'Protein', 'Fiber', 'Sodium'];

    nutritionFacts.forEach(nutrient => {
        if (targetNutrients.includes(nutrient.name)) {
            keyNutrients[nutrient.name] = `${nutrient.amount} ${nutrient.unit}`;
        }
    });

    // 3. Render the details content
    detailsContent.innerHTML = `
        <ul class="nutrition-list">
            <li><strong>Calories:</strong> ${keyNutrients.Calories || 'N/A'}</li>
            <li><strong>Protein:</strong> ${keyNutrients.Protein || 'N/A'}</li>
            <li><strong>Carbohydrates:</strong> ${keyNutrients.Carbohydrates || 'N/A'}</li>
            <li><strong>Sugar:</strong> ${keyNutrients.Sugar || 'N/A'}</li>
            <li><strong>Fat:</strong> ${keyNutrients.Fat || 'N/A'}</li>
            <li><strong>Fiber:</strong> ${keyNutrients.Fiber || 'N/A'}</li>
            <li><strong>Sodium:</strong> ${keyNutrients.Sodium || 'N/A'}</li>
        </ul>
        <p class="serving-info">Serving size information may vary.</p>
    `;

    const imageBox = document.getElementById('detailsImage');
    imageBox.innerHTML = `<img src="https://spoonacular.com/productImages/${foodId}-312x231.jpg"
    alt="${foodName}"
    class="details-image"
    onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
    `;
}

async function fetchProduct(productId) {
    const apiKey = 'b8833077255d4180bc2327d4d4380e93';
    const url = `https://api.spoonacular.com/food/products/${productId}?apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (response.status === 402) {
            // Payment required - show friendly message or fallback
            console.warn(`Payment required for product ${productId}`);
            return { error: "API limit reached or plan restriction. Please try later." };
        }

        if (!response.ok) {
            // Handle other HTTP errors
            console.error(`Error fetching product ${productId}: ${response.status}`);
            return { error: "Unable to fetch product info." };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Network or fetch error: ${error}`);
        return { error: "Network error occurred." };
    }
}

// Example usage:
fetchProduct(9568182).then(result => {
    if (result.error) {
        // Show fallback UI or message
        document.getElementById('productInfo').innerText = result.error;
    } else {
        // Display product data normally
        document.getElementById('productInfo').innerText = JSON.stringify(result, null, 2);
    }
});