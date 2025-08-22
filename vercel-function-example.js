// Vercel Serverless Function Example
// File: api/generate-recipe.js (in Vercel project)

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const preferences = req.body;
        
        const prompt = createRecipePrompt(preferences);
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert toddler chef specializing in Jamie Oliver-style recipes. 
                    Create safe, delicious, and age-appropriate recipes with:
                    - Specific measurements in grams/ml
                    - Cutting sizes in cm/mm
                    - Exact cooking times
                    - Visual completion cues
                    - Safety warnings for toddlers
                    - Cost breakdown using UK supermarket prices
                    - Nutritional information appropriate for age`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2500,
            temperature: 0.7
        });

        const recipeText = completion.choices[0].message.content;
        
        // Parse and structure the recipe
        const recipe = parseGPTResponse(recipeText);
        
        res.status(200).json(recipe);
        
    } catch (error) {
        console.error('Recipe generation error:', error);
        res.status(500).json({ 
            error: 'Recipe generation failed',
            fallback: true
        });
    }
}

function createRecipePrompt(preferences) {
    const ingredients = [];
    if (preferences.leftovers) {
        ingredients.push(...preferences.leftovers.split(',').map(i => i.trim()));
    }
    if (preferences.vegetables) {
        ingredients.push(...preferences.vegetables.split(',').map(i => i.trim()));
    }
    
    const dietaryRestrictions = preferences.dietary || [];
    const ageRange = preferences.agerange?.[0] || '12-18 months';
    const mealType = preferences.mealtype?.[0] || 'lunch';
    const notes = preferences.notes || '';

    return `Create a detailed Jamie Oliver-style toddler recipe with these specifications:

INGREDIENTS TO USE: ${ingredients.join(', ')}
AGE RANGE: ${ageRange}
MEAL TYPE: ${mealType}
DIETARY RESTRICTIONS: ${dietaryRestrictions.join(', ') || 'none'}
ADDITIONAL NOTES: ${notes}

RETURN EXACTLY THIS JSON STRUCTURE:
{
    "name": "3-4 word appealing recipe name",
    "oneLiner": "Under 250 characters, Jamie Oliver conversational style description",
    "review": "5-7 word parent review quote",
    "ingredients": [
        "• [exact weight]g [ingredient], [specific prep with cm measurements]",
        "• [measurement] [ingredient], [detailed preparation]"
    ],
    "directions": [
        "Step with exact measurements, times, and visual cues",
        "Another step with specific techniques and completion indicators"
    ],
    "prepTime": "[X] minutes",
    "cookTime": "[X] minutes",
    "calories": "Approximately [X] calories per toddler serving",
    "costBreakdown": {
        "items": [
            "• [Ingredient]: £[X.XX]",
            "• [Ingredient]: £[X.XX]"
        ],
        "total": "£[X.XX]"
    },
    "chokingWarnings": "Specific warnings for this recipe and age group",
    "messLevel": {
        "level": [1-3],
        "description": "([level]/3 - [description])"
    },
    "pickyEaterTips": [
        {
            "condition": "If [specific situation]:",
            "solution": "Practical, actionable solution"
        }
    ],
    "chefTips": [
        "Jamie Oliver style cooking tip",
        "Another practical tip for parents"
    ],
    "dietTags": ["Accurate tags based on actual ingredients"],
    "macros": {
        "protein": "[X]g",
        "carbs": "[X]g", 
        "fat": "[X]g",
        "fiber": "[X]g"
    }
}

CRITICAL REQUIREMENTS:
- NO vague language like "cook until done" or "add vegetables"
- Specify EXACT ingredients with weights: "60g chicken breast", "40g basmati rice"
- Include cutting sizes: "cut into 1cm cubes", "dice into 0.5cm pieces"
- Give precise cooking times: "cook for 8-10 minutes" not "cook until ready"
- Include visual completion cues: "until golden brown", "until tender enough to mash"
- Make diet tags accurate to actual ingredients (don't say Vegetarian if using chicken)
- Cost breakdown should use realistic UK supermarket prices
- Safety warnings must be specific to the ingredients and age range used`;
}

function parseGPTResponse(responseText) {
    try {
        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            
            // Validate required fields
            if (!parsed.name || !parsed.ingredients || !parsed.directions) {
                throw new Error('Missing required recipe fields');
            }
            
            return parsed;
        }
        throw new Error('No JSON structure found in response');
        
    } catch (error) {
        console.error('Failed to parse GPT response:', error);
        
        // Create fallback structure
        return {
            name: 'Toddler Recipe',
            oneLiner: 'A nutritious meal perfect for growing toddlers.',
            review: 'Delicious and toddler approved!',
            ingredients: ['• Recipe generated by AI'],
            directions: ['Follow the cooking instructions provided'],
            prepTime: '10 minutes',
            cookTime: '15 minutes',
            calories: 'Approximately 150 calories per serving',
            costBreakdown: { items: ['• Ingredients: £3.00'], total: '£3.00' },
            chokingWarnings: 'Always supervise eating and ensure appropriate texture for age.',
            messLevel: { level: 2, description: '(2/3 - A little messy but manageable!)' },
            pickyEaterTips: [{ condition: 'If refused:', solution: 'Try offering smaller portions alongside familiar foods.' }],
            chefTips: ['Make extra portions and freeze for quick future meals'],
            dietTags: ['Toddler-Friendly'],
            macros: { protein: '4g', carbs: '18g', fat: '3g', fiber: '2g' }
        };
    }
}

// Frontend integration (add to recipe-template.html)
/* 
async function generateRecipeWithVercel() {
    try {
        const preferences = JSON.parse(localStorage.getItem('recipePreferences') || '{}');
        
        const response = await fetch('https://your-app.vercel.app/api/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferences)
        });
        
        if (!response.ok) {
            throw new Error('Vercel function error');
        }
        
        const recipe = await response.json();
        updatePageWithRecipe(recipe);
        
    } catch (error) {
        console.error('Vercel recipe generation failed:', error);
        // Fallback to local generation
        generateRecipe();
    }
}
*/