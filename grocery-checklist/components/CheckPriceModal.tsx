"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  itemName: string;
  onConfirm: (actualPrice: number | null) => void;
  onCancel: () => void;
}

export default function CheckPriceModal({ itemName, onConfirm, onCancel }: Props) {
  const [price, setPrice] = useState("");

  function handleConfirm() {
    const val = price.trim() === "" ? null : parseFloat(price);
    onConfirm(isNaN(val as number) ? null : val);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 sheet-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0F172A]">Mark as bought</h3>
          <button onClick={onCancel} className="btn-press cursor-pointer text-[#475569]">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-[#475569] mb-4">
          <span className="font-medium text-[#0F172A]">{itemName}</span>
          <br />
          What did you actually pay? (optional)
        </p>
        <div className="relative mb-5">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl text-[#0F172A] focus:border-slate-400"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="btn-press cursor-pointer flex-1 py-2.5 rounded-xl border border-slate-200 text-[#475569] text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="btn-press cursor-pointer flex-1 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
