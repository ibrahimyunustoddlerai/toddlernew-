// Test endpoint to debug form data
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
        
        console.log('🔍 TEST ENDPOINT - Raw body:', req.body);
        console.log('🔍 TEST ENDPOINT - Parsed preferences:', JSON.stringify(preferences, null, 2));
        
        return res.status(200).json({
            success: true,
            received: preferences,
            analysis: {
                hasLeftovers: !!preferences.leftovers,
                hasVegetables: !!preferences.vegetables,
                hasDietary: !!preferences.dietary && preferences.dietary.length > 0,
                hasAgerange: !!preferences.agerange && preferences.agerange.length > 0,
                hasMealtype: !!preferences.mealtype && preferences.mealtype.length > 0,
                hasCategories: !!preferences.categories && preferences.categories.length > 0,
                hasNotes: !!preferences.notes,
                dietaryCount: preferences.dietary ? preferences.dietary.length : 0,
                categoriesCount: preferences.categories ? preferences.categories.length : 0,
                leftoversType: Array.isArray(preferences.leftovers) ? 'array' : typeof preferences.leftovers,
                vegetablesType: Array.isArray(preferences.vegetables) ? 'array' : typeof preferences.vegetables,
                dietaryType: Array.isArray(preferences.dietary) ? 'array' : typeof preferences.dietary,
                categoriesType: Array.isArray(preferences.categories) ? 'array' : typeof preferences.categories
            }
        });

    } catch (error) {
        console.error('❌ Test Error:', error);
        return res.status(500).json({ 
            error: 'Test failed', 
            message: error.message 
        });
    }
}