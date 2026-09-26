"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "./CategoryBadge";
import type { ItemData } from "./ItemCard";

interface Props {
  item: ItemData;
  listId: string;
  onSaved: () => void;
  onClose: () => void;
}

export default function EditItemSheet({ item, listId, onSaved, onClose }: Props) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity?.toString() ?? "");
  const [unit, setUnit] = useState(item.unit ?? "");
  const [category, setCategory] = useState(item.category);
  const [notes, setNotes] = useState(item.notes ?? "");
  const [estimatedPrice, setEstimatedPrice] = useState(item.estimatedPrice?.toString() ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/lists/${listId}/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), quantity, unit, category, notes, estimatedPrice }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error || "Failed to save");
      return;
    }
    onSaved();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30 sheet-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-semibold text-[#0F172A]">Edit item</h2>
          <button onClick={onClose} className="btn-press cursor-pointer text-[#475569]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-5 py-4 space-y-4">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Item name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[#0F172A] focus:border-slate-400"
                required
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Quantity</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[#0F172A] focus:border-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[#0F172A] focus:border-slate-400 cursor-pointer"
                >
                  <option value="">—</option>
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="ml">ml</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                  <option value="pack">pack</option>
                  <option value="box">box</option>
                  <option value="bag">bag</option>
                  <option value="can">can</option>
                  <option value="bottle">bottle</option>
                  <option value="bunch">bunch</option>
                  <option value="dozen">dozen</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[#0F172A] focus:border-slate-400 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Estimated price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={estimatedPrice}
                  onChange={(e) => setEstimatedPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl text-[#0F172A] focus:border-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Notes</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[#0F172A] focus:border-slate-400"
              />
            </div>
          </div>

          <div className="px-5 pb-5 pt-2 border-t border-slate-100 mt-auto">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="btn-press cursor-pointer w-full py-3 rounded-xl bg-[#0F172A] text-white font-medium disabled:opacity-40"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
