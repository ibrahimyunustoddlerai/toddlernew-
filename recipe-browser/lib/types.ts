// Types for the ToddlerChef Recipe Browser

export interface Recipe {
  id: string;
  name: string;
  description: string;
  
  // Age & Development
  ageGroup: AgeGroup;
  developmentalStage: DevelopmentalStage;
  
  // Meal Information
  mealType: MealType[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  servings: number;
  
  // Difficulty & Practical Info
  difficulty: Difficulty;
  messLevel: MessLevel;
  parentPrepTime: number; // realistic time for parent prep
  
  // Nutritional Info
  nutrition: NutritionInfo;
  nutritionalFocus: NutritionalFocus[];
  
  // Dietary & Safety
  dietary: DietaryTag[];
  allergens: Allergen[];
  choking_hazards?: string[];
  
  // Toddler-Specific
  texture: Texture;
  temperature: Temperature;
  interactiveLevel: InteractiveLevel; // how much toddler can "help"
  
  // Tags & Categories
  tags: RecipeTag[];
  popularWith: PopularWith[];
  
  // Content
  ingredients: Ingredient[];
  instructions: Instruction[];
  tips: ParentTip[];
  
  // Media
  image?: string;
  video?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  authorType: 'ai' | 'nutritionist' | 'parent' | 'chef';
  rating?: number;
  reviews?: number;
}

export type AgeGroup = 
  | '6-9-months'
  | '9-12-months' 
  | '12-18-months'
  | '18-24-months'
  | '2-3-years'
  | '3-4-years'
  | '4-5-years';

export type DevelopmentalStage = 
  | 'purees' 
  | 'soft-lumps' 
  | 'finger-foods' 
  | 'family-foods';

export type MealType = 
  | 'breakfast' 
  | 'lunch' 
  | 'dinner' 
  | 'snack' 
  | 'dessert';

export type Difficulty = 
  | 'super-easy'    // 5 min, minimal ingredients
  | 'easy'          // 15 min, simple steps  
  | 'medium'        // 30 min, multiple steps
  | 'challenging';  // 45+ min, advanced techniques

export type MessLevel = 
  | 'low'      // spoon-fed, contained
  | 'medium'   // some finger foods, manageable cleanup
  | 'high'     // full sensory experience, major cleanup
  | 'extreme'; // prepare for chaos!

export type Texture = 
  | 'smooth-puree'
  | 'thick-puree' 
  | 'soft-lumps'
  | 'mashed'
  | 'soft-chunks'
  | 'finger-foods'
  | 'regular-texture';

export type Temperature = 
  | 'room-temp'
  | 'warm' 
  | 'hot-parent-test' // needs parent temperature testing
  | 'cold'
  | 'frozen';

export type InteractiveLevel = 
  | 'parent-only'     // toddler watches
  | 'toddler-helps'   // simple tasks like stirring
  | 'toddler-leads'   // toddler does most with supervision
  | 'independent';    // older toddlers can do alone

export type DietaryTag = 
  | 'vegetarian'
  | 'vegan' 
  | 'dairy-free'
  | 'gluten-free'
  | 'nut-free'
  | 'egg-free'
  | 'soy-free'
  | 'sugar-free'
  | 'salt-free'
  | 'organic'
  | 'baby-led-weaning';

export type Allergen = 
  | 'milk' 
  | 'eggs' 
  | 'peanuts' 
  | 'tree-nuts' 
  | 'soy' 
  | 'wheat' 
  | 'fish' 
  | 'shellfish' 
  | 'sesame';

export type RecipeTag = 
  | 'picky-eater-approved'
  | 'hidden-veggies' 
  | 'one-pot-meal'
  | 'freezer-friendly'
  | 'batch-cook'
  | 'travel-friendly'
  | 'daycare-lunch'
  | 'teething-safe'
  | 'constipation-help'
  | 'immunity-boost'
  | 'brain-food'
  | 'sleep-helper'
  | 'energy-boost'
  | 'comfort-food';

export type PopularWith = 
  | 'picky-eaters'
  | 'adventurous-eaters' 
  | 'texture-sensitive'
  | 'sweet-tooths'
  | 'veggie-lovers'
  | 'protein-seekers';

export type NutritionalFocus = 
  | 'iron-rich'
  | 'calcium-rich' 
  | 'high-protein'
  | 'healthy-fats'
  | 'fiber-rich'
  | 'vitamin-c'
  | 'vitamin-d' 
  | 'omega-3'
  | 'probiotics'
  | 'antioxidants';

export interface NutritionInfo {
  calories?: number;
  protein?: number;    // grams
  carbs?: number;      // grams
  fat?: number;        // grams
  fiber?: number;      // grams
  iron?: number;       // mg
  calcium?: number;    // mg
  vitaminC?: number;   // mg
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
  preparation?: string; // "chopped", "mashed", etc.
  optional?: boolean;
  substitutes?: string[];
  notes?: string; // "ensure ripe", "organic preferred"
}

export interface Instruction {
  step: number;
  instruction: string;
  duration?: number; // minutes
  temperature?: string;
  parentNote?: string; // safety or technique note
  toddlerTask?: string; // what toddler can help with
}

export interface ParentTip {
  category: 'safety' | 'preparation' | 'serving' | 'storage' | 'variation';
  tip: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// Filter types for the recipe browser
export interface RecipeFilters {
  ageGroups: AgeGroup[];
  mealTypes: MealType[];
  dietary: DietaryTag[];
  difficulty: Difficulty[];
  prepTime: {
    min: number;
    max: number;
  };
  messLevel: MessLevel[];
  nutritionalFocus: NutritionalFocus[];
  tags: RecipeTag[];
  allergenFree: Allergen[]; // exclude these allergens
  search: string;
}

export interface RecipeSearchResult {
  recipes: Recipe[];
  totalCount: number;
  filters: {
    availableAgeGroups: AgeGroup[];
    availableMealTypes: MealType[];
    availableDietary: DietaryTag[];
    availableTags: RecipeTag[];
  };
}