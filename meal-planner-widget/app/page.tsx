'use client';

import React, { useState } from 'react';

interface MealPlan {
  [day: string]: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
}

const SAMPLE_MEALS = {
  breakfast: [
    'Avocado & Banana Mash',
    'Mini Mashed Veg Omelette', 
    'Hidden Veg Pancakes',
    'Breakfast Burrito',
    'Apple & Cinnamon Purée'
  ],
  lunch: [
    'Quinoa & Veggie Bowl',
    'Mini Tuna Cakes',
    'Pasta with Tomato & Veg Sauce',
    'Toddler-Friendly Quesadilla',
    'Mini Chicken & Veg Patties'
  ],
  dinner: [
    'Cheesy Pasta Bake',
    'Lentil & Carrot Mash',
    'Broccoli & Cauliflower Cheese',
    'Mini Turkey & Spinach Meatballs',
    'Creamy Pesto Pasta with Hidden Veg'
  ],
  snack: [
    'Sweet Potato Wedges',
    'Baked Apple & Oat Bites',
    'Vegetable Muffins',
    'Cheesy Cauliflower Rice Balls',
    'Berry & Yogurt Smoothie'
  ]
};

export default function SmartMealPlanner() {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const generateWeekPlan = () => {
    const newPlan: MealPlan = {};
    
    days.forEach(day => {
      newPlan[day] = {
        breakfast: SAMPLE_MEALS.breakfast[Math.floor(Math.random() * SAMPLE_MEALS.breakfast.length)],
        lunch: SAMPLE_MEALS.lunch[Math.floor(Math.random() * SAMPLE_MEALS.lunch.length)],
        dinner: SAMPLE_MEALS.dinner[Math.floor(Math.random() * SAMPLE_MEALS.dinner.length)],
        snack: SAMPLE_MEALS.snack[Math.floor(Math.random() * SAMPLE_MEALS.snack.length)]
      };
    });
    
    setMealPlan(newPlan);
  };

  const regenerateMeal = (day: string, mealType: keyof typeof SAMPLE_MEALS) => {
    const meals = SAMPLE_MEALS[mealType];
    const newMeal = meals[Math.floor(Math.random() * meals.length)];
    
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: newMeal
      }
    }));
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          margin: 0
        }}>
          🍽️ Smart Meal Planner
        </h1>
        <p style={{ 
          opacity: 0.9,
          margin: '8px 0 16px 0'
        }}>
          AI-powered weekly meal planning for your toddler
        </p>
        <button
          onClick={generateWeekPlan}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            padding: '12px 24px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          ✨ Generate New Meal Plan
        </button>
      </div>

      {Object.keys(mealPlan).length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</div>
          <h3 style={{ 
            color: '#475569', 
            marginBottom: '8px',
            fontSize: '1.25rem'
          }}>
            Ready to Plan Your Week?
          </h3>
          <p style={{ 
            color: '#64748b',
            marginBottom: '24px'
          }}>
            Click "Generate New Meal Plan" to get started with a balanced weekly menu
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {days.map(day => (
            <div
              key={day}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 style={{
                color: '#1e293b',
                marginBottom: '16px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {day}
              </h3>
              
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(mealType => (
                <div
                  key={mealType}
                  style={{
                    marginBottom: '12px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {mealType}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#334155',
                        fontWeight: '500'
                      }}>
                        {mealPlan[day]?.[mealType] || 'Not planned'}
                      </div>
                    </div>
                    <button
                      onClick={() => regenerateMeal(day, mealType)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        opacity: 0.6
                      }}
                      title={`Regenerate ${mealType}`}
                    >
                      🔄
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
      {Object.keys(mealPlan).length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            color: '#1e293b',
            marginBottom: '12px',
            fontSize: '1.1rem'
          }}>
            💡 Planning Tips
          </h3>
          <ul style={{
            color: '#64748b',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            marginLeft: '20px'
          }}>
            <li>Click the 🔄 icon next to any meal to generate a new suggestion</li>
            <li>All recipes are available in your Toddler Favourites collection</li>
            <li>Consider prep time when planning busy days</li>
            <li>Mix finger foods with spoon-fed meals for variety</li>
          </ul>
        </div>
      )}
    </div>
  );
}