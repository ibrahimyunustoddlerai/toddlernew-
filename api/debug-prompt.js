// Helper functions (same as main API)
function getAgeSpecificRequirements(ageRange) {
    const ageSpecs = {
        "6+ months": "🍼 AGE: 6+ MONTHS - Baby-led weaning stage. TEXTURE: Soft finger foods, no lumps, everything must be mashable with gums. CUTS: 6mm strips for self-feeding, no round shapes. SPICES: None. SALT: Absolutely none. TEXTURE: Pureed or very soft mashed.",
        "9+ months": "👶 AGE: 9+ MONTHS - Exploring textures. TEXTURE: Soft lumps okay, encourage self-feeding. CUTS: 8mm pieces, still avoid round shapes. SPICES: Very mild herbs only. SALT: Minimal (pinch if any). SKILLS: Can pick up foods, developing pincer grip.",
        "12+ months": "🧸 AGE: 12+ MONTHS - More adventurous. TEXTURE: Soft chunks, can handle small lumps. CUTS: 1cm pieces are safe. SPICES: Mild herbs and spices okay. SALT: Very little (less than 1g daily). SKILLS: Better chewing, can use utensils clumsily.",
        "18+ months": "🚶 AGE: 18+ MONTHS - Toddler confidence. TEXTURE: Regular soft foods, can handle varied textures. CUTS: Up to 1.5cm pieces. SPICES: Most mild spices fine. SALT: Still minimal. SKILLS: Better coordination, learning to use fork/spoon properly.",
        "2+ years": "🎈 AGE: 2+ YEARS - Independent eater. TEXTURE: Most textures okay, still avoid hard/chewy. CUTS: 2cm pieces fine. SPICES: Can handle more variety, still avoid very hot/spicy. SALT: Small amounts okay. SKILLS: Good utensil use, strong opinions!",
        "3+ years": "🌟 AGE: 3+ YEARS - Little adult eater. TEXTURE: Can handle most adult textures except very tough meats. CUTS: Normal family-sized pieces. SPICES: Most family spices okay, adjust heat level. SALT: Normal family amounts but still moderate."
    };
    return ageSpecs[ageRange] || ageSpecs["12+ months"];
}

function getMealTypeRequirements(mealType) {
    const mealSpecs = {
        "breakfast": "🌅 BREAKFAST MEAL - Energy for the day ahead. STYLE: Light, nutritious start. INCLUDE: Fruits, grains, dairy if allowed. AVOID: Heavy proteins, complex dishes. TIMING: Quick 10-15 min prep max. PORTIONS: Smaller, toddler appetite for morning.",
        "lunch": "☀️ LUNCH MEAL - Midday nourishment. STYLE: Light but satisfying, easy to eat. GOOD FOR: Quick energy, not too heavy. TIMING: 15-20 min max. PORTIONS: Medium sized, balance of nutrients. TEXTURE: Easy to manage when tired.",
        "dinner": "🌙 DINNER MEAL - Main meal of day. STYLE: More substantial, family-style. INCLUDE: Protein, vegetables, carbs. TIMING: Can take 20-30 mins to prepare. PORTIONS: Larger, most substantial meal. FAMILY: Consider what adults would enjoy too.",
        "snack": "🍎 SNACK TIME - Quick bite. STYLE: Simple, no-fuss, grab-and-go. TIMING: Under 10 mins prep. PORTIONS: Small, just to tide over. TEXTURE: Easy finger foods preferred. CLEANUP: Minimal mess ideal."
    };
    return mealSpecs[mealType] || mealSpecs["lunch"];
}

function getCategoryRequirements(categories) {
    let requirements = [];
    
    if (categories.includes('freezer-friendly')) {
        requirements.push("❄️ FREEZER FRIENDLY - Recipe ABSOLUTELY MUST freeze well and include detailed freezing instructions. MANDATORY: Choose only ingredients that maintain texture when frozen/thawed (pasta, rice, cooked meats, most vegetables, sauces). AVOID: Lettuce, cucumber, cream-based sauces, fresh herbs as garnish. MUST include: 'Freezing: Cool completely, freeze in portions for up to 3 months. Defrost overnight and reheat thoroughly.' MANDATORY freezer tips in chefTips section.");
    }
    
    if (categories.includes('quick-meals')) {
        requirements.push("⚡ QUICK MEAL (UNDER 15 MINS) - STRICT TIME LIMIT: Maximum 15 minutes total time including prep and cooking. MANDATORY: Use pre-cooked ingredients, canned/frozen vegetables, quick-cooking items. Prep time: MAX 5 minutes. Cook time: MAX 10 minutes. NO complex cooking methods. ONE-POT preferred. Example: 'Ready in 12 minutes total!'");
    }
    
    if (categories.includes('batch-cook')) {
        requirements.push("👨‍🍳 BATCH COOKING - Recipe MUST make 4-6 toddler portions minimum. Scale ALL ingredients accordingly (multiply by 4). MANDATORY: Include detailed storage instructions. MUST mention: 'Makes 4-6 portions - perfect for meal prep!' Include reheating instructions in chefTips. Consider freezing compatibility.");
    }
    
    if (categories.includes('family-dinner')) {
        requirements.push("👨‍👩‍👧‍👦 FAMILY DINNER - Recipe MUST work for entire family. MANDATORY: Include adult portion sizes (double/triple toddler portions). Recipe must appeal to adult tastes while being toddler-safe. MUST mention: 'Perfect for the whole family!' Consider adult preferences for seasoning (mention adding extra spices for adults after serving toddler portion).");
    }
    
    if (categories.includes('finger-foods')) {
        requirements.push("✋ FINGER FOODS - Recipe MUST be 100% hand-held eating. NO utensils required or mentioned. MANDATORY: All pieces cut to perfect finger-food sizes (strips, sticks, small pieces). MUST be easy to grip. Self-feeding focus. NO liquidy/messy elements. Perfect for baby-led weaning. Examples: strips, wedges, small pieces, muffins, etc.");
    }
    
    if (categories.includes('no-cook')) {
        requirements.push("🚫🔥 NO COOKING WHATSOEVER - ABSOLUTELY NO heat, stove, oven, microwave, or any cooking. ONLY: Raw ingredients, pre-cooked items, assembly, mixing, mashing. Serve at room temperature or cold. Perfect for hot days or quick preparation. MANDATORY: Mention 'No cooking required!' Examples: sandwiches, fruit plates, yogurt bowls, etc.");
    }
    
    if (categories.includes('sweet')) {
        requirements.push("🍯 SWEET RECIPE - MUST be naturally sweet and dessert-like. Focus HEAVILY on: fruits, natural sweeteners (banana, apple sauce, dates), mild sweet spices (cinnamon, vanilla). If age-appropriate, tiny amounts of maple syrup/honey (only 12+ months). AVOID savory elements completely. Think: fruit salad, sweet muffins, fruit pancakes, etc.");
    }
    
    if (categories.includes('savoury')) {
        requirements.push("🧄 SAVOURY RECIPE - MUST be completely savory with NO sweet elements whatsoever. Focus on: herbs (oregano, thyme, basil), mild spices, vegetables, proteins, umami flavors. AVOID: fruits, sweet spices, sweet vegetables (sweet potato as main). Think: pasta with herbs, vegetable stir-fry, savory muffins, etc.");
    }
    
    return requirements.length > 0 ? requirements.join('\n\n') : "No specific category requirements.";
}

function getDietaryRequirements(restrictions) {
    let requirements = [];
    
    if (restrictions.includes('dairy-free')) {
        requirements.push("🥛 DAIRY FREE - NO milk, cheese, butter, yogurt, cream. Use alternatives like oat milk, coconut milk, dairy-free butter if needed.");
    }
    
    if (restrictions.includes('gluten-free')) {
        requirements.push("🌾 GLUTEN FREE - NO wheat, barley, rye, oats (unless certified GF). Use GF alternatives like rice, quinoa, GF pasta, corn.");
    }
    
    if (restrictions.includes('nut-free')) {
        requirements.push("🥜 NUT FREE - NO nuts, nut oils, nut butters. NO almonds, peanuts, tree nuts. Safe for nut allergy.");
    }
    
    if (restrictions.includes('egg-free')) {
        requirements.push("🥚 EGG FREE - NO eggs in any form. No mayonnaise, egg pasta, or egg-containing products.");
    }
    
    if (restrictions.includes('vegetarian')) {
        requirements.push("🌱 VEGETARIAN - NO meat, fish, poultry. Dairy and eggs okay unless other restrictions apply.");
    }
    
    if (restrictions.includes('vegan')) {
        requirements.push("🌿 VEGAN - NO animal products. No meat, dairy, eggs, honey, fish. Plant-based only.");
    }
    
    if (restrictions.includes('halal')) {
        requirements.push("☪️ HALAL - Only halal ingredients. No pork, alcohol, non-halal meat. Follow halal dietary laws.");
    }
    
    return requirements.length > 0 ? requirements.join('\n') : "No dietary restrictions.";
}

// Debug endpoint to view the GPT prompt without calling the API
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
        const preferences = req.body || {};
        console.log('🔍 Debug: Generating prompt preview...');

        // Extract ingredients - same logic as main API
        let ingredients = [];
        
        if (preferences.leftovers) {
            if (Array.isArray(preferences.leftovers)) {
                ingredients.push(...preferences.leftovers);
            } else {
                ingredients.push(...preferences.leftovers.split(',').map(i => i.trim()).filter(i => i.length > 0));
            }
        }
        
        if (preferences.vegetables) {
            if (Array.isArray(preferences.vegetables)) {
                ingredients.push(...preferences.vegetables);
            } else {
                ingredients.push(...preferences.vegetables.split(',').map(i => i.trim()).filter(i => i.length > 0));
            }
        }
        
        ingredients = [...new Set(ingredients)].filter(ing => ing && ing.trim().length > 0);

        if (ingredients.length === 0) {
            ingredients = ['chicken', 'rice', 'carrots'];
        }

        const dietaryRestrictions = preferences.dietary || [];
        const ageRange = preferences.agerange?.[0] || '12+ months';
        const mealType = preferences.mealtype?.[0] || 'lunch';
        const categories = preferences.categories || [];

        // Build comprehensive requirements based on form data (same as main API)
        const ageRequirements = getAgeSpecificRequirements(ageRange);
        const mealRequirements = getMealTypeRequirements(mealType);
        const categoryRequirements = getCategoryRequirements(categories);
        const dietaryRequirements = getDietaryRequirements(dietaryRestrictions);

        const fullPrompt = `Create a Jamie Oliver-style MASTERPIECE toddler recipe using EXACTLY these ingredients: ${ingredients.join(', ')}

🎯 CRITICAL REQUIREMENTS - MUST ADHERE STRICTLY:
${ageRequirements}
${mealRequirements} 
${categoryRequirements}
${dietaryRequirements}

💡 INGREDIENT RULES:
- PRIMARY INGREDIENTS (MUST USE): ${ingredients.join(', ')}
- You may add common household staples (oil, salt, pepper, basic herbs, onion, garlic) ONLY if needed
- If only 1-2 ingredients provided, supplement with typical household items that pair well
- NEVER ignore or substitute the user's specified ingredients

${preferences.notes ? `📝 SPECIAL NOTES FROM PARENT: ${preferences.notes}` : ''}

🎯 JAMIE'S PROFESSIONAL STANDARDS:
- AUTHENTIC Jamie enthusiasm: "Right then!", "Absolutely brilliant!", "Beautiful!", "Gorgeous!", "Lovely jubbly!"
- REALISTIC portions: 80g proteins, 40g grains, 1 medium veg (60g), 150ml liquids, 1 tbsp oils
- PROFESSIONAL precision: Exact temperatures (medium heat = 5/10), exact timing, exact tools
- CRYSTAL CLEAR instructions: "Heat oil in MEDIUM non-stick pan until it SHIMMERS (2 mins)", not vague "heat oil"
- SAFETY FIRST: Every cut size specified to nearest mm, every temperature checked
- TEXTURE EXPERTISE: Only cut what CAN be cut (meat, veg, fruits) - NEVER rice/pasta/oats/liquids
- TIMING MASTERY: Simple (5-8 prep, 8-12 cook), Medium (10-15 prep, 15-25 cook), Complex (15-20 prep, 25-35 cook)
- FOOLPROOF CLARITY: Replace "combine" with "stir clockwise 15 times with wooden spoon"

Return ONLY valid JSON:
{
    "name": "Creative recipe name (3-4 words)",
    "oneLiner": "Jamie Oliver enthusiastic description under 250 chars",
    "review": "Parent review quote (5-7 words)",
    "ingredients": "• 80g chicken breast, cut into 1cm cubes<br><br>• 40g basmati rice (no prep needed)<br><br>• 1 medium carrot (approx 60g), diced to 0.5cm pieces<br><br>• 1 tbsp rapeseed oil<br><br>• 150ml water for rice",
    "directions": ["Right then! Heat 1 tsp rapeseed oil in a medium non-stick frying pan over medium heat (setting 5/10) until it shimmers - about 2 minutes", "Add the diced chicken cubes to the hot pan using a wooden spoon to spread them in a single layer. Cook for 8-10 minutes, stirring every 2 minutes with the wooden spoon until golden brown on all sides", "Meanwhile, rinse the rice in a fine mesh sieve under cold water until water runs clear. In a small saucepan, bring 80ml water to a boil, add rice, reduce heat to low, cover and simmer for 12 minutes", "Steam the diced carrots in a steamer basket over boiling water for 6-8 minutes until fork-tender", "Once chicken is cooked through (no pink inside), remove pan from heat. Add the cooked rice and steamed carrots to the pan with the chicken", "Using a wooden spoon, gently fold everything together in the pan until evenly mixed. Let cool for 3-5 minutes before serving"],
    "prepTime": "12 minutes",
    "cookTime": "22 minutes",
    "calories": "Approximately 185 calories per 1 toddler serving (approx 160g)",
    "costBreakdown": {"items": ["• Chicken breast (80g): £1.20", "• Basmati rice (40g): £0.25", "• Carrot (1 medium): £0.15", "• Oil: £0.05"], "total": "£1.65"},
    "chokingWarnings": "Cut all pieces to 1cm. Always supervise eating.",
    "messLevel": {"level": 2, "description": "(2/3 - A little messy but manageable!)"},
    "pickyEaterTips": [{"condition": "If refuses mixed:", "solution": "Serve components separately first"}],
    "chefTips": ["Make extra, freeze in ice cube trays!", "Don't worry about mess - exploring is learning!"],
    "dietTags": ["Finger Food", "Toddler-Friendly"],
    "macros": {"protein": "14g", "carbs": "18g", "fat": "3g", "fiber": "2g"}
}

🔥 JAMIE'S SIGNATURE EXPRESSIONS TO USE:
- Opening: "Right then, let's get cracking!" or "Beautiful! Here we go!"
- During cooking: "Absolutely brilliant!", "Gorgeous!", "Look at that sizzle!", "Lovely jubbly!"
- Instructions: "Pop it in", "Give it a good stir", "Chuck in the...", "Bash it about"
- Encouragement: "Don't worry about the mess - that's cooking!", "Trust the process!"
- Closing: "There you have it - absolutely delicious!", "Your little one will go mental for this!"

💡 PROFESSIONAL CHEF LANGUAGE:
- "Medium heat (setting 5/10)" not "medium heat"
- "Stir clockwise 10 times with wooden spoon" not "stir well"
- "Cook until golden (8-10 mins)" not "cook until done"
- "Internal temperature 75°C" for proteins when relevant`;

        const systemPrompt = 'You are a world-class pediatric nutritionist and chef, specializing in toddler cuisine with Jamie Oliver\'s enthusiasm. Create scientifically-backed, developmentally appropriate recipes with restaurant-quality precision. CRITICAL: Your responses must be foolproof professional instructions with exact measurements, temperatures, timing, and safety protocols. Every step must be crystal clear with professional cooking terminology. Return ONLY valid JSON with no markdown formatting.';

        return res.status(200).json({
            success: true,
            debug: {
                ingredients: ingredients,
                preferences: preferences,
                systemPrompt: systemPrompt,
                userPrompt: fullPrompt,
                promptLength: fullPrompt.length,
                estimatedTokens: Math.ceil(fullPrompt.length / 4), // Rough estimate
                model: 'gpt-4o-mini',
                temperature: 0.5,
                maxTokens: 3000
            }
        });

    } catch (error) {
        console.error('❌ Debug Error:', error);
        return res.status(500).json({ 
            error: 'Debug failed', 
            message: error.message 
        });
    }
}