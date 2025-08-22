// ASDA UK Pricing Database - Updated for realistic 2024 prices
// Prices are per typical usage amount for toddler recipes

const ASDA_PRICES = {
    // PROTEINS
    'chicken': { price: 1.45, unit: '100g', source: 'chicken breast' },
    'chicken breast': { price: 1.45, unit: '100g', source: 'fresh chicken breast' },
    'turkey': { price: 1.65, unit: '100g', source: 'turkey mince' },
    'tuna': { price: 0.85, unit: '1 tin (160g)', source: 'tuna in water' },
    'egg': { price: 0.25, unit: '1 large egg', source: 'free range eggs' },
    'eggs': { price: 0.25, unit: '1 large egg', source: 'free range eggs' },
    'lentils': { price: 0.15, unit: '50g dried', source: 'red lentils' },
    'red lentils': { price: 0.15, unit: '50g dried', source: 'red lentils' },

    // DAIRY
    'cheese': { price: 0.45, unit: '40g', source: 'mature cheddar' },
    'cheddar': { price: 0.45, unit: '40g', source: 'mature cheddar' },
    'milk': { price: 0.18, unit: '200ml', source: 'whole milk' },
    'yogurt': { price: 0.35, unit: '125g pot', source: 'natural yogurt' },
    'butter': { price: 0.08, unit: '10g', source: 'salted butter' },

    // VEGETABLES
    'carrot': { price: 0.12, unit: '1 medium (80g)', source: 'loose carrots' },
    'carrots': { price: 0.12, unit: '1 medium (80g)', source: 'loose carrots' },
    'broccoli': { price: 0.35, unit: '100g', source: 'fresh broccoli' },
    'cauliflower': { price: 0.25, unit: '100g', source: 'fresh cauliflower' },
    'spinach': { price: 0.65, unit: '100g', source: 'baby spinach leaves' },
    'peas': { price: 0.25, unit: '80g', source: 'frozen peas' },
    'sweetcorn': { price: 0.25, unit: '80g', source: 'frozen sweetcorn' },
    'onion': { price: 0.08, unit: '1 medium', source: 'brown onions' },
    'garlic': { price: 0.05, unit: '2 cloves', source: 'garlic bulb' },
    'tomato': { price: 0.25, unit: '1 medium', source: 'vine tomatoes' },
    'tomatoes': { price: 0.25, unit: '1 medium', source: 'vine tomatoes' },
    'cucumber': { price: 0.15, unit: '100g', source: 'whole cucumber' },
    'pepper': { price: 0.45, unit: '1 pepper', source: 'mixed peppers' },
    'peppers': { price: 0.45, unit: '1 pepper', source: 'mixed peppers' },
    'courgette': { price: 0.35, unit: '1 medium', source: 'courgettes' },
    'zucchini': { price: 0.35, unit: '1 medium', source: 'courgettes' },

    // ROOT VEG & SQUASH
    'potato': { price: 0.15, unit: '1 medium (150g)', source: 'white potatoes' },
    'potatoes': { price: 0.15, unit: '1 medium (150g)', source: 'white potatoes' },
    'sweet potato': { price: 0.85, unit: '1 medium (200g)', source: 'sweet potatoes' },
    'butternut squash': { price: 0.95, unit: '300g portion', source: 'whole squash' },

    // FRUITS
    'apple': { price: 0.25, unit: '1 medium', source: 'gala apples' },
    'banana': { price: 0.18, unit: '1 medium', source: 'loose bananas' },
    'pear': { price: 0.35, unit: '1 medium', source: 'conference pears' },
    'avocado': { price: 0.65, unit: '1 medium', source: 'ripe avocados' },

    // GRAINS & CARBS
    'rice': { price: 0.12, unit: '50g dry', source: 'basmati rice' },
    'pasta': { price: 0.18, unit: '50g dry', source: 'wholewheat pasta' },
    'bread': { price: 0.15, unit: '2 slices', source: 'wholemeal bread' },
    'oats': { price: 0.08, unit: '40g', source: 'porridge oats' },
    'flour': { price: 0.05, unit: '50g', source: 'plain flour' },
    'tortilla': { price: 0.25, unit: '1 wrap', source: 'flour tortillas' },

    // PANTRY STAPLES
    'olive oil': { price: 0.08, unit: '1 tbsp', source: 'extra virgin olive oil' },
    'oil': { price: 0.08, unit: '1 tbsp', source: 'vegetable oil' },
    'tomato puree': { price: 0.05, unit: '1 tbsp', source: 'tomato puree tube' },
    'tinned tomatoes': { price: 0.45, unit: '400g tin', source: 'chopped tomatoes' },
    'coconut milk': { price: 0.55, unit: '200ml', source: 'coconut milk tin' },
    'beans': { price: 0.45, unit: '240g tin', source: 'cannellini beans' },
    'black beans': { price: 0.45, unit: '240g tin', source: 'black beans' },

    // HERBS & SPICES
    'cumin': { price: 0.02, unit: 'pinch', source: 'ground cumin' },
    'oregano': { price: 0.02, unit: 'pinch', source: 'dried oregano' },
    'basil': { price: 0.02, unit: 'pinch', source: 'dried basil' },
    'cinnamon': { price: 0.02, unit: 'pinch', source: 'ground cinnamon' },
    'vanilla': { price: 0.05, unit: 'few drops', source: 'vanilla extract' },
    'nutritional yeast': { price: 0.15, unit: '1 tbsp', source: 'nutritional yeast flakes' }
};

// Function to get price for ingredient
function getASDAPrice(ingredient) {
    const key = ingredient.toLowerCase().trim();
    
    // Try exact match first
    if (ASDA_PRICES[key]) {
        return ASDA_PRICES[key];
    }
    
    // Try partial matches
    for (const [itemKey, price] of Object.entries(ASDA_PRICES)) {
        if (key.includes(itemKey) || itemKey.includes(key)) {
            return price;
        }
    }
    
    // Default fallback with realistic estimate
    return { price: 0.50, unit: 'portion', source: 'estimated price' };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASDA_PRICES, getASDAPrice };
}