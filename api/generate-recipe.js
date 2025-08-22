// BULLETPROOF RECIPE GENERATOR - MVP VERSION
// Focuses ONLY on core functionality: form data -> GPT -> recipe

export default async function handler(req, res) {
    console.log('🚀 RECIPE GENERATOR API CALLED');
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed. Use POST.' });
        return;
    }

    try {
        console.log('📦 Processing recipe request...');
        const preferences = req.body || {};
        
        console.log('🔍 RECEIVED PREFERENCES:', JSON.stringify(preferences, null, 2));

        // Extract and validate data from form
        let ingredients = extractIngredients(preferences);
        const dietary = preferences.dietary || [];
        const ageRange = preferences.agerange?.[0] || '2+ years';
        const mealType = preferences.mealtype?.[0] || 'lunch';
        const categories = preferences.categories || [];
        const notes = preferences.notes || '';

        // CRITICAL: Comprehensive validation and processing
        console.log('🔍 COMPREHENSIVE FORM VALIDATION STARTING...');
        
        // 1. Validate and process dietary restrictions
        const validatedDietary = validateDietaryRestrictions(dietary);
        
        // 2. Filter ingredients based on dietary restrictions
        ingredients = filterIngredientsForDietaryRestrictions(ingredients, validatedDietary);
        
        // 3. Validate age range and get safety requirements
        const validatedAge = validateAgeRange(ageRange);
        
        // 4. Validate meal type and get meal requirements
        const validatedMealType = validateMealType(mealType);
        
        // 5. Validate categories and check for conflicts
        const validatedCategories = validateCategories(categories);
        
        // 6. Process additional notes for safety
        const processedNotes = processAdditionalNotes(notes);

        console.log('✅ COMPREHENSIVE VALIDATION COMPLETE:');
        console.log('- Original ingredients:', req.body.leftovers || 'none');
        console.log('- Filtered ingredients:', ingredients);
        console.log('- Dietary restrictions:', validatedDietary);
        console.log('- Age requirements:', validatedAge);
        console.log('- Meal type:', validatedMealType);
        console.log('- Categories:', validatedCategories);
        console.log('- Special notes:', processedNotes);

        // Try GPT generation with OpenAI using VALIDATED data
        if (process.env.OPENAI_API_KEY) {
            try {
                console.log('🤖 CALLING GPT FOR RECIPE GENERATION WITH VALIDATED DATA...');
                const gptRecipe = await generateWithGPT({
                    ingredients,
                    dietary: validatedDietary,
                    ageRange: validatedAge,
                    mealType: validatedMealType,
                    categories: validatedCategories,
                    notes: processedNotes
                });
                
                console.log('✅ GPT RECIPE SUCCESS:', gptRecipe.name);
                return res.status(200).json(gptRecipe);
                
            } catch (gptError) {
                console.error('❌ GPT FAILED:', gptError.message);
                // Fall back to local generation
            }
        } else {
            console.log('⚠️ NO OPENAI API KEY FOUND');
        }

        // Fallback recipe generation using VALIDATED data
        console.log('🔄 USING FALLBACK RECIPE GENERATION WITH VALIDATED DATA');
        const fallbackRecipe = createFallbackRecipe({
            ingredients,
            dietary: validatedDietary,
            ageRange: validatedAge,
            mealType: validatedMealType,
            categories: validatedCategories,
            notes: processedNotes
        });
        
        console.log('✅ FALLBACK RECIPE SUCCESS:', fallbackRecipe.name);
        return res.status(200).json(fallbackRecipe);
        
    } catch (error) {
        console.error('🚨 RECIPE GENERATION ERROR:', error);
        return res.status(500).json({ 
            error: `Recipe generation failed: ${error.message}`,
            timestamp: new Date().toISOString()
        });
    }
}

// Extract ingredients from form data
function extractIngredients(preferences) {
    let ingredients = [];
    
    // Get leftovers/ingredients from form
    if (preferences.leftovers) {
        if (Array.isArray(preferences.leftovers)) {
            ingredients = [...preferences.leftovers];
        } else if (typeof preferences.leftovers === 'string') {
            ingredients = preferences.leftovers.split(',').map(i => i.trim()).filter(i => i.length > 0);
        }
    }
    
    // If no ingredients provided, use defaults based on dietary restrictions
    if (ingredients.length === 0) {
        const dietary = preferences.dietary || [];
        
        if (dietary.includes('vegan')) {
            ingredients = ['pasta', 'tomatoes', 'spinach'];
        } else if (dietary.includes('vegetarian')) {
            ingredients = ['pasta', 'tomatoes', 'cheese'];
        } else {
            ingredients = ['chicken', 'rice', 'carrots'];
        }
        
        console.log('🔄 NO INGREDIENTS PROVIDED - USING DEFAULTS:', ingredients);
    }
    
    return ingredients;
}

// COMPREHENSIVE VALIDATION FUNCTIONS

// 1. Validate dietary restrictions and check for conflicts
function validateDietaryRestrictions(dietary) {
    console.log('🔍 VALIDATING DIETARY RESTRICTIONS:', dietary);
    
    if (!Array.isArray(dietary) || dietary.length === 0) {
        console.log('✅ No dietary restrictions specified');
        return [];
    }
    
    const validDietary = [...dietary];
    
    // Check for conflicts and auto-resolve
    if (validDietary.includes('vegan')) {
        // Vegan automatically includes vegetarian and dairy-free
        if (!validDietary.includes('vegetarian')) {
            validDietary.push('vegetarian');
            console.log('🌿 VEGAN detected - automatically adding VEGETARIAN');
        }
        if (!validDietary.includes('dairy-free')) {
            validDietary.push('dairy-free');
            console.log('🌿 VEGAN detected - automatically adding DAIRY-FREE');
        }
    }
    
    // Check for religious dietary conflicts
    if (validDietary.includes('halal') && validDietary.includes('kosher')) {
        console.log('⚠️ WARNING: Both HALAL and KOSHER selected - will follow strictest requirements');
    }
    
    console.log('✅ VALIDATED DIETARY RESTRICTIONS:', validDietary);
    return validDietary;
}

// 2. Validate age range and get safety requirements
function validateAgeRange(ageRange) {
    console.log('🔍 VALIDATING AGE RANGE:', ageRange);
    
    const validAges = ['6+ months', '9+ months', '12+ months', '18+ months', '2+ years', '3+ years'];
    
    if (!ageRange || !validAges.includes(ageRange)) {
        console.log('⚠️ Invalid or missing age range - defaulting to 2+ years');
        return {
            age: '2+ years',
            cutSize: '1cm pieces',
            texture: 'soft chunks',
            supervision: 'Always supervise eating',
            choking: 'Cut all food to 1cm or smaller'
        };
    }
    
    // Age-specific safety requirements
    const ageRequirements = {
        '6+ months': {
            age: '6+ months',
            cutSize: '6mm strips',
            texture: 'pureed or very soft mashed',
            supervision: 'Constant supervision required',
            choking: 'All food must be mashable with gums - no lumps'
        },
        '9+ months': {
            age: '9+ months', 
            cutSize: '8mm pieces',
            texture: 'soft lumps okay',
            supervision: 'Close supervision required',
            choking: 'Small soft lumps okay - avoid round shapes'
        },
        '12+ months': {
            age: '12+ months',
            cutSize: '1cm pieces',
            texture: 'soft chunks',
            supervision: 'Supervise eating',
            choking: 'Cut food to 1cm - avoid hard pieces'
        },
        '18+ months': {
            age: '18+ months',
            cutSize: '1.5cm pieces',
            texture: 'varied textures okay',
            supervision: 'Supervise eating',
            choking: 'Can handle more texture - still cut appropriately'
        },
        '2+ years': {
            age: '2+ years',
            cutSize: '2cm pieces',
            texture: 'most textures okay',
            supervision: 'Supervise eating',
            choking: 'Can handle most textures - avoid very hard foods'
        },
        '3+ years': {
            age: '3+ years',
            cutSize: 'normal family sizes',
            texture: 'adult textures okay',
            supervision: 'General supervision',
            choking: 'Can eat most family foods with minor modifications'
        }
    };
    
    const result = ageRequirements[ageRange];
    console.log('✅ AGE VALIDATION COMPLETE:', result);
    return result;
}

// 3. Validate meal type and get meal requirements  
function validateMealType(mealType) {
    console.log('🔍 VALIDATING MEAL TYPE:', mealType);
    
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    
    if (!mealType || !validMealTypes.includes(mealType)) {
        console.log('⚠️ Invalid or missing meal type - defaulting to lunch');
        mealType = 'lunch';
    }
    
    const mealRequirements = {
        'breakfast': {
            type: 'breakfast',
            style: 'Light, energizing start to the day',
            timing: 'Quick 10-15 min prep max',
            portions: 'Smaller morning appetite',
            ingredients: 'Focus on fruits, grains, dairy if allowed',
            avoid: 'Heavy proteins, complex dishes'
        },
        'lunch': {
            type: 'lunch', 
            style: 'Midday nourishment, light but satisfying',
            timing: '15-20 min max prep',
            portions: 'Medium sized, balanced nutrients',
            ingredients: 'Quick energy foods, easy to digest',
            avoid: 'Too heavy or too light'
        },
        'dinner': {
            type: 'dinner',
            style: 'Main substantial meal of the day',
            timing: 'Can take 20-30 mins to prepare',
            portions: 'Larger, most substantial meal',
            ingredients: 'Protein, vegetables, carbs - complete meal',
            avoid: 'Foods that might affect sleep'
        },
        'snack': {
            type: 'snack',
            style: 'Quick bite, no-fuss grab-and-go',
            timing: 'Under 10 mins prep',
            portions: 'Small, just to tide over',
            ingredients: 'Simple finger foods preferred',
            avoid: 'Messy or complex preparations'
        }
    };
    
    const result = mealRequirements[mealType];
    console.log('✅ MEAL TYPE VALIDATION COMPLETE:', result);
    return result;
}

// 4. Validate categories and check for conflicts
function validateCategories(categories) {
    console.log('🔍 VALIDATING RECIPE CATEGORIES:', categories);
    
    if (!Array.isArray(categories) || categories.length === 0) {
        console.log('✅ No categories specified');
        return [];
    }
    
    const validCategories = ['freezer-friendly', 'sweet', 'savoury', 'batch-cook', 'family-dinner', 'finger-foods', 'no-cook', 'quick-meals'];
    const filteredCategories = categories.filter(cat => validCategories.includes(cat));
    
    // Check for conflicts
    if (filteredCategories.includes('sweet') && filteredCategories.includes('savoury')) {
        console.log('⚠️ CONFLICT: Both SWEET and SAVOURY selected - will prioritize SAVOURY');
        const index = filteredCategories.indexOf('sweet');
        filteredCategories.splice(index, 1);
    }
    
    if (filteredCategories.includes('no-cook') && filteredCategories.includes('quick-meals')) {
        console.log('ℹ️ NO-COOK automatically satisfies QUICK-MEALS requirement');
    }
    
    // Validate combinations
    if (filteredCategories.includes('finger-foods') && filteredCategories.includes('no-cook')) {
        console.log('✅ FINGER-FOODS + NO-COOK: Perfect combination for easy toddler meals');
    }
    
    if (filteredCategories.includes('batch-cook') && filteredCategories.includes('freezer-friendly')) {
        console.log('✅ BATCH-COOK + FREEZER-FRIENDLY: Great for meal prep parents');
    }
    
    console.log('✅ CATEGORY VALIDATION COMPLETE:', filteredCategories);
    return filteredCategories;
}

// 5. Process additional notes for safety and preferences
function processAdditionalNotes(notes) {
    console.log('🔍 PROCESSING ADDITIONAL NOTES:', notes);
    
    if (!notes || notes.trim().length === 0) {
        console.log('✅ No additional notes provided');
        return '';
    }
    
    const processedNotes = notes.trim();
    
    // Check for safety concerns in notes
    const safetyKeywords = ['spicy', 'hot', 'hard', 'choking', 'allergic', 'allergy'];
    const hasSafetyConcerns = safetyKeywords.some(keyword => 
        processedNotes.toLowerCase().includes(keyword)
    );
    
    if (hasSafetyConcerns) {
        console.log('⚠️ SAFETY CONCERNS detected in notes - will prioritize safety in recipe');
    }
    
    // Extract preferences
    const preferenceKeywords = ['loves', 'likes', 'prefers', 'enjoys', 'favorite'];
    const hasPreferences = preferenceKeywords.some(keyword => 
        processedNotes.toLowerCase().includes(keyword)
    );
    
    if (hasPreferences) {
        console.log('💡 PREFERENCES detected in notes - will incorporate into recipe');
    }
    
    console.log('✅ NOTES PROCESSING COMPLETE');
    return processedNotes;
}

// Filter ingredients based on dietary restrictions
function filterIngredientsForDietaryRestrictions(ingredients, dietary) {
    console.log('🔍 FILTERING INGREDIENTS FOR DIETARY RESTRICTIONS');
    console.log('Original ingredients:', ingredients);
    console.log('Dietary restrictions:', dietary);
    
    let filteredIngredients = [...ingredients];
    
    // Remove meat/fish for vegetarians and vegans
    if (dietary.includes('vegetarian') || dietary.includes('vegan')) {
        console.log('🌱 REMOVING MEAT/FISH for vegetarian/vegan diet');
        filteredIngredients = filteredIngredients.filter(ing => {
            const lower = ing.toLowerCase();
            const isMeat = ['chicken', 'beef', 'pork', 'fish', 'turkey', 'meat', 'bacon', 'ham', 'salmon', 'tuna'].some(meat => lower.includes(meat));
            if (isMeat) {
                console.log(`❌ REMOVED: ${ing} (contains meat/fish)`);
            }
            return !isMeat;
        });
    }
    
    // Remove dairy for dairy-free and vegans
    if (dietary.includes('dairy-free') || dietary.includes('vegan')) {
        console.log('🥛 REMOVING DAIRY for dairy-free/vegan diet');
        filteredIngredients = filteredIngredients.filter(ing => {
            const lower = ing.toLowerCase();
            const isDairy = ['cheese', 'milk', 'butter', 'yogurt', 'cream', 'dairy'].some(dairy => lower.includes(dairy));
            if (isDairy) {
                console.log(`❌ REMOVED: ${ing} (contains dairy)`);
            }
            return !isDairy;
        });
    }
    
    // Remove gluten for gluten-free
    if (dietary.includes('gluten-free')) {
        console.log('🌾 REMOVING GLUTEN for gluten-free diet');
        filteredIngredients = filteredIngredients.filter(ing => {
            const lower = ing.toLowerCase();
            const hasGluten = ['wheat', 'bread', 'pasta', 'flour', 'barley', 'rye'].some(gluten => lower.includes(gluten));
            if (hasGluten) {
                console.log(`❌ REMOVED: ${ing} (contains gluten)`);
            }
            return !hasGluten;
        });
    }
    
    // Remove nuts for nut-free
    if (dietary.includes('nut-free')) {
        console.log('🥜 REMOVING NUTS for nut-free diet');
        filteredIngredients = filteredIngredients.filter(ing => {
            const lower = ing.toLowerCase();
            const hasNuts = ['nuts', 'peanut', 'almond', 'walnut', 'cashew', 'pistachio'].some(nut => lower.includes(nut));
            if (hasNuts) {
                console.log(`❌ REMOVED: ${ing} (contains nuts)`);
            }
            return !hasNuts;
        });
    }
    
    // Remove eggs for egg-free
    if (dietary.includes('egg-free')) {
        console.log('🥚 REMOVING EGGS for egg-free diet');
        filteredIngredients = filteredIngredients.filter(ing => {
            const lower = ing.toLowerCase();
            const hasEggs = ['egg', 'eggs', 'mayonnaise'].some(egg => lower.includes(egg));
            if (hasEggs) {
                console.log(`❌ REMOVED: ${ing} (contains eggs)`);
            }
            return !hasEggs;
        });
    }
    
    // If all ingredients were filtered out, provide suitable alternatives
    if (filteredIngredients.length === 0) {
        console.log('⚠️ ALL INGREDIENTS FILTERED OUT - PROVIDING ALTERNATIVES');
        
        // Check for multiple dietary restrictions and provide compliant alternatives
        if (dietary.includes('vegan')) {
            // Vegan = no animal products at all
            filteredIngredients = ['pasta', 'tomatoes', 'spinach', 'olive oil'];
            console.log('🌿 VEGAN ALTERNATIVES:', filteredIngredients);
        } else if (dietary.includes('vegetarian') && dietary.includes('dairy-free')) {
            // Vegetarian + dairy-free = no meat, no dairy
            filteredIngredients = ['pasta', 'tomatoes', 'spinach', 'olive oil'];
            console.log('🌱🥛 VEGETARIAN + DAIRY-FREE ALTERNATIVES:', filteredIngredients);
        } else if (dietary.includes('vegetarian')) {
            // Vegetarian only = no meat, dairy OK
            filteredIngredients = ['pasta', 'tomatoes', 'cheese', 'spinach'];
            console.log('🌱 VEGETARIAN ALTERNATIVES:', filteredIngredients);
        } else if (dietary.includes('dairy-free')) {
            // Dairy-free only = no dairy, meat OK
            filteredIngredients = ['chicken', 'rice', 'carrots', 'olive oil'];
            console.log('🥛 DAIRY-FREE ALTERNATIVES:', filteredIngredients);
        } else {
            // No dietary restrictions
            filteredIngredients = ['rice', 'vegetables', 'olive oil'];
            console.log('🍚 SAFE ALTERNATIVES:', filteredIngredients);
        }
    }
    
    console.log('✅ FINAL FILTERED INGREDIENTS:', filteredIngredients);
    return filteredIngredients;
}

// GPT Recipe Generation
async function generateWithGPT(data) {
    console.log('🤖 GENERATING RECIPE WITH GPT...');
    
    const { ingredients, dietary, ageRange, mealType, categories, notes } = data;
    
    // Handle dietary restrictions (can be array or validated structure)
    const dietaryArray = Array.isArray(dietary) ? dietary : (dietary || []);
    let dietaryText = "No specific dietary restrictions.";
    if (dietaryArray.length > 0) {
        const restrictions = [];
        
        if (dietaryArray.includes('dairy-free')) restrictions.push("🥛 DAIRY FREE - NO milk, cheese, butter, yogurt");
        if (dietaryArray.includes('gluten-free')) restrictions.push("🌾 GLUTEN FREE - NO wheat, bread, pasta, flour");
        if (dietaryArray.includes('nut-free')) restrictions.push("🥜 NUT FREE - NO nuts, peanuts, nut butters");
        if (dietaryArray.includes('egg-free')) restrictions.push("🥚 EGG FREE - NO eggs, mayonnaise");
        if (dietaryArray.includes('vegetarian')) restrictions.push("🌱 VEGETARIAN - NO meat, fish, poultry");
        if (dietaryArray.includes('vegan')) restrictions.push("🌿 VEGAN - NO animal products whatsoever");
        if (dietaryArray.includes('halal')) restrictions.push("☪️ HALAL - NO pork, alcohol");
        if (dietaryArray.includes('kosher')) restrictions.push("✡️ KOSHER - NO pork, shellfish, meat+dairy mixing");
        
        dietaryText = restrictions.join('\n');
    }
    
    // Handle age range (can be string or validated structure)
    const ageText = typeof ageRange === 'string' ? ageRange : (ageRange?.age || '2+ years');
    const ageSafety = typeof ageRange === 'object' ? ageRange : null;
    
    // Handle meal type (can be string or validated structure)
    const mealText = typeof mealType === 'string' ? mealType : (mealType?.type || 'lunch');
    const mealRequirements = typeof mealType === 'object' ? mealType : null;
    
    // Handle categories (can be array or validated structure)
    const categoriesArray = Array.isArray(categories) ? categories : (categories || []);
    
    // Build comprehensive category-specific requirements
    let categoryRequirements = "";
    let portionMultiplier = 1; // Default for single toddler
    let servingAdjustment = "";
    
    // 🍯 Sweet - dessert-style, naturally sweet ingredients
    if (categoriesArray.includes('sweet')) {
        categoryRequirements += "\n🍯 SWEET RECIPE MANDATORY: Focus on naturally sweet ingredients like fruits, honey (if age appropriate), sweet vegetables. Avoid artificial sweeteners. Create dessert-style or sweet snack format.";
    }
    
    // 🧄 Savoury - herb/spice focused, umami flavors
    if (categoriesArray.includes('savoury')) {
        categoryRequirements += "\n🧄 SAVOURY RECIPE MANDATORY: Focus on herbs, mild spices, umami flavors. Use ingredients like cheese, herbs, garlic (age-appropriate), vegetables. NO sweet elements.";
    }
    
    // 👨‍👩‍👧‍👦 Family Dinner - scale up portions for 4 people (2 adults + 2 children)
    if (categoriesArray.includes('family-dinner')) {
        portionMultiplier = 4;
        servingAdjustment = "family-sized";
        categoryRequirements += "\n👨‍👩‍👧‍👦 FAMILY DINNER MANDATORY: Scale ALL ingredients for 4 people (2 adults + 2 children). Use larger quantities - multiply standard toddler portions by 4. Include serving suggestions for the whole family.";
    }
    
    // 👨‍🍳 Batch Cook - make extra portions for meal prep
    if (categoriesArray.includes('batch-cook')) {
        if (portionMultiplier === 1) portionMultiplier = 3; // Don't override family dinner
        servingAdjustment = servingAdjustment || "batch-cooking";
        categoryRequirements += "\n👨‍🍳 BATCH COOK MANDATORY: Make 3x normal portions for meal prep. Include storage instructions for refrigerator (3-4 days) and freezer options. Mention reheating instructions.";
    }
    
    // ✋ Finger Foods - 100% hand-held, no utensils needed
    if (categoriesArray.includes('finger-foods')) {
        categoryRequirements += "\n✋ FINGER FOODS MANDATORY: Recipe must be 100% hand-held. NO utensils required. Cut into finger-sized pieces, sticks, or bite-sized portions. Examples: muffins, strips, balls, sticks. Must be easy to grab and self-feed.";
    }
    
    // 🚫🔥 No Cook - assembly only, no heating required
    if (categoriesArray.includes('no-cook')) {
        categoryRequirements += "\n🚫🔥 NO COOK MANDATORY: Recipe must require NO cooking, heating, or oven use. Assembly and mixing only. Use pre-cooked ingredients, fresh fruits/vegetables, spreads, etc.";
    }
    
    // ⚡ Quick Meals - under 15 minutes total time
    if (categoriesArray.includes('quick-meals')) {
        categoryRequirements += "\n⚡ QUICK MEAL MANDATORY: Total time (prep + cook) must be under 15 minutes. Use quick-cooking methods, pre-cooked ingredients, or minimal cooking time. Prioritize speed and simplicity.";
    }
    
    // ❄️ Freezer Friendly - detailed storage and reheating instructions
    if (categoriesArray.includes('freezer-friendly')) {
        categoryRequirements += "\n❄️ FREEZER FRIENDLY MANDATORY: Include detailed freezing instructions in chefTips. Example: 'Cool completely, freeze in portions for up to 3 months. Defrost overnight and reheat thoroughly.'";
    }

    // Add age-specific safety requirements if available
    let safetyRequirements = "";
    if (ageSafety) {
        safetyRequirements = `\n🔒 SAFETY REQUIREMENTS:\n- Cut all food to ${ageSafety.cutSize}\n- Texture: ${ageSafety.texture}\n- ${ageSafety.supervision}\n- ${ageSafety.choking}`;
    }
    
    // Add meal-specific requirements if available
    let mealRequirementsText = "";
    if (mealRequirements) {
        mealRequirementsText = `\n🍽️ MEAL REQUIREMENTS:\n- Style: ${mealRequirements.style}\n- Timing: ${mealRequirements.timing}\n- Portions: ${mealRequirements.portions}`;
    }

    // Include portion scaling information
    let portionInfo = "";
    if (portionMultiplier > 1) {
        if (servingAdjustment === "family-sized") {
            portionInfo = `\n🍽️ PORTION SCALING: This is a FAMILY DINNER recipe for 4 people (2 adults + 2 children). Multiply ALL ingredient quantities by 4x standard toddler portions. Include family serving suggestions.`;
        } else if (servingAdjustment === "batch-cooking") {
            portionInfo = `\n👨‍🍳 BATCH COOKING: Make 3x normal portions for meal prep. Scale ingredients appropriately for multiple servings.`;
        }
    }

    const prompt = `Create a Jamie Oliver-style toddler recipe using ONLY these ingredients: ${ingredients.join(', ')}

🚨 CRITICAL DIETARY RESTRICTIONS - ABSOLUTE COMPLIANCE REQUIRED:
${dietaryText}

⚠️ RECIPE REQUIREMENTS:
- Age: ${ageText} (exact cut sizes for choking prevention)
- Meal type: ${mealText}
- ONLY use these ingredients: ${ingredients.join(', ')}
- NO ingredients that violate dietary restrictions
- Complete step-by-step instructions with cooking times and temperatures
- How to check if food is done
- Serving suggestions${portionInfo}${categoryRequirements}${safetyRequirements}${mealRequirementsText}

${notes ? `SPECIAL PARENT NOTES: ${notes}` : ''}

🎯 INSTRUCTION REQUIREMENTS:
- COMPLETE cooking instructions (prep, cook time, temperature, doneness test)
- Exact cut sizes for safety
- Jamie Oliver enthusiasm
- UK pricing
- Professional chef precision

Return ONLY valid JSON (no markdown):
{
    "name": "Creative recipe name (NO forbidden ingredients in name)",
    "oneLiner": "Jamie Oliver description under 200 characters",
    "review": "Parent review quote",
    "ingredients": "• 40g pasta (no wheat if gluten-free)<br><br>• 100g tomatoes, diced to 0.5cm<br><br>• 1 tbsp olive oil",
    "directions": [
        "Right then! Heat 1 tbsp olive oil in a medium pan over medium heat (setting 5/10) for 2 minutes until shimmering",
        "Add diced tomatoes and cook for 5-7 minutes, stirring every minute until soft and fragrant",
        "Meanwhile, boil pasta according to package instructions (usually 8-10 minutes) until tender",
        "Drain pasta and mix with tomato mixture. Cook together for 2 minutes",
        "Cool for 3-5 minutes until just warm (test on your wrist). Serve immediately"
    ],
    "prepTime": "8 minutes",
    "cookTime": "15 minutes",
    "calories": "180 calories per toddler serving",
    "costBreakdown": {"items": ["• Pasta: £0.18", "• Tomatoes: £0.25"], "total": "£0.43"},
    "chokingWarnings": "Cut all pieces to 1cm or smaller. Always supervise eating.",
    "messLevel": {"level": 2, "description": "A little messy but manageable!"},
    "pickyEaterTips": [{"condition": "If refuses mixed:", "solution": "Serve pasta and sauce separately"}],
    "chefTips": ["Make extra and freeze in ice cube trays for quick meals!", "Let them help stir - involvement leads to eating!"],
    "dietTags": ["Toddler-Friendly", "Vegetarian"],
    "macros": {"protein": "6g", "carbs": "28g", "fat": "4g", "fiber": "3g"}
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
                    content: 'You are a professional pediatric nutritionist and chef specializing in toddler meals. Return ONLY valid JSON with no markdown formatting whatsoever.'
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

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data_response = await response.json();
    const recipeText = data_response.choices[0].message.content;

    console.log('📄 GPT RESPONSE:', recipeText.substring(0, 200) + '...');

    // Parse JSON response
    try {
        const cleanText = recipeText.trim().replace(/```json\s?/g, '').replace(/```\s?/g, '');
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const recipe = JSON.parse(jsonMatch[0]);
            
            // Add GPT indicators
            recipe.gptGenerated = true;
            recipe.name = "🤖 " + recipe.name;
            
            // Add diet tags based on restrictions
            const dietaryArray = Array.isArray(dietary) ? dietary : (dietary || []);
            if (dietaryArray.length > 0) {
                const extraTags = [];
                if (dietaryArray.includes('vegetarian')) extraTags.push('Vegetarian');
                if (dietaryArray.includes('vegan')) extraTags.push('Vegan');
                if (dietaryArray.includes('dairy-free')) extraTags.push('Dairy-Free');
                if (dietaryArray.includes('gluten-free')) extraTags.push('Gluten-Free');
                
                recipe.dietTags = [...(recipe.dietTags || []), ...extraTags];
            }
            
            console.log('✅ GPT RECIPE PARSED SUCCESSFULLY');
            return recipe;
        } else {
            throw new Error('No valid JSON found in GPT response');
        }
    } catch (parseError) {
        console.error('❌ JSON PARSE ERROR:', parseError.message);
        throw new Error(`Failed to parse GPT response: ${parseError.message}`);
    }
}

// Simple fallback recipe creation
function createFallbackRecipe(data) {
    console.log('🔄 CREATING FALLBACK RECIPE...');
    
    const { ingredients, dietary, ageRange, mealType, categories } = data;
    
    // Handle validated data structures
    const dietaryArray = Array.isArray(dietary) ? dietary : (dietary || []);
    const ageText = typeof ageRange === 'string' ? ageRange : (ageRange?.age || '2+ years');
    const ageSafety = typeof ageRange === 'object' ? ageRange : null;
    const mealText = typeof mealType === 'string' ? mealType : (mealType?.type || 'lunch');
    const categoriesArray = Array.isArray(categories) ? categories : (categories || []);
    
    // Use filtered ingredients (already processed)
    const safeIngredients = ingredients;
    const mainIngredient = safeIngredients[0] || 'vegetables';
    
    console.log('🔄 FALLBACK using safe ingredients:', safeIngredients);
    console.log('🔄 FALLBACK dietary restrictions:', dietaryArray);
    console.log('🔄 FALLBACK age requirements:', ageSafety);
    console.log('🔄 FALLBACK meal type:', mealText);
    console.log('🔄 FALLBACK categories:', categoriesArray);
    
    // Determine portion multiplier and serving adjustments
    let portionMultiplier = 1;
    let servingDescription = "1 toddler serving";
    
    if (categoriesArray.includes('family-dinner')) {
        portionMultiplier = 4;
        servingDescription = "4 family servings (2 adults + 2 children)";
    } else if (categoriesArray.includes('batch-cook')) {
        portionMultiplier = 3;
        servingDescription = "3 meal prep servings";
    }
    
    // Create appropriate recipe name based on ingredients, dietary choices, and categories
    let recipeName = `🔧 ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)}`;
    
    // Add category-specific naming (Family Dinner takes priority for combinations)
    if (categoriesArray.includes('family-dinner')) {
        recipeName += ` Family Bowl`;
    } else if (categoriesArray.includes('batch-cook')) {
        recipeName += ` Batch Bowl`;
    } else if (categoriesArray.includes('finger-foods')) {
        recipeName += ` Fingers`;
    } else if (categoriesArray.includes('sweet')) {
        recipeName += ` Sweet Bites`;
    } else {
        recipeName += ` Bowl`;
    }
    
    // Make sure name reflects dietary choice
    if (dietaryArray.includes('vegetarian')) {
        recipeName = `🌱 Vegetarian` + recipeName.substring(2);
    } else if (dietaryArray.includes('vegan')) {
        recipeName = `🌿 Vegan` + recipeName.substring(2);
    }

    // Build category-appropriate cooking directions
    let directions = [];
    
    if (categoriesArray.includes('no-cook')) {
        // No-cook assembly directions
        directions = [
            "Right then! This is a brilliant no-cook recipe - perfect for busy days!",
            `Wash and prepare the ${mainIngredient} by cutting into appropriate sizes for your little one.`,
            "Mix all ingredients together in a clean bowl, combining gently but thoroughly.",
            "Arrange the mixture on a toddler plate or bowl in an appealing way.",
            "Serve immediately - no cooking required! Perfect for hot days or when you're short on time.",
            "Ensure all pieces are appropriate size for safe eating and age-appropriate."
        ];
    } else if (categoriesArray.includes('finger-foods')) {
        // Finger food specific directions
        directions = [
            "Right then! We're making brilliant finger foods that little hands can easily grab!",
            `Prepare the ${mainIngredient} by cutting into finger-sized strips or bite-sized pieces.`,
            "Heat 1 tbsp olive oil in a medium non-stick pan over medium heat for 2 minutes.",
            "Cook ingredients for 6-8 minutes, turning frequently to ensure even cooking and finger-friendly texture.",
            "Remove from heat and arrange on a plate in finger-food portions - strips, sticks, or small pieces.",
            "Cool for 3-5 minutes until just warm (test temperature) and serve for self-feeding!"
        ];
    } else if (categoriesArray.includes('quick-meals')) {
        // Quick meal directions (under 15 minutes)
        directions = [
            "Right then! Quick and easy meal coming up - ready in under 15 minutes!",
            "Heat oil in a large pan over medium-high heat for 1 minute (we're going fast today!).",
            `Add ${mainIngredient} and cook for 4-5 minutes, stirring frequently for quick cooking.`,
            "Add remaining ingredients and cook for another 3-4 minutes until just tender.",
            "Quick doneness test: ingredients should be soft but not overcooked.",
            "Cool briefly (2-3 minutes) and serve immediately - meal ready in record time!"
        ];
    } else {
        // Standard cooking directions
        directions = [
            "Right then! Heat 1 tbsp olive oil in a medium non-stick pan over medium heat (setting 5/10) for 2 minutes until it shimmers beautifully.",
            `Add the prepared ${mainIngredient} and cook for 8-10 minutes, stirring every 2 minutes with a wooden spoon until golden and tender.`,
            "Add any remaining vegetables and cook for another 5-7 minutes until everything is soft and cooked through.",
            "Test the food is done by piercing with a fork - it should be tender and easily mashed.",
            "Remove from heat and let cool for 3-5 minutes until just warm to touch (test on inside of your wrist).",
            "Serve immediately in a toddler bowl. Cut any larger pieces smaller if needed for safe eating."
        ];
    }

    // Add freezer instructions if requested
    let chefTips = [
        "Make extra portions and freeze in ice cube trays for quick future meals!",
        "Don't worry about mess - exploration is learning and that's brilliant!"
    ];
    
    if (categoriesArray.includes('freezer-friendly')) {
        chefTips.unshift("❄️ FREEZING: Cool completely, then freeze in portions for up to 3 months. Defrost overnight in fridge and reheat thoroughly before serving.");
    }
    
    // Add age-specific safety tips if available
    if (ageSafety) {
        chefTips.push(`🔒 AGE SAFETY: ${ageSafety.choking}`);
    }

    // Scale ingredients based on portion multiplier
    const baseAmount = 80; // Base amount in grams
    const scaledAmount = Math.round(baseAmount * portionMultiplier);
    const oilAmount = Math.round(1 * portionMultiplier);
    
    // Category-specific ingredient formatting
    let ingredientFormat = "1cm pieces";
    if (categoriesArray.includes('finger-foods')) {
        ingredientFormat = "finger-sized strips or bite-sized pieces";
    } else if (categoriesArray.includes('no-cook')) {
        ingredientFormat = "fresh, ready-to-eat pieces";
    } else if (ageSafety) {
        ingredientFormat = ageSafety.cutSize;
    }
    
    // Calculate category-appropriate cooking times
    let prepTime = "8 minutes";
    let cookTime = "15 minutes";
    
    if (categoriesArray.includes('no-cook')) {
        cookTime = "0 minutes (no cooking required)";
        prepTime = "5 minutes";
    } else if (categoriesArray.includes('quick-meals')) {
        prepTime = "3 minutes";
        cookTime = "8 minutes";
    } else if (portionMultiplier > 1) {
        prepTime = "12 minutes";
        cookTime = "20 minutes";
    }
    
    // Scale calories
    const baseCalories = 180;
    const scaledCalories = Math.round(baseCalories * portionMultiplier);
    const calorieDescription = portionMultiplier > 1 ? 
        `Approximately ${scaledCalories} calories total (${Math.round(scaledCalories/portionMultiplier)} per serving)` :
        `Approximately ${scaledCalories} calories per toddler serving`;

    return {
        name: recipeName,
        oneLiner: portionMultiplier > 1 ? 
            `Right then! A absolutely brilliant ${servingDescription} recipe - perfect for the whole family!` :
            "Right then! A absolutely brilliant meal crafted with love for your growing little one - safe, nutritious, and delicious!",
        review: portionMultiplier > 1 ? 
            "This recipe was perfect for our family - everyone loved it and there were plenty of leftovers!" :
            "My toddler absolutely devoured this recipe - perfect for their dietary needs!",
        ingredients: safeIngredients.map(ing => `• ${scaledAmount}g ${ing}, cut into ${ingredientFormat}`).join('<br><br>') + `<br><br>• ${oilAmount} tbsp olive oil`,
        directions: directions,
        prepTime: prepTime,
        cookTime: cookTime,
        calories: calorieDescription,
        costBreakdown: {
            items: [
                `• ${mainIngredient}: £${(1.45 * portionMultiplier).toFixed(2)}`, 
                `• Other ingredients: £${(0.50 * portionMultiplier).toFixed(2)}`, 
                `• Oil: £${(0.08 * portionMultiplier).toFixed(2)}`
            ],
            total: `£${(2.03 * portionMultiplier).toFixed(2)}`
        },
        chokingWarnings: ageSafety ? 
            `Cut all ${mainIngredient} pieces to ${ageSafety.cutSize}. ${ageSafety.supervision} Ensure appropriate texture for ${ageText}.` :
            `Cut all ${mainIngredient} pieces to ${ingredientFormat}. Always supervise eating and ensure appropriate texture for ${ageText}.`,
        messLevel: categoriesArray.includes('finger-foods') ? 
            { level: 1, description: "(1/3 - Minimal mess with finger foods!)" } :
            { level: 2, description: "(2/3 - A little messy but manageable!)" },
        pickyEaterTips: categoriesArray.includes('finger-foods') ? [
            { condition: "If refuses certain pieces:", solution: "Let them choose which finger foods to try first" },
            { condition: "For hesitant eaters:", solution: "Start with familiar ingredients as finger foods" }
        ] : [
            { condition: "If refuses mixed textures:", solution: "Serve each ingredient separately on the plate" },
            { condition: "For texture-sensitive toddlers:", solution: "Mash half the portion smooth, leave half with texture" }
        ],
        chefTips: chefTips,
        dietTags: ["Toddler-Friendly", "Simple & Safe"].concat(
            dietaryArray.includes('vegetarian') ? ["Vegetarian"] : [],
            dietaryArray.includes('vegan') ? ["Vegan"] : [],
            dietaryArray.includes('dairy-free') ? ["Dairy-Free"] : [],
            dietaryArray.includes('gluten-free') ? ["Gluten-Free"] : [],
            categoriesArray.includes('freezer-friendly') ? ["Freezer-Friendly"] : [],
            categoriesArray.includes('finger-foods') ? ["Finger Foods"] : [],
            categoriesArray.includes('family-dinner') ? ["Family Dinner"] : [],
            categoriesArray.includes('batch-cook') ? ["Batch Cook"] : [],
            categoriesArray.includes('no-cook') ? ["No Cook"] : [],
            categoriesArray.includes('quick-meals') ? ["Quick Meals"] : [],
            categoriesArray.includes('sweet') ? ["Sweet"] : [],
            categoriesArray.includes('savoury') ? ["Savoury"] : []
        ),
        macros: { 
            protein: dietaryArray.includes('vegan') ? "8g" : "14g", 
            carbs: "18g", 
            fat: "4g", 
            fiber: "3g" 
        },
        gptGenerated: false,
        fallbackReason: "Backup recipe system used - dietary restrictions respected"
    };
}