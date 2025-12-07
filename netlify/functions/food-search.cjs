// Function to securely search Spoonacular products
const fetch = require('node-fetch').default;
exports.handler = async (event, context) => {
    const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY;
    const { query } = event.queryStringParameters;

    if (!SPOONACULAR_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "Spoonacular API key is missing." }) };
    }
    if (!query) {
        return { statusCode: 400, body: JSON.stringify({ error: "Query parameter is required." }) };
    }

    const url = `https://api.spoonacular.com/food/products/search?query=${encodeURIComponent(query)}&apiKey=${SPOONACULAR_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Function Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch data from Spoonacular." }) };
    }
};