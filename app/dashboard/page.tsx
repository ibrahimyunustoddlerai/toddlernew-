"use client";

import React, { useMemo, useState } from "react";

/**
 * ToddlerLunch.ai  Premium Parent Dashboard (MVP)
 * ------------------------------------------------
 * Drop this component into a Next.js / React + Tailwind project.
 *
 * Features:
 * - Modern sidebar layout
 * - Child selector chips
 * - KPI stat cards with progress
 * - Weekly planner with drag-and-drop recipe assignment (HTML5 DnD)
 * - Quick Actions grid
 * - Nutrition summary with progress bars
 * - Streak / encouragement banner
 * - Mobile-friendly, accessible labels
 *
 * Notes:
 * - No external UI libs required. Uses only Tailwind.
 * - Replace MOCK data / TODOs with your real data calls.
 * - Wire up actions (GenerateRecipe, OpenPlanner, etc.) to your routes.
 */

// ---------- Mock Data ----------
const MOCK_CHILDREN = [
  { id: "c1", name: "Aisha", ageLabel: "18+ months", avatar: "" },
  { id: "c2", name: "Yusuf", ageLabel: "3+ years", avatar: "" },
];

const MOCK_RECIPES = [
  { id: "r1", title: "Mini Veggie Muffins", age: "18+ months", emoji: "" },
  { id: "r2", title: "Carrot & Apple Purée", age: "6+ months", emoji: "" },
  { id: "r3", title: "Cheesy Cauliflower Rice Balls", age: "12+ months", emoji: "" },
  { id: "r4", title: "Toddler Tikka Skewers", age: "3+ years", emoji: "" },
  { id: "r5", title: "Lentil & Carrot Mash", age: "9+ months", emoji: "" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MEALS = ["Breakfast", "Lunch", "Dinner"] as const;

// ---------- Helper Components ----------
function Stat({ label, value, suffix = "", accent = "", helper }: { label: string; value: string | number; suffix?: string; accent?: string; helper?: string; }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${accent}`}>{value}{suffix}</div>
      {helper && <div className="mt-1 text-xs text-slate-400">{helper}</div>}
    </div>
  );
}

function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ---------- Drag & Drop Planner ----------

type SlotItem = { recipeId: string; title: string; emoji: string } | null;

function Planner() {
  // planner[day][meal] = SlotItem
  const [planner, setPlanner] = useState<Record<string, Record<string, SlotItem>>>(() => {
    const init: Record<string, Record<string, SlotItem>> = {};
    DAYS.forEach((d) => {
      init[d] = {} as Record<string, SlotItem>;
      MEALS.forEach((m) => (init[d][m] = null));
    });
    return init;
  });

  const onDragStart = (e: React.DragEvent, recipeId: string) => {
    e.dataTransfer.setData("text/plain", recipeId);
  };

  const onDrop = (e: React.DragEvent, day: string, meal: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const r = MOCK_RECIPES.find((x) => x.id === id);
    if (!r) return;
    setPlanner((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: { recipeId: r.id, title: r.title, emoji: r.emoji } },
    }));
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const clearSlot = (day: string, meal: string) => {
    setPlanner((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: null } }));
  };

  // Derived shopping list demo (stub: counts per recipe)
  const shoppingHint = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of DAYS) {
      for (const m of MEALS) {
        const slot = planner[d][m];
        if (slot) counts[slot.title] = (counts[slot.title] || 0) + 1;
      }
    }
    const items = Object.entries(counts)
      .map(([k, v]) => `${k} ${v}`)
      .slice(0, 6);
    return items.join(", ");
  }, [planner]);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Recipe bank */}
      <aside className="lg:col-span-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-600">Recipes</h3>
        <div className="grid gap-3">
          {MOCK_RECIPES.map((r) => (
            <div
              key={r.id}
              draggable
              onDragStart={(e) => onDragStart(e, r.id)}
              className="flex cursor-grab items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
              aria-label={`Drag ${r.title} to a day`}
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">{r.emoji}</div>
                <div>
                  <div className="font-medium text-slate-800">{r.title}</div>
                  <div className="text-xs text-slate-500">Suitable: {r.age}</div>
                </div>
              </div>
              <span className="text-xs text-emerald-600">Drag</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
          Tip: drag a recipe card into a meal slot. Click a scheduled card to clear.
        </div>
      </aside>

      {/* Calendar grid */}
      <section className="lg:col-span-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-600">Weekly Planner</h3>
          <button className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
            Export Shopping List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="w-24 text-left text-xs font-medium text-slate-500">Meal</th>
                {DAYS.map((d) => (
                  <th key={d} className="text-left text-xs font-medium text-slate-500">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEALS.map((meal) => (
                <tr key={meal}>
                  <td className="align-top text-xs font-semibold text-slate-600">{meal}</td>
                  {DAYS.map((day) => {
                    const slot = planner[day][meal];
                    return (
                      <td
                        key={`${day}-${meal}`}
                        onDrop={(e) => onDrop(e, day, meal)}
                        onDragOver={onDragOver}
                        className="h-24 rounded-xl border border-slate-200 bg-white/70 p-2 align-top shadow-sm"
                      >
                        {!slot ? (
                          <div className="flex h-full items-center justify-center text-[11px] text-slate-400">
                            Drop here
                          </div>
                        ) : (
                          <button
                            onClick={() => clearSlot(day, meal)}
                            className="flex w-full items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-left text-xs shadow-sm transition hover:shadow-md"
                            title="Click to remove"
                          >
                            <span className="text-base">{slot.emoji}</span>
                            <span className="font-medium text-slate-700">{slot.title}</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Shopping preview (demo): {shoppingHint || "Plan meals to see items"}
        </div>
      </section>
    </div>
  );
}

// ---------- Main Dashboard ----------
export default function PremiumDashboard() {
  const [activeChild, setActiveChild] = useState(MOCK_CHILDREN[0]);

  // Mock nutrition progress for demo
  const nutrition = { kcal: 2300, kcalGoal: 5600, protein: 62, proteinGoal: 105, carbs: 410, carbsGoal: 840, fat: 70, fatGoal: 175 };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-slate-800">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-6 p-4 lg:p-8">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-4 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold">ToddlerLunch AI</div>
              <nav className="grid gap-1 text-sm">
                {[
                  { label: "Dashboard", emoji: "" },
                  { label: "Recipes", emoji: "" },
                  { label: "Planner", emoji: "" },
                  { label: "Nutrition", emoji: "" },
                  { label: "Billing", emoji: "" },
                ].map((i) => (
                  <button key={i.label} className="flex items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-amber-50">
                    <span>{i.emoji}</span>
                    <span>{i.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
              Youve planned <strong>3/7</strong> days this week. Keep it up! 
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 space-y-6 lg:col-span-9">
          {/* Header */}
          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {activeChild.name}s planner </h1>
                <p className="mt-1 text-sm text-slate-500">Premium parent dashboard</p>
              </div>
              <div className="flex items-center gap-2">
                {MOCK_CHILDREN.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveChild(c)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition ${
                      c.id === activeChild.id
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                    aria-pressed={c.id === activeChild.id}
                  >
                    <span className="mr-1">{c.avatar}</span>
                    {c.name} <span className="ml-1 text-xs text-slate-400">({c.ageLabel})</span>
                  </button>
                ))}
                <button className="rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50">+ Add Child</button>
              </div>
            </div>
          </header>

          {/* KPI cards */}
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat label="Meals this week" value={3} accent="text-slate-800" helper="goal: 7" />
            <Stat label="Avg calories/day" value={350} suffix=" kcal" />
            <Stat label="Fav food" value=" Carrot" />
            <Stat label="Age" value={activeChild.ageLabel} />
          </section>

          {/* Nutrition summary */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">This Weeks Nutrition</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Progress label="Calories" value={nutrition.kcal} max={nutrition.kcalGoal} />
              <Progress label="Protein (g)" value={nutrition.protein} max={nutrition.proteinGoal} />
              <Progress label="Carbs (g)" value={nutrition.carbs} max={nutrition.carbsGoal} />
              <Progress label="Fat (g)" value={nutrition.fat} max={nutrition.fatGoal} />
            </div>
          </section>

          {/* Quick actions */}
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Generate Recipe", emoji: "" },
              { label: "Open Planner", emoji: "" },
              { label: "Shopping List", emoji: "" },
              { label: "Nutrition", emoji: "" },
            ].map((a) => (
              <button
                key={a.label}
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-[2px] hover:shadow-md"
              >
                <div className="text-2xl">{a.emoji}</div>
                <div className="mt-2 font-semibold">{a.label}</div>
                <div className="text-xs text-slate-500">Tap to continue</div>
              </button>
            ))}
          </section>

          {/* Planner with drag & drop */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Planner />
          </section>

          {/* Footer help */}
          <footer className="rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
            Youre doing an amazing job. Even planning one meal shows how much you care. 
          </footer>
        </main>
      </div>
    </div>
  );
}