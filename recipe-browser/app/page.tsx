'use client';

import { useState, useMemo } from 'react';
import { Recipe, RecipeFilters, AgeGroup, MealType, DietaryTag, Difficulty, Allergen } from '../lib/types';
import { SAMPLE_RECIPES, filterRecipes, getAvailableFilters } from '../data/recipes';

export default function RecipeBrowser() {
  const [filters, setFilters] = useState<Partial<RecipeFilters>>({
    ageGroups: [],
    mealTypes: [],
    dietary: [],
    difficulty: [],
    allergenFree: [],
    prepTime: { min: 0, max: 60 },
    search: ''
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredRecipes = useMemo(() => {
    return filterRecipes(SAMPLE_RECIPES, filters);
  }, [filters]);

  const availableFilters = useMemo(() => {
    return getAvailableFilters(SAMPLE_RECIPES);
  }, []);

  const updateFilter = (key: keyof RecipeFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleArrayFilter = (key: keyof RecipeFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [key]: newArray
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      ageGroups: [],
      mealTypes: [],
      dietary: [],
      difficulty: [],
      allergenFree: [],
      prepTime: { min: 0, max: 60 },
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                🍼
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">ToddlerChef Recipe Browser</h1>
                <p className="text-sm text-slate-600">Find the perfect meals for your little one</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="../index.html" 
                className="text-sm text-slate-600 hover:text-slate-800 font-medium"
              >
                ← Back to ToddlerChef
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm-6 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search recipes
                </label>
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder="Search by name, ingredient..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                />
              </div>

              {/* Age Groups */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Age Group</h3>
                <div className="space-y-2">
                  {availableFilters.ageGroups.map((age) => (
                    <label key={age} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.ageGroups || []).includes(age)}
                        onChange={() => toggleArrayFilter('ageGroups', age)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-300"
                      />
                      <span className="ml-2 text-sm text-slate-600">
                        {age.replace('-', ' - ').replace('-months', ' months').replace('-years', ' years')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Types */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Meal Type</h3>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.mealTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleArrayFilter('mealTypes', type)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        (filters.mealTypes || []).includes(type)
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-amber-300'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prep Time */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Max Prep Time</h3>
                <div className="flex gap-2">
                  {[5, 10, 15, 30, 60].map((time) => (
                    <button
                      key={time}
                      onClick={() => updateFilter('prepTime', { min: 0, max: time })}
                      className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                        filters.prepTime?.max === time
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-amber-300'
                      }`}
                    >
                      {time}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Dietary</h3>
                <div className="space-y-2">
                  {availableFilters.dietary.slice(0, 6).map((diet) => (
                    <label key={diet} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.dietary || []).includes(diet)}
                        onChange={() => toggleArrayFilter('dietary', diet)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-300"
                      />
                      <span className="ml-2 text-sm text-slate-600 capitalize">
                        {diet.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Allergen-Free */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Allergen-Free</h3>
                <p className="text-xs text-slate-500 mb-2">Exclude recipes containing:</p>
                <div className="flex flex-wrap gap-1">
                  {availableFilters.allergens.map((allergen) => (
                    <button
                      key={allergen}
                      onClick={() => toggleArrayFilter('allergenFree', allergen)}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        (filters.allergenFree || []).includes(allergen)
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-red-300'
                      }`}
                    >
                      {allergen}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-sm text-slate-600">
                  Perfect meals for your little one
                </p>
              </div>
            </div>

            {/* Recipe Grid/List */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} viewMode={viewMode} />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No recipes found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your filters to find more recipes.</p>
                <button 
                  onClick={clearFilters}
                  className="btn bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, viewMode }: { recipe: Recipe; viewMode: 'grid' | 'list' }) {
  const ageDisplay = recipe.ageGroup.replace('-', ' - ').replace('-months', ' months').replace('-years', ' years');

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            🍽️
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-800 text-lg mb-1">{recipe.name}</h3>
              <div className="flex items-center gap-1 text-amber-600 text-sm">
                ⭐ {recipe.rating?.toFixed(1)}
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                {ageDisplay}
              </span>
              <span>⏱️ {recipe.totalTime}min</span>
              <span>👶 {recipe.difficulty}</span>
              <span>🎨 {recipe.messLevel} mess</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-amber-50 flex items-center justify-center text-4xl">
        🍽️
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-800 text-lg line-clamp-1">{recipe.name}</h3>
          <div className="flex items-center gap-1 text-amber-600 text-sm">
            ⭐ {recipe.rating?.toFixed(1)}
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>⏱️ {recipe.totalTime}min</span>
            <span>👶 {recipe.difficulty}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
              {ageDisplay}
            </span>
            <span className="text-xs text-slate-500">🎨 {recipe.messLevel} mess</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                {tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
