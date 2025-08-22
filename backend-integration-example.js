// Backend Server Integration Example
// This approach keeps your API key secure on the server

// Frontend code (add to recipe-template.html)
async function generateRecipeViaBackend() {
    try {
        const preferences = JSON.parse(localStorage.getItem('recipePreferences') || '{}');
        
        console.log('🌐 Sending request to backend...');
        
        const response = await fetch('/api/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferences)
        });
        
        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }
        
        const recipe = await response.json();
        updatePageWithRecipe(recipe);
        
    } catch (error) {
        console.error('Backend recipe generation failed:', error);
        // Fallback to local generation
        generateRecipeLocally();
    }
}

// Backend server code (Node.js/Express example)
// File: server.js
const express = require('express');
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Store in environment variables
});

app.use(express.json());
app.use(express.static('.')); // Serve your HTML files

app.post('/api/generate-recipe', async (req, res) => {
    try {
        const preferences = req.body;
        
        const prompt = createRecipePrompt(preferences);
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert toddler chef specializing in Jamie Oliver-style recipes for babies and toddlers.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.8
        });

        const recipeText = completion.choices[0].message.content;
        const recipe = parseGPTResponse(recipeText);
        
        res.json(recipe);
        
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Recipe generation failed' });
    }
});

function createRecipePrompt(preferences) {
    // Same prompt creation logic as before
    const ingredients = [];
    if (preferences.leftovers) ingredients.push(...preferences.leftovers.split(',').map(i => i.trim()));
    if (preferences.vegetables) ingredients.push(...preferences.vegetables.split(',').map(i => i.trim()));
    
    return `Create a Jamie Oliver-style toddler recipe using: ${ingredients.join(', ')}...`;
}

function parseGPTResponse(responseText) {
    // Same parsing logic as before
    try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No JSON found');
    } catch (error) {
        return createBasicRecipeStructure(responseText);
    }
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// To run this server:
// 1. npm init -y
// 2. npm install express openai
// 3. Set OPENAI_API_KEY environment variable
// 4. node server.js