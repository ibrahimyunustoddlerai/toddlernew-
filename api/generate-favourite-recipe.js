// ASDA UK Pricing Database - Realistic 2024 prices  
const ASDA_PRICES = {
    'chicken': { price: 1.45, unit: '100g' }, 'chicken breast': { price: 1.45, unit: '100g' },
    'turkey': { price: 1.65, unit: '100g' }, 'tuna': { price: 0.85, unit: '1 tin' },
    'egg': { price: 0.25, unit: '1 large' }, 'eggs': { price: 0.25, unit: '1 large' },
    'lentils': { price: 0.15, unit: '50g' }, 'red lentils': { price: 0.15, unit: '50g' },
    'cheese': { price: 0.45, unit: '40g' }, 'cheddar': { price: 0.45, unit: '40g' },
    'milk': { price: 0.18, unit: '200ml' }, 'yogurt': { price: 0.35, unit: '125g' },
    'butter': { price: 0.08, unit: '10g' }, 'carrot': { price: 0.12, unit: '1 medium' },
    'carrots': { price: 0.12, unit: '1 medium' }, 'broccoli': { price: 0.35, unit: '100g' },
    'cauliflower': { price: 0.25, unit: '100g' }, 'spinach': { price: 0.65, unit: '100g' },
    'peas': { price: 0.25, unit: '80g' }, 'onion': { price: 0.08, unit: '1 medium' },
    'tomato': { price: 0.25, unit: '1 medium' }, 'tomatoes': { price: 0.25, unit: '1 medium' },
    'potato': { price: 0.15, unit: '1 medium' }, 'potatoes': { price: 0.15, unit: '1 medium' },
    'sweet potato': { price: 0.85, unit: '1 medium' }, 'apple': { price: 0.25, unit: '1 medium' },
    'banana': { price: 0.18, unit: '1 medium' }, 'pear': { price: 0.35, unit: '1 medium' },
    'avocado': { price: 0.65, unit: '1 medium' }, 'rice': { price: 0.12, unit: '50g' },
    'pasta': { price: 0.18, unit: '50g' }, 'bread': { price: 0.15, unit: '2 slices' },
    'oats': { price: 0.08, unit: '40g' }, 'oil': { price: 0.08, unit: '1 tbsp' },
    'olive oil': { price: 0.08, unit: '1 tbsp' }, 'flour': { price: 0.05, unit: '50g' },
    'butternut squash': { price: 0.95, unit: '300g' }, 'paneer': { price: 1.25, unit: '100g' },
    'black beans': { price: 0.45, unit: '240g tin' }, 'tortilla': { price: 0.25, unit: '1 wrap' },
    'courgette': { price: 0.35, unit: '1 medium' }, 'zucchini': { price: 0.35, unit: '1 medium' }
};

// Recipe database with specific details for each favourite
const FAVOURITE_RECIPES = {
    'carrot-apple-puree': {
        name: 'Carrot & Apple Purée',
        description: 'Steamed carrot and apple blended into a smooth purée',
        age: '6+ months',
        mainIngredients: ['carrot', 'apple'],
        mealType: 'first foods',
        categories: []
    },
    'banana-oat-smoothie': {
        name: 'Banana & Oat Smoothie',
        description: 'Creamy banana and oat smoothie with natural sweetness',
        age: '6+ months',
        mainIngredients: ['banana', 'oats', 'milk'],
        mealType: 'drink',
        categories: ['dairy-free']
    },
    'apple-cinnamon-puree': {
        name: 'Apple & Cinnamon Purée',
        description: 'Warm apple purée with a hint of cinnamon',
        age: '6+ months',
        mainIngredients: ['apple', 'cinnamon'],
        mealType: 'snack',
        categories: ['vegan']
    },
    'avocado-banana-mash': {
        name: 'Avocado & Banana Mash',
        description: 'Naturally soft and creamy — no cooking required',
        age: '6+ months', 
        mainIngredients: ['avocado', 'banana'],
        mealType: 'snack',
        categories: ['no-cook']
    },
    'pea-potato-puree': {
        name: 'Pea & Potato Purée',
        description: 'Mild flavour, smooth texture, gentle on digestion',
        age: '6+ months',
        mainIngredients: ['peas', 'potato'],
        mealType: 'lunch',
        categories: []
    },
    'butternut-squash-pear-puree': {
        name: 'Butternut Squash & Pear Purée',
        description: 'Slightly sweet and smooth for early weaning',
        age: '6+ months',
        mainIngredients: ['butternut squash', 'pear'],
        mealType: 'lunch',
        categories: ['sweet']
    },
    'lentil-carrot-mash': {
        name: 'Lentil & Carrot Mash',
        description: 'Soft red lentils and boiled carrots mashed with a hint of cumin',
        age: '9+ months',
        mainIngredients: ['red lentils', 'carrot'],
        mealType: 'lunch',
        categories: []
    },
    'broccoli-cauliflower-cheese': {
        name: 'Broccoli & Cauliflower Cheese',
        description: 'Soft steamed veg in a mild cheese sauce',
        age: '9+ months',
        mainIngredients: ['broccoli', 'cauliflower', 'cheese'],
        mealType: 'lunch',
        categories: []
    },
    'sweet-potato-wedges': {
        name: 'Sweet Potato Wedges',
        description: 'Oven-baked and soft, ideal for baby-led weaning',
        age: '9+ months',
        mainIngredients: ['sweet potato'],
        mealType: 'lunch',
        categories: ['finger-foods']
    },
    'mini-mashed-veg-omelette': {
        name: 'Mini Mashed Veg Omelette',
        description: 'Egg with mashed or finely chopped veg, gently pan-cooked',
        age: '9+ months',
        mainIngredients: ['eggs', 'carrot', 'peas'],
        mealType: 'breakfast',
        categories: []
    },
    'mini-chicken-veg-patties': {
        name: 'Mini Chicken & Veg Patties',
        description: 'Shredded cooked chicken with mashed potato and carrot',
        age: '12+ months',
        mainIngredients: ['chicken', 'potato', 'carrot'],
        mealType: 'lunch',
        categories: ['finger-foods']
    },
    'cheesy-cauliflower-rice-balls': {
        name: 'Cheesy Cauliflower Rice Balls',
        description: 'Soft balls with cooked cauliflower, cheese, and rice',
        age: '12+ months',
        mainIngredients: ['cauliflower', 'rice', 'cheese'],
        mealType: 'lunch',
        categories: ['finger-foods']
    },
    'pasta-tomato-veg-sauce': {
        name: 'Pasta with Tomato & Veg Sauce',
        description: 'Blended veg sauce over small pasta shapes',
        age: '12+ months',
        mainIngredients: ['pasta', 'tomatoes', 'carrot'],
        mealType: 'dinner',
        categories: []
    },
    'baked-apple-oat-bites': {
        name: 'Baked Apple & Oat Bites',
        description: 'Naturally sweet, soft toddler snack',
        age: '12+ months',
        mainIngredients: ['apple', 'oats'],
        mealType: 'snack',
        categories: ['sweet', 'finger-foods']
    },
    'mini-turkey-spinach-meatballs': {
        name: 'Mini Turkey & Spinach Meatballs',
        description: 'Great finger food rich in iron and protein',
        age: '18+ months',
        mainIngredients: ['turkey', 'spinach'],
        mealType: 'lunch',
        categories: ['finger-foods']
    },
    'vegetable-muffins': {
        name: 'Vegetable Muffins',
        description: 'Savoury muffins with zucchini, carrots, and mild cheese',
        age: '18+ months',
        mainIngredients: ['courgette', 'carrot', 'cheese', 'flour'],
        mealType: 'snack',
        categories: ['savoury', 'finger-foods']
    },
    'mini-tuna-cakes': {
        name: 'Mini Tuna Cakes',
        description: 'Tuna, mashed potato, and peas pan-fried into soft patties',
        age: '18+ months',
        mainIngredients: ['tuna', 'potato', 'peas'],
        mealType: 'lunch',
        categories: ['finger-foods']
    },
    'toddler-friendly-quesadilla': {
        name: 'Toddler-Friendly Quesadilla',
        description: 'Soft tortilla with beans and cheese, lightly toasted',
        age: '2+ years',
        mainIngredients: ['tortilla', 'black beans', 'cheese'],
        mealType: 'lunch',
        categories: []
    },
    'creamy-pesto-pasta-hidden-veg': {
        name: 'Creamy Pesto Pasta with Hidden Veg',
        description: 'Blended spinach-pesto sauce over toddler pasta',
        age: '2+ years',
        mainIngredients: ['pasta', 'spinach'],
        mealType: 'dinner',
        categories: []
    },
    'toddler-tikka-skewers': {
        name: 'Toddler Tikka Skewers',
        description: 'Mildly spiced yogurt-marinated chicken or paneer on sticks',
        age: '3+ years',
        mainIngredients: ['chicken', 'yogurt'],
        mealType: 'dinner',
        categories: ['finger-foods']
    },
    'mini-veggie-burgers': {
        name: 'Mini Veggie Burgers',
        description: 'Baked burgers with black beans, oats, and veg',
        age: '3+ years',
        mainIngredients: ['black beans', 'oats', 'carrot'],
        mealType: 'lunch',
        categories: ['vegetarian', 'finger-foods']
    },
    'hidden-veg-mac-cheese': {
        name: 'Hidden Veg Mac & Cheese',
        description: 'Classic dish with puréed carrots and cauliflower in the cheese sauce',
        age: '3+ years',
        mainIngredients: ['pasta', 'cheese', 'carrot', 'cauliflower'],
        mealType: 'dinner',
        categories: ['family-dinner']
    },
    'banana-oat-smoothie': {
        name: 'Banana & Oat Smoothie',
        description: 'Creamy banana and oat smoothie with natural sweetness',
        age: '6+ months',
        mainIngredients: ['banana', 'oats', 'milk'],
        mealType: 'drink',
        categories: ['dairy-free']
    },
    'apple-cinnamon-puree': {
        name: 'Apple & Cinnamon Purée',
        description: 'Warm apple purée with a hint of cinnamon',
        age: '6+ months',
        mainIngredients: ['apple', 'cinnamon'],
        mealType: 'snack',
        categories: ['vegan']
    },
    'berry-yogurt-smoothie': {
        name: 'Berry & Yogurt Smoothie',
        description: 'Creamy yogurt smoothie with mixed berries',
        age: '9+ months',
        mainIngredients: ['yogurt', 'berries', 'honey'],
        mealType: 'drink',
        categories: ['vegetarian']
    },
    'quinoa-veggie-bowl': {
        name: 'Quinoa & Veggie Bowl',
        description: 'Soft quinoa with steamed vegetables and mild herbs',
        age: '9+ months',
        mainIngredients: ['quinoa', 'carrot', 'broccoli'],
        mealType: 'lunch',
        categories: ['vegan']
    },
    'chocolate-banana-smoothie': {
        name: 'Chocolate & Banana Smoothie',
        description: 'Rich chocolate smoothie with banana and almond milk',
        age: '12+ months',
        mainIngredients: ['banana', 'cocoa', 'almond milk'],
        mealType: 'drink',
        categories: ['dairy-free']
    },
    'hidden-veg-pancakes': {
        name: 'Hidden Veg Pancakes',
        description: 'Fluffy pancakes with puréed carrots and zucchini hidden inside',
        age: '12+ months',
        mainIngredients: ['flour', 'carrot', 'courgette', 'eggs'],
        mealType: 'breakfast',
        categories: ['vegetarian']
    },
    'green-power-smoothie': {
        name: 'Green Power Smoothie',
        description: 'Spinach, banana, and apple smoothie packed with vitamins',
        age: '18+ months',
        mainIngredients: ['spinach', 'banana', 'apple'],
        mealType: 'drink',
        categories: ['vegan']
    },
    'cheesy-pasta-bake': {
        name: 'Cheesy Pasta Bake',
        description: 'Baked pasta with hidden vegetables and melted cheese',
        age: '18+ months',
        mainIngredients: ['pasta', 'cheese', 'carrot', 'cauliflower'],
        mealType: 'dinner',
        categories: ['vegetarian']
    },
    'strawberry-milk-smoothie': {
        name: 'Strawberry & Milk Smoothie',
        description: 'Sweet strawberry smoothie with milk and honey',
        age: '2+ years',
        mainIngredients: ['strawberries', 'milk', 'honey'],
        mealType: 'drink',
        categories: ['vegetarian']
    },
    'breakfast-burrito': {
        name: 'Breakfast Burrito',
        description: 'Scrambled eggs with cheese and vegetables wrapped in a soft tortilla',
        age: '2+ years',
        mainIngredients: ['eggs', 'cheese', 'tortilla', 'vegetables'],
        mealType: 'breakfast',
        categories: ['vegetarian']
    },
    'tropical-fruit-smoothie': {
        name: 'Tropical Fruit Smoothie',
        description: 'Mango, pineapple, and banana smoothie with coconut milk',
        age: '3+ years',
        mainIngredients: ['mango', 'pineapple', 'banana', 'coconut milk'],
        mealType: 'drink',
        categories: ['vegan']
    },
    'chicken-nuggets-homemade': {
        name: 'Homemade Chicken Nuggets',
        description: 'Baked chicken nuggets with whole grain breadcrumbs',
        age: '3+ years',
        mainIngredients: ['chicken', 'breadcrumbs', 'eggs'],
        mealType: 'dinner',
        categories: ['nut-free']
    }
};

// API endpoint to generate favourite recipes
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed. Use POST.' });
        return;
    }

    try {
        console.log('🍼 Favourite Recipe Generation Started!');
        
        const { recipeId } = req.body;
        
        if (!recipeId || !FAVOURITE_RECIPES[recipeId]) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        // Check if we have OpenAI API key
        if (!process.env.OPENAI_API_KEY) {
            console.log('❌ No OpenAI API key found, using fallback');
            return res.status(500).json({ error: 'OpenAI API not configured' });
        }

        const recipeData = FAVOURITE_RECIPES[recipeId];
        console.log('🔍 Generating recipe for:', recipeData.name);

        // Generate GPT recipe
        const gptRecipe = await generateFavouriteRecipe(recipeData);
        console.log('✅ Favourite recipe generated successfully!');
        
        return res.status(200).json(gptRecipe);

    } catch (error) {
        console.error('❌ API Error:', error);
        return res.status(500).json({ error: 'Recipe generation failed' });
    }
}

async function generateFavouriteRecipe(recipeData) {
    console.log('🤖 Generating favourite recipe with GPT...');
    
    const ageRequirements = getAgeSpecificRequirements(recipeData.age);
    const mealRequirements = getMealTypeRequirements(recipeData.mealType);
    const categoryRequirements = getCategoryRequirements(recipeData.categories);

    const prompt = `Create a Jamie Oliver-style MASTERPIECE recipe for: "${recipeData.name}"

📝 RECIPE BRIEF: ${recipeData.description}
🎯 TARGET AGE: ${recipeData.age}
🍽️ MEAL TYPE: ${recipeData.mealType}
🥘 MAIN INGREDIENTS: ${recipeData.mainIngredients.join(', ')}

🚨 CRITICAL REQUIREMENTS:
${ageRequirements}

${mealRequirements}

${categoryRequirements}

💰 COST BREAKDOWN - USE REALISTIC ASDA UK PRICES (2024):
- Chicken breast: £1.45/100g, Turkey: £1.65/100g, Tuna: £0.85/tin
- Cheese: £0.45/40g, Milk: £0.18/200ml, Eggs: £0.25 each
- Carrot: £0.12 each, Broccoli: £0.35/100g, Spinach: £0.65/100g
- Rice: £0.12/50g, Pasta: £0.18/50g, Oats: £0.08/40g
- Apple: £0.25 each, Banana: £0.18 each, Avocado: £0.65 each
- Oil: £0.08/tbsp, Butter: £0.08/10g, Flour: £0.05/50g
- Calculate total accurately and show breakdown per ingredient

🎯 JAMIE'S PROFESSIONAL STANDARDS:
- AUTHENTIC Jamie enthusiasm: "Right then!", "Absolutely brilliant!", "Beautiful!", "Gorgeous!"
- REALISTIC portions for ${recipeData.age}: age-appropriate amounts and textures
- PROFESSIONAL precision: Exact temperatures, timing, tools specified
- CRYSTAL CLEAR instructions: Every step foolproof with exact measurements
- SAFETY FIRST: Appropriate cut sizes, choking warnings for age group

Return ONLY valid JSON:
{
    "name": "${recipeData.name}",
    "oneLiner": "Jamie Oliver enthusiastic description under 250 chars",
    "review": "Parent review quote (5-7 words)",
    "ingredients": "Formatted ingredient list with <br><br> separators and realistic amounts",
    "directions": ["Step 1 with Jamie enthusiasm", "Step 2 with exact details", "etc"],
    "prepTime": "X minutes",
    "cookTime": "X minutes",
    "calories": "Approximately X calories per 1 toddler serving (approx Xg)",
    "costBreakdown": {"items": ["• Ingredient (amount): £X.XX"], "total": "£X.XX"},
    "chokingWarnings": "Age-specific safety warnings",
    "messLevel": {"level": 1-3, "description": "mess description"},
    "pickyEaterTips": [{"condition": "If situation", "solution": "practical solution"}],
    "chefTips": ["Make it special tips", "Storage/serving suggestions"],
    "dietTags": ["Age-appropriate tags"],
    "macros": {"protein": "Xg", "carbs": "Xg", "fat": "Xg", "fiber": "Xg"}
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are Jamie Oliver\'s AI sous chef, specializing in toddler recipes. Create detailed, safe, age-appropriate recipes with restaurant-quality precision. Every instruction must be crystal clear with exact measurements, temperatures, and timing. Return ONLY valid JSON with no markdown formatting.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 3000,
            temperature: 0.5,
            top_p: 0.9
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;

    // Parse JSON response
    try {
        const cleanText = recipeText.trim().replace(/```json\s?/g, '').replace(/```\s?/g, '');
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const recipe = JSON.parse(jsonMatch[0]);
            recipe.gptGenerated = true;
            recipe.recipeType = 'favourite';
            
            console.log('✅ Favourite recipe parsed:', recipe.name);
            return recipe;
        } else {
            throw new Error('No JSON found in GPT response');
        }
    } catch (parseError) {
        console.log('❌ Failed to parse GPT response:', parseError);
        throw parseError;
    }
}

// Helper functions (same as main API)
function getAgeSpecificRequirements(age) {
    const ageSpecs = {
        "6+ months": "🍼 AGE: 6+ MONTHS - Baby-led weaning stage. TEXTURE: Smooth purées or very soft finger foods, everything must be mashable with gums. CUTS: 6mm strips for self-feeding, no round shapes. SPICES: None. SALT: Absolutely none. Perfect for first tastes.",
        "9+ months": "👶 AGE: 9+ MONTHS - Exploring textures. TEXTURE: Soft lumps okay, encourage self-feeding. CUTS: 8mm pieces, still avoid round shapes. SPICES: Very mild herbs only. SALT: Minimal (pinch if any). SKILLS: Can pick up foods, developing pincer grip.",
        "12+ months": "🧸 AGE: 12+ MONTHS - More adventurous. TEXTURE: Soft chunks, can handle small lumps. CUTS: 1cm pieces are safe. SPICES: Mild herbs and spices okay. SALT: Very little (less than 1g daily). SKILLS: Better chewing, can use utensils clumsily.",
        "18+ months": "🚶 AGE: 18+ MONTHS - Toddler confidence. TEXTURE: Regular soft foods, can handle varied textures. CUTS: Up to 1.5cm pieces. SPICES: Most mild spices fine. SALT: Still minimal. SKILLS: Better coordination, learning to use fork/spoon properly.",
        "2+ years": "🎈 AGE: 2+ YEARS - Independent eater. TEXTURE: Most textures okay, still avoid hard/chewy. CUTS: 2cm pieces fine. SPICES: Can handle more variety, still avoid very hot/spicy. SALT: Small amounts okay. SKILLS: Good utensil use, strong opinions!",
        "3+ years": "🌟 AGE: 3+ YEARS - Little adult eater. TEXTURE: Can handle most adult textures except very tough meats. CUTS: Normal family-sized pieces. SPICES: Most family spices okay, adjust heat level. SALT: Normal family amounts but still moderate."
    };
    return ageSpecs[age] || ageSpecs["12+ months"];
}

function getMealTypeRequirements(mealType) {
    const mealSpecs = {
        "breakfast": "🌅 BREAKFAST MEAL - Energy for the day ahead. STYLE: Light, nutritious start. INCLUDE: Fruits, grains, dairy if allowed. AVOID: Heavy proteins, complex dishes. TIMING: Quick 10-15 min prep max. PORTIONS: Smaller, toddler appetite for morning.",
        "lunch": "☀️ LUNCH MEAL - Midday nourishment. STYLE: Light but satisfying, easy to eat. GOOD FOR: Quick energy, not too heavy. TIMING: 15-20 min max. PORTIONS: Medium sized, balance of nutrients. TEXTURE: Easy to manage when tired.",
        "dinner": "🌙 DINNER MEAL - Main meal of day. STYLE: More substantial, family-style. INCLUDE: Protein, vegetables, carbs. TIMING: Can take 20-30 mins to prepare. PORTIONS: Larger, most substantial meal. FAMILY: Consider what adults would enjoy too.",
        "snack": "🍎 SNACK TIME - Quick bite. STYLE: Simple, no-fuss, grab-and-go. TIMING: Under 10 mins prep. PORTIONS: Small, just to tide over. TEXTURE: Easy finger foods preferred. CLEANUP: Minimal mess ideal.",
        "first foods": "🥄 FIRST FOODS - Baby's introduction to solids. STYLE: Simple, single ingredients or gentle combinations. TEXTURE: Smooth purées or very soft. TIMING: Simple prep. PORTIONS: Tiny amounts for tasting. SAFETY: No salt, sugar, honey, nuts, choking hazards."
    };
    return mealSpecs[mealType] || mealSpecs["snack"];
}

function getCategoryRequirements(categories) {
    let requirements = [];
    
    if (categories.includes('no-cook')) {
        requirements.push("🚫🔥 NO COOKING WHATSOEVER - ABSOLUTELY NO heat, stove, oven, microwave, or any cooking. ONLY: Raw ingredients, pre-cooked items, assembly, mixing, mashing. Serve at room temperature or cold. Perfect for hot days or quick preparation. MANDATORY: Mention 'No cooking required!'");
    }
    
    if (categories.includes('sweet')) {
        requirements.push("🍯 SWEET RECIPE - MUST be naturally sweet and dessert-like. Focus HEAVILY on: fruits, natural sweeteners (banana, apple sauce, dates), mild sweet spices (cinnamon, vanilla). If age-appropriate, tiny amounts of maple syrup/honey (only 12+ months). AVOID savory elements completely.");
    }
    
    if (categories.includes('savoury')) {
        requirements.push("🧄 SAVOURY RECIPE - MUST be completely savory with NO sweet elements whatsoever. Focus on: herbs (oregano, thyme, basil), mild spices, vegetables, proteins, umami flavors. AVOID: fruits, sweet spices, sweet vegetables (sweet potato as main).");
    }
    
    if (categories.includes('finger-foods')) {
        requirements.push("✋ FINGER FOODS - Recipe MUST be 100% hand-held eating. NO utensils required or mentioned. MANDATORY: All pieces cut to perfect finger-food sizes (strips, sticks, small pieces). MUST be easy to grip. Self-feeding focus. NO liquidy/messy elements.");
    }
    
    if (categories.includes('vegetarian')) {
        requirements.push("🌱 VEGETARIAN - ABSOLUTELY NO meat, poultry, fish, or seafood: NO chicken, beef, pork, turkey, fish, shellfish, or any animal flesh. MANDATORY: Plant-based proteins only (beans, lentils, tofu, eggs if allowed, dairy if allowed).");
    }
    
    if (categories.includes('family-dinner')) {
        requirements.push("👨‍👩‍👧‍👦 FAMILY DINNER - Recipe MUST work for entire family. MANDATORY: Include adult portion sizes (double/triple toddler portions). Recipe must appeal to adult tastes while being toddler-safe. MUST mention: 'Perfect for the whole family!'");
    }
    
    return requirements.length > 0 ? requirements.join('\n\n') : "";
}