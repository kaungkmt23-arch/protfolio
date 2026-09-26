export const CATEGORY_COLORS: Record<string, string> = {
  Produce: "bg-green-400",
  Dairy: "bg-blue-400",
  Bakery: "bg-amber-400",
  "Meat & Seafood": "bg-red-400",
  Frozen: "bg-cyan-400",
  Pantry: "bg-orange-400",
  Beverages: "bg-purple-400",
  Snacks: "bg-pink-400",
  Household: "bg-gray-400",
  "Personal Care": "bg-teal-400",
  Other: "bg-slate-300",
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

export default function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] || "bg-slate-300";
  return (
    <span className="flex items-center gap-1">
      <span className={`w-2 h-2 rounded-full ${color} shrink-0`} />
      <span className="text-xs text-[#475569]">{category}</span>
    </span>
  );
}
