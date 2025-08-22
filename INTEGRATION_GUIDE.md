# GPT Integration Guide for ToddlerChef AI

## 🎯 Quick Implementation Steps

### **Step 1: Get OpenAI API Key**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create account and add billing
3. Generate API key from API Keys section
4. **Important**: Keep this key secret!

### **Step 2: Choose Integration Method**

## 🔧 Method 1: Direct Client-Side (Easiest - 5 minutes)

Replace your `generateRecipe()` function in `recipe-template.html`:

```javascript
async function generateRecipe() {
    try {
        const preferences = JSON.parse(localStorage.getItem('recipePreferences') || '{}');
        
        // Show loading state
        document.getElementById('title').textContent = 'GPT is cooking up your recipe...';
        
        const recipe = await generateWithGPT(preferences);
        updatePageWithRecipe(recipe);
        
    } catch (error) {
        console.error('GPT failed, using local generation:', error);
        generateRecipeLocally(); // Your existing function as fallback
    }
}

async function generateWithGPT(preferences) {
    const apiKey = 'YOUR_API_KEY_HERE'; // ⚠️ REPLACE WITH REAL KEY
    
    const ingredients = [];
    if (preferences.leftovers) ingredients.push(...preferences.leftovers.split(',').map(i => i.trim()));
    if (preferences.vegetables) ingredients.push(...preferences.vegetables.split(',').map(i => i.trim()));
    
    const prompt = `Create a Jamie Oliver-style toddler recipe using: ${ingredients.join(', ')}
    
Age: ${preferences.agerange?.[0] || '12-18 months'}
Dietary: ${preferences.dietary?.join(', ') || 'none'}
Meal: ${preferences.mealtype?.[0] || 'lunch'}

Return as JSON with these exact fields:
{
    "name": "3-4 word name",
    "oneLiner": "Jamie Oliver style description under 250 chars",
    "review": "5-7 word parent review",
    "ingredients": ["• 60g ingredient, cut into 1cm pieces"],
    "directions": ["Exact step with measurements and timing"],
    "prepTime": "X minutes",
    "cookTime": "X minutes",
    "calories": "X calories per serving",
    "costBreakdown": {"items": ["• Item: £X"], "total": "£X"},
    "chokingWarnings": "Specific safety warning",
    "messLevel": {"level": 2, "description": "mess description"},
    "pickyEaterTips": [{"condition": "If...", "solution": "Try..."}],
    "chefTips": ["Tip 1", "Tip 2"],
    "dietTags": ["Accurate tags"],
    "macros": {"protein": "Xg", "carbs": "Xg", "fat": "Xg", "fiber": "Xg"}
}

Be extremely specific: use exact weights, cutting sizes in cm, precise cooking times, visual cues.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system', 
                    content: 'You are an expert toddler chef. Create safe, detailed recipes with specific measurements and Jamie Oliver conversational style.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    const data = await response.json();
    const recipeText = data.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = recipeText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse GPT response');
}
```

## 🔧 Method 2: Secure Backend (Recommended for Production)

### **Vercel Deployment (Free & Easy)**

1. **Create Vercel project:**
```bash
npm install -g vercel
vercel login
vercel
```

2. **Add environment variable:**
In Vercel dashboard → Project → Settings → Environment Variables:
- Key: `OPENAI_API_KEY`
- Value: Your OpenAI API key

3. **Create API endpoint:**
File: `api/generate-recipe.js` (use the vercel-function-example.js code)

4. **Update frontend:**
```javascript
async function generateRecipe() {
    try {
        const preferences = JSON.parse(localStorage.getItem('recipePreferences') || '{}');
        
        const response = await fetch('/api/generate-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preferences)
        });
        
        const recipe = await response.json();
        updatePageWithRecipe(recipe);
        
    } catch (error) {
        console.error('API failed:', error);
        generateRecipeLocally(); // Fallback
    }
}
```

## 🔧 Method 3: Express Server

1. **Setup:**
```bash
npm init -y
npm install express openai cors
```

2. **Server code:** (use backend-integration-example.js)

3. **Run:**
```bash
OPENAI_API_KEY=your_key node server.js
```

## 💰 Cost Estimation

**GPT-4 Pricing (as of 2024):**
- Input: $0.03 per 1K tokens
- Output: $0.06 per 1K tokens
- Average recipe generation: ~$0.10-0.20 per recipe

**GPT-3.5-Turbo (Cheaper alternative):**
- Input: $0.0015 per 1K tokens  
- Output: $0.002 per 1K tokens
- Average recipe generation: ~$0.01-0.03 per recipe

## 🚀 Implementation Priority

1. **Start with Method 1** for testing (5 minutes setup)
2. **Move to Method 2** for production (secure, scalable)
3. **Consider rate limiting** to control costs
4. **Add fallback** to local generation if API fails

## 🔐 Security Best Practices

- **Never expose API keys in frontend code**
- **Use environment variables for production**
- **Implement rate limiting**
- **Add request validation**
- **Monitor usage and costs**

## 🎯 Why GPT Will Be Better

1. **Natural Language**: More conversational, Jamie Oliver style
2. **Creativity**: Better recipe combinations and variations
3. **Adaptability**: Handles unusual ingredient combinations
4. **Contextual**: Better understands dietary restrictions and age requirements
5. **Quality**: More realistic cooking times and techniques

Would you like me to help you implement any of these methods?