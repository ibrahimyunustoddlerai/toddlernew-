// OpenAI API Recipe Generator for ToddlerChef AI
// Replace the existing JavaScript recipe generation with GPT-powered recipes

class OpenAIRecipeGenerator {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    async generateRecipe(preferences) {
        try {
            console.log('🤖 Generating recipe with GPT...');
            
            const prompt = this.createRecipePrompt(preferences);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4', // or 'gpt-3.5-turbo' for cheaper option
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert toddler chef specializing in Jamie Oliver-style recipes for babies and toddlers. You create detailed, safe, and delicious recipes with specific measurements and clear instructions.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 2000,
                    temperature: 0.8
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            const recipeText = data.choices[0].message.content;
            
            // Parse the GPT response into structured recipe data
            return this.parseGPTResponse(recipeText);
            
        } catch (error) {
            console.error('GPT Recipe generation failed:', error);
            // Fallback to local generation if API fails
            return this.fallbackToLocalGeneration(preferences);
        }
    }

    createRecipePrompt(preferences) {
        const ingredients = [];
        if (preferences.leftovers) ingredients.push(...preferences.leftovers.split(',').map(i => i.trim()));
        if (preferences.vegetables) ingredients.push(...preferences.vegetables.split(',').map(i => i.trim()));
        
        const dietaryRestrictions = preferences.dietary || [];
        const ageRange = preferences.agerange?.[0] || '12-18 months';
        const mealType = preferences.mealtype?.[0] || 'lunch';

        return `Create a Jamie Oliver-style toddler recipe using these ingredients: ${ingredients.join(', ')}.

REQUIREMENTS:
- Age range: ${ageRange}
- Meal type: ${mealType}
- Dietary restrictions: ${dietaryRestrictions.join(', ') || 'none'}
- Must be safe for toddlers with appropriate texture and size

EXACT FORMAT NEEDED (return as JSON):
{
    "name": "3-4 word appealing recipe name",
    "oneLiner": "Max 250 character description in Jamie Oliver style",
    "review": "5-7 word parent review",
    "ingredients": ["• 60g ingredient 1, cut into 1cm pieces", "• 40g ingredient 2, specific preparation"],
    "directions": ["Step 1 with exact measurements and timing", "Step 2 with visual cues", "etc"],
    "prepTime": "X minutes",
    "cookTime": "X minutes", 
    "calories": "X calories per toddler serving",
    "costBreakdown": {
        "items": ["• Ingredient 1: £X.XX", "• Ingredient 2: £X.XX"],
        "total": "£X.XX"
    },
    "chokingWarnings": "Specific safety warnings for this recipe",
    "messLevel": {"level": 1-3, "description": "mess description"},
    "pickyEaterTips": [
        {"condition": "If situation", "solution": "practical solution"}
    ],
    "chefTips": ["Tip 1", "Tip 2"],
    "dietTags": ["Vegetarian", "Finger Food", "etc"],
    "macros": {"protein": "Xg", "carbs": "Xg", "fat": "Xg", "fiber": "Xg"}
}

Be extremely specific with measurements (use cm/mm for cutting sizes) and cooking times. No vague language like "cook until done".`;
    }

    parseGPTResponse(responseText) {
        try {
            // Try to extract JSON from the response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('No JSON found in response');
        } catch (error) {
            console.error('Failed to parse GPT response:', error);
            // Return a basic structure if parsing fails
            return this.createBasicRecipeStructure(responseText);
        }
    }

    createBasicRecipeStructure(text) {
        // Extract basic information from unstructured text
        const lines = text.split('\n').filter(line => line.trim());
        
        return {
            name: lines[0] || 'Toddler Delight',
            oneLiner: 'A delicious meal created just for your little one.',
            review: 'Amazing recipe, toddler loved it!',
            ingredients: ['• Generated ingredients from GPT'],
            directions: lines.slice(1, 6) || ['Follow GPT instructions'],
            prepTime: '10 minutes',
            cookTime: '15 minutes',
            calories: 'Approximately 150 calories per serving',
            costBreakdown: { items: ['• Ingredients: £2.50'], total: '£2.50' },
            chokingWarnings: 'Always supervise eating and ensure appropriate texture.',
            messLevel: { level: 2, description: '(2/3 - A little messy but manageable!)' },
            pickyEaterTips: [{ condition: 'If refused', solution: 'Try smaller portions' }],
            chefTips: ['Make extra portions for later'],
            dietTags: ['Toddler-Friendly'],
            macros: { protein: '4g', carbs: '18g', fat: '3g', fiber: '2g' }
        };
    }

    fallbackToLocalGeneration(preferences) {
        // Your existing JavaScript generation as fallback
        console.log('🔄 Falling back to local generation...');
        // Include your existing generateRecipe logic here
        return {
            name: 'Simple Toddler Meal',
            oneLiner: 'Nutritious and delicious meal for growing toddlers.',
            // ... rest of fallback recipe
        };
    }
}

// Usage in your recipe-template.html
async function generateRecipeWithGPT() {
    const preferences = JSON.parse(localStorage.getItem('recipePreferences') || '{}');
    
    // You'll need to get an API key from OpenAI
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Store this securely!
    
    const generator = new OpenAIRecipeGenerator(apiKey);
    const recipe = await generator.generateRecipe(preferences);
    
    // Update the page with the GPT-generated recipe
    updatePageWithRecipe(recipe);
}