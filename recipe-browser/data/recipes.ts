import { Recipe } from '../lib/types';

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 'avocado-banana-mash',
    name: 'Creamy Avocado Banana Mash',
    description: 'A perfectly creamy first food that\'s packed with healthy fats and naturally sweet. Perfect for baby-led weaning or spoon feeding.',
    
    ageGroup: '6-9-months',
    developmentalStage: 'purees',
    
    mealType: ['breakfast', 'snack'],
    prepTime: 3,
    cookTime: 0,
    totalTime: 3,
    servings: 2,
    
    difficulty: 'super-easy',
    messLevel: 'low',
    parentPrepTime: 5,
    
    nutrition: {
      calories: 95,
      protein: 1.5,
      carbs: 12,
      fat: 6,
      fiber: 4,
    },
    nutritionalFocus: ['healthy-fats', 'fiber-rich'],
    
    dietary: ['vegetarian', 'vegan', 'dairy-free', 'gluten-free', 'nut-free', 'baby-led-weaning'],
    allergens: [],
    choking_hazards: [],
    
    texture: 'smooth-puree',
    temperature: 'room-temp',
    interactiveLevel: 'parent-only',
    
    tags: ['picky-eater-approved', 'travel-friendly', 'teething-safe'],
    popularWith: ['picky-eaters', 'sweet-tooths'],
    
    ingredients: [
      {
        id: 'avocado-1',
        name: 'Avocado',
        amount: '1',
        unit: 'medium',
        preparation: 'ripe and soft',
        notes: 'Should yield to gentle pressure'
      },
      {
        id: 'banana-1', 
        name: 'Banana',
        amount: '1/2',
        unit: 'medium',
        preparation: 'ripe with brown spots',
        notes: 'Sweeter when very ripe'
      }
    ],
    
    instructions: [
      {
        step: 1,
        instruction: 'Cut avocado in half, remove pit, and scoop flesh into a bowl.',
        parentNote: 'Save the other half for later - cover with lime juice to prevent browning'
      },
      {
        step: 2, 
        instruction: 'Add banana pieces to the bowl with avocado.',
        toddlerTask: 'Older toddlers can help break banana into pieces'
      },
      {
        step: 3,
        instruction: 'Mash with a fork until smooth and creamy, or leave slightly chunky for texture.',
        parentNote: 'Start smooth for first-timers, add texture as baby progresses',
        toddlerTask: 'Toddlers love helping mash!'
      },
      {
        step: 4,
        instruction: 'Serve immediately at room temperature.',
        parentNote: 'This doesn\'t store well - make fresh each time'
      }
    ],
    
    tips: [
      {
        category: 'preparation',
        tip: 'Choose avocados that are soft but not mushy - they should yield to gentle pressure',
        importance: 'medium'
      },
      {
        category: 'serving',
        tip: 'Serve on a spoon for babies, or let toddlers self-feed with their hands',
        importance: 'low'
      },
      {
        category: 'storage',
        tip: 'This recipe is best served fresh - it will brown quickly even with lemon juice',
        importance: 'high'
      },
      {
        category: 'variation',
        tip: 'Add a pinch of cinnamon or a tiny drop of vanilla for older toddlers',
        importance: 'low'
      }
    ],
    
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    authorType: 'nutritionist',
    rating: 4.8,
    reviews: 234
  },

  {
    id: 'sweet-potato-pancakes',
    name: 'Mini Sweet Potato Pancakes', 
    description: 'Fluffy, naturally sweet pancakes that are perfect for little hands. Packed with beta-carotene and loved by picky eaters.',
    
    ageGroup: '9-12-months',
    developmentalStage: 'finger-foods',
    
    mealType: ['breakfast', 'snack'],
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    
    difficulty: 'easy',
    messLevel: 'medium',
    parentPrepTime: 30,
    
    nutrition: {
      calories: 85,
      protein: 3,
      carbs: 15,
      fat: 2,
      fiber: 2,
      vitaminC: 12
    },
    nutritionalFocus: ['vitamin-c', 'fiber-rich'],
    
    dietary: ['vegetarian', 'dairy-free'],
    allergens: ['eggs', 'wheat'],
    
    texture: 'soft-chunks',
    temperature: 'warm',
    interactiveLevel: 'toddler-helps',
    
    tags: ['picky-eater-approved', 'freezer-friendly', 'batch-cook', 'brain-food'],
    popularWith: ['picky-eaters', 'sweet-tooths', 'veggie-lovers'],
    
    ingredients: [
      {
        id: 'sweet-potato-1',
        name: 'Sweet potato',
        amount: '1',
        unit: 'medium',
        preparation: 'cooked and mashed',
        notes: 'Can be roasted, steamed, or microwaved'
      },
      {
        id: 'oat-flour-1',
        name: 'Oat flour',
        amount: '1/2',
        unit: 'cup',
        substitutes: ['blended oats', 'whole wheat flour'],
        notes: 'Make your own by blending rolled oats'
      },
      {
        id: 'egg-1',
        name: 'Egg',
        amount: '1',
        unit: 'large',
        preparation: 'beaten',
      },
      {
        id: 'milk-1',
        name: 'Milk',
        amount: '1/4',
        unit: 'cup',
        substitutes: ['oat milk', 'almond milk', 'breast milk'],
        optional: true
      },
      {
        id: 'cinnamon-1',
        name: 'Cinnamon',
        amount: '1/4',
        unit: 'tsp',
        optional: true,
        notes: 'Great for flavor and may help with blood sugar'
      }
    ],
    
    instructions: [
      {
        step: 1,
        instruction: 'Cook sweet potato until very soft (microwave 5-7 mins or steam 15 mins).',
        duration: 7,
        parentNote: 'Pierce with fork before microwaving to prevent bursting'
      },
      {
        step: 2,
        instruction: 'Mash sweet potato until smooth. Let cool slightly.',
        toddlerTask: 'Great job for toddlers to help mash!'
      },
      {
        step: 3,
        instruction: 'Mix mashed sweet potato, oat flour, egg, milk, and cinnamon in a bowl.',
        toddlerTask: 'Toddlers can help stir the mixture'
      },
      {
        step: 4,
        instruction: 'Heat a lightly oiled pan over medium-low heat.',
        parentNote: 'Low heat prevents burning - these cook slowly'
      },
      {
        step: 5,
        instruction: 'Drop spoonfuls of batter to make small pancakes (2-3 inches).',
        duration: 3,
        parentNote: 'Small size perfect for little hands'
      },
      {
        step: 6,
        instruction: 'Cook 2-3 minutes until bubbles form, flip carefully, cook 2 more minutes.',
        duration: 5,
        parentNote: 'These are more fragile than regular pancakes - flip gently'
      },
      {
        step: 7,
        instruction: 'Cool to appropriate temperature before serving.',
        parentNote: 'Always test temperature - these stay hot inside'
      }
    ],
    
    tips: [
      {
        category: 'safety',
        tip: 'Always test temperature - sweet potato holds heat and can burn little mouths',
        importance: 'critical'
      },
      {
        category: 'preparation',
        tip: 'Make sweet potato in advance - keeps in fridge for 3 days',
        importance: 'medium'
      },
      {
        category: 'serving',
        tip: 'Cut into strips for easier gripping, or serve whole for self-feeding practice',
        importance: 'medium'
      },
      {
        category: 'storage',
        tip: 'Freeze cooked pancakes for up to 3 months - reheat in toaster or microwave',
        importance: 'high'
      },
      {
        category: 'variation',
        tip: 'Add mashed banana, blueberries, or a tiny bit of vanilla for variety',
        importance: 'low'
      }
    ],
    
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-01'),
    authorType: 'chef',
    rating: 4.6,
    reviews: 189
  },

  {
    id: 'hidden-veggie-meatballs',
    name: 'Hidden Veggie Mini Meatballs',
    description: 'Protein-packed meatballs with secret vegetables that even the pickiest eaters will love. Perfect for meal prep and freezing.',
    
    ageGroup: '12-18-months', 
    developmentalStage: 'finger-foods',
    
    mealType: ['lunch', 'dinner'],
    prepTime: 20,
    cookTime: 20,
    totalTime: 40,
    servings: 6,
    
    difficulty: 'medium',
    messLevel: 'medium',
    parentPrepTime: 45,
    
    nutrition: {
      calories: 120,
      protein: 12,
      carbs: 8,
      fat: 5,
      fiber: 2,
      iron: 2.1
    },
    nutritionalFocus: ['high-protein', 'iron-rich', 'fiber-rich'],
    
    dietary: ['dairy-free'],
    allergens: ['eggs'],
    
    texture: 'soft-chunks', 
    temperature: 'warm',
    interactiveLevel: 'toddler-helps',
    
    tags: ['hidden-veggies', 'freezer-friendly', 'batch-cook', 'picky-eater-approved', 'brain-food'],
    popularWith: ['picky-eaters', 'protein-seekers'],
    
    ingredients: [
      {
        id: 'ground-turkey-1',
        name: 'Ground turkey',
        amount: '1',
        unit: 'lb',
        preparation: 'lean',
        substitutes: ['ground chicken', 'ground beef'],
        notes: '93/7 lean ratio works best'
      },
      {
        id: 'zucchini-1',
        name: 'Zucchini',
        amount: '1',
        unit: 'medium',
        preparation: 'finely grated',
        notes: 'Squeeze out excess water with paper towels'
      },
      {
        id: 'carrot-1',
        name: 'Carrot',
        amount: '1',
        unit: 'medium',
        preparation: 'finely grated',
        notes: 'Use the fine side of a box grater'
      },
      {
        id: 'oats-1',
        name: 'Rolled oats',
        amount: '1/3',
        unit: 'cup',
        preparation: 'finely ground',
        substitutes: ['breadcrumbs', 'oat flour'],
        notes: 'Pulse in food processor until flour-like'
      },
      {
        id: 'egg-2',
        name: 'Egg',
        amount: '1',
        unit: 'large',
        preparation: 'beaten'
      },
      {
        id: 'herbs-1',
        name: 'Italian herbs',
        amount: '1',
        unit: 'tsp',
        preparation: 'dried',
        optional: true,
        notes: 'Oregano, basil, thyme blend'
      }
    ],
    
    instructions: [
      {
        step: 1,
        instruction: 'Preheat oven to 375°F (190°C). Line a baking sheet with parchment.',
        duration: 5,
        parentNote: 'Parchment prevents sticking and makes cleanup easier'
      },
      {
        step: 2, 
        instruction: 'Grate zucchini and carrot finely. Squeeze zucchini in paper towels to remove excess water.',
        parentNote: 'Removing water prevents soggy meatballs',
        toddlerTask: 'Toddlers can help squeeze the zucchini - fun sensory activity!'
      },
      {
        step: 3,
        instruction: 'Grind oats in food processor until they resemble flour.',
        toddlerTask: 'Toddlers love pushing the food processor button (with supervision)'
      },
      {
        step: 4,
        instruction: 'Mix turkey, vegetables, ground oats, egg, and herbs in a large bowl.',
        toddlerTask: 'Perfect mixing job for little hands - they love getting messy!'
      },
      {
        step: 5,
        instruction: 'Form mixture into small balls (about 1 inch diameter) and place on baking sheet.',
        parentNote: 'Small size prevents choking and cooks more evenly',
        toddlerTask: 'Toddlers can help roll balls - expect varying sizes!'
      },
      {
        step: 6,
        instruction: 'Bake for 18-20 minutes until golden brown and cooked through (165°F internal temp).',
        duration: 20,
        parentNote: 'Use a meat thermometer to ensure food safety'
      },
      {
        step: 7,
        instruction: 'Cool to appropriate temperature before serving.',
        parentNote: 'Cut one open to test temperature - meat stays hot longer'
      }
    ],
    
    tips: [
      {
        category: 'safety',
        tip: 'Always check internal temperature reaches 165°F - use a meat thermometer',
        importance: 'critical'
      },
      {
        category: 'preparation',
        tip: 'Double the recipe and freeze half - they keep for 3 months frozen',
        importance: 'high'
      },
      {
        category: 'serving',
        tip: 'Cut in half for younger toddlers to check for appropriate size',
        importance: 'medium'
      },
      {
        category: 'storage',
        tip: 'Store in fridge for up to 3 days, or freeze in single layers then transfer to bags',
        importance: 'high'
      },
      {
        category: 'variation',
        tip: 'Try sweet potato, spinach, or cauliflower instead of zucchini and carrot',
        importance: 'low'
      }
    ],
    
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-15'),
    authorType: 'nutritionist',
    rating: 4.9,
    reviews: 312
  },

  {
    id: 'rainbow-veggie-pasta',
    name: 'Rainbow Veggie Mac & Cheese',
    description: 'Creamy, cheesy pasta loaded with colorful hidden vegetables. A parent favorite that gets veggies into picky eaters!',
    
    ageGroup: '18-24-months',
    developmentalStage: 'family-foods',
    
    mealType: ['lunch', 'dinner'], 
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 6,
    
    difficulty: 'medium',
    messLevel: 'high',
    parentPrepTime: 50,
    
    nutrition: {
      calories: 185,
      protein: 8,
      carbs: 22,
      fat: 7,
      fiber: 3,
      calcium: 150,
      vitaminC: 45
    },
    nutritionalFocus: ['calcium-rich', 'vitamin-c', 'fiber-rich'],
    
    dietary: ['vegetarian'],
    allergens: ['milk', 'wheat'],
    
    texture: 'soft-chunks',
    temperature: 'warm',
    interactiveLevel: 'toddler-leads',
    
    tags: ['hidden-veggies', 'comfort-food', 'picky-eater-approved', 'freezer-friendly', 'one-pot-meal'],
    popularWith: ['picky-eaters', 'veggie-lovers'],
    
    ingredients: [
      {
        id: 'pasta-1',
        name: 'Elbow macaroni',
        amount: '2',
        unit: 'cups',
        preparation: 'uncooked',
        substitutes: ['shells', 'penne', 'rotini'],
        notes: 'Choose a shape that holds cheese well'
      },
      {
        id: 'butternut-squash-1',
        name: 'Butternut squash',
        amount: '1',
        unit: 'cup',
        preparation: 'cubed and roasted',
        notes: 'Can use frozen - thaw and roast until soft'
      },
      {
        id: 'cauliflower-1',
        name: 'Cauliflower',
        amount: '1',
        unit: 'cup',
        preparation: 'steamed until very soft',
        notes: 'Should mash easily with a fork'
      },
      {
        id: 'cheddar-1',
        name: 'Sharp cheddar cheese',
        amount: '1.5',
        unit: 'cups',
        preparation: 'shredded',
        notes: 'Sharp cheddar provides more flavor with less cheese'
      },
      {
        id: 'milk-2',
        name: 'Whole milk',
        amount: '3/4',
        unit: 'cup',
        substitutes: ['unsweetened oat milk'],
        notes: 'Whole milk creates creamier texture'
      },
      {
        id: 'cream-cheese-1',
        name: 'Cream cheese',
        amount: '2',
        unit: 'oz',
        preparation: 'softened',
        notes: 'Makes the sauce extra creamy'
      }
    ],
    
    instructions: [
      {
        step: 1,
        instruction: 'Roast butternut squash cubes at 400°F for 20-25 minutes until very soft.',
        duration: 25,
        parentNote: 'Can be done ahead of time and stored in fridge'
      },
      {
        step: 2,
        instruction: 'Steam cauliflower until very soft, about 10-12 minutes.',
        duration: 12,
        toddlerTask: 'Toddlers can help check if cauliflower is soft with a fork'
      },
      {
        step: 3,
        instruction: 'Cook pasta according to package directions until al dente. Reserve 1 cup pasta water.',
        duration: 10,
        parentNote: 'Pasta water helps thin the sauce if needed'
      },
      {
        step: 4,
        instruction: 'Blend roasted squash and steamed cauliflower with 1/2 cup milk until smooth.',
        parentNote: 'This is your hidden veggie base - should be completely smooth',
        toddlerTask: 'Toddlers can help add ingredients to blender (supervised)'
      },
      {
        step: 5,
        instruction: 'In a large pan, combine pasta, veggie mixture, remaining milk, and cream cheese.',
        toddlerTask: 'Toddlers can help pour and stir (with help)'
      },
      {
        step: 6,
        instruction: 'Heat over medium-low, stirring constantly. Gradually add cheese until melted.',
        duration: 8,
        parentNote: 'Low heat prevents cheese from separating - patience is key'
      },
      {
        step: 7,
        instruction: 'Add pasta water as needed to reach desired consistency. Cool before serving.',
        parentNote: 'Should be creamy but not too thin - thick enough to coat pasta'
      }
    ],
    
    tips: [
      {
        category: 'safety', 
        tip: 'Always test temperature - cheese-based dishes stay very hot and can burn',
        importance: 'critical'
      },
      {
        category: 'preparation',
        tip: 'Roast vegetables in big batches and freeze in portions for quick meals',
        importance: 'high'
      },
      {
        category: 'serving',
        tip: 'Let toddlers eat with hands if they want - this is messy but fun!',
        importance: 'medium'
      },
      {
        category: 'storage',
        tip: 'Keeps in fridge 3-4 days. Add a splash of milk when reheating.',
        importance: 'medium'
      },
      {
        category: 'variation',
        tip: 'Try different veggie combinations: sweet potato + carrot, or zucchini + yellow squash',
        importance: 'low'
      }
    ],
    
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05'),
    authorType: 'parent',
    rating: 4.7,
    reviews: 428
  }
];

// Helper functions for filtering recipes
export function filterRecipes(recipes: Recipe[], filters: Partial<import('../lib/types').RecipeFilters>): Recipe[] {
  return recipes.filter(recipe => {
    // Age group filter
    if (filters.ageGroups && filters.ageGroups.length > 0) {
      if (!filters.ageGroups.includes(recipe.ageGroup)) return false;
    }
    
    // Meal type filter
    if (filters.mealTypes && filters.mealTypes.length > 0) {
      if (!filters.mealTypes.some(type => recipe.mealType.includes(type))) return false;
    }
    
    // Dietary restrictions filter
    if (filters.dietary && filters.dietary.length > 0) {
      if (!filters.dietary.every(diet => recipe.dietary.includes(diet))) return false;
    }
    
    // Allergen-free filter
    if (filters.allergenFree && filters.allergenFree.length > 0) {
      if (filters.allergenFree.some(allergen => recipe.allergens.includes(allergen))) return false;
    }
    
    // Prep time filter
    if (filters.prepTime) {
      if (recipe.prepTime < filters.prepTime.min || recipe.prepTime > filters.prepTime.max) return false;
    }
    
    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(recipe.difficulty)) return false;
    }
    
    // Search filter
    if (filters.search && filters.search.length > 2) {
      const searchLower = filters.search.toLowerCase();
      const searchFields = [
        recipe.name,
        recipe.description,
        ...recipe.tags,
        ...recipe.ingredients.map(ing => ing.name)
      ].join(' ').toLowerCase();
      
      if (!searchFields.includes(searchLower)) return false;
    }
    
    return true;
  });
}

export function getAvailableFilters(recipes: Recipe[]) {
  return {
    ageGroups: [...new Set(recipes.map(r => r.ageGroup))],
    mealTypes: [...new Set(recipes.flatMap(r => r.mealType))],
    dietary: [...new Set(recipes.flatMap(r => r.dietary))],
    difficulties: [...new Set(recipes.map(r => r.difficulty))],
    tags: [...new Set(recipes.flatMap(r => r.tags))],
    allergens: [...new Set(recipes.flatMap(r => r.allergens))]
  };
}