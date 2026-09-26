interface Item {
  estimatedPrice: number | null;
  actualPrice: number | null;
  isChecked: boolean;
}

export default function PriceSummary({ items }: { items: Item[] }) {
  const estTotal = items.reduce((s, i) => s + (i.estimatedPrice ?? 0), 0);
  const actTotal = items
    .filter((i) => i.actualPrice != null)
    .reduce((s, i) => s + (i.actualPrice ?? 0), 0);
  const hasActual = items.some((i) => i.actualPrice != null);
  const hasEst = items.some((i) => i.estimatedPrice != null);

  if (!hasEst && !hasActual) return null;

  return (
    <div className="flex gap-2 flex-wrap mb-3">
      {hasEst && (
        <span className="px-3 py-1 rounded-full bg-slate-100 text-sm text-[#475569] font-medium">
          Est. ${estTotal.toFixed(2)}
        </span>
      )}
      {hasActual && (
        <span className="px-3 py-1 rounded-full bg-green-50 text-sm text-green-700 font-medium">
          Actual ${actTotal.toFixed(2)}
        </span>
      )}
    </div>
  );
}
