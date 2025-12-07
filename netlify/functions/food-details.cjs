// Function to securely get Spoonacular product details
const fetch = require('node-fetch').default;
exports.handler = async (event, context) => {
    const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY;
    const { id } = event.queryStringParameters;

    if (!SPOONACULAR_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "Spoonacular API key is missing." }) };
    }
    if (!id) {
        return { statusCode: 400, body: JSON.stringify({ error: "Product ID is required." }) };
    }

    const url = `https://api.spoonacular.com/food/products/${id}?apiKey=${SPOONACULAR_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Function Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch details from Spoonacular." }) };
    }
};