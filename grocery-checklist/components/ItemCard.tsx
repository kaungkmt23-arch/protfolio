"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import UserAvatar from "./UserAvatar";
import CheckPriceModal from "./CheckPriceModal";

export interface ItemData {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string;
  notes: string | null;
  estimatedPrice: number | null;
  actualPrice: number | null;
  isChecked: boolean;
  addedBy: { id: string; name: string };
  checkedBy: { id: string; name: string } | null;
}

interface Props {
  item: ItemData;
  onCheck: (id: string, actualPrice: number | null) => void;
  onUncheck: (id: string) => void;
  onEdit: (item: ItemData) => void;
  onDelete: (id: string) => void;
}

export default function ItemCard({ item, onCheck, onUncheck, onEdit, onDelete }: Props) {
  const [showPriceModal, setShowPriceModal] = useState(false);

  function handleCheckboxClick() {
    if (item.isChecked) {
      onUncheck(item.id);
    } else {
      setShowPriceModal(true);
    }
  }

  return (
    <>
      <div
        className={`flex items-start gap-3 py-3 px-4 rounded-xl transition-all ${
          item.isChecked ? "opacity-50" : ""
        }`}
      >
        <button
          onClick={handleCheckboxClick}
          className="btn-press cursor-pointer mt-0.5 shrink-0"
          aria-label={item.isChecked ? "Uncheck" : "Check"}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              item.isChecked
                ? "bg-[#0F172A] border-[#0F172A]"
                : "border-slate-300 bg-white"
            }`}
          >
            {item.isChecked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-medium text-[#0F172A] ${
                item.isChecked ? "line-through text-[#475569]" : ""
              }`}
            >
              {item.quantity && item.unit
                ? `${item.quantity} ${item.unit} `
                : item.quantity
                ? `${item.quantity}x `
                : ""}
              {item.name}
            </span>
            <CategoryBadge category={item.category} />
          </div>

          {item.notes && (
            <p className="text-xs text-[#475569] mt-0.5 truncate">{item.notes}</p>
          )}

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {item.estimatedPrice != null && (
              <span className="text-xs text-[#475569]">
                Est. ${item.estimatedPrice.toFixed(2)}
              </span>
            )}
            {item.actualPrice != null && (
              <span className="text-xs text-green-600 font-medium">
                Paid ${item.actualPrice.toFixed(2)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <UserAvatar name={item.addedBy.name} size="sm" />
              <span className="text-xs text-[#475569]">{item.addedBy.name}</span>
            </span>
            {item.checkedBy && (
              <span className="text-xs text-[#475569]">
                · checked by {item.checkedBy.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!item.isChecked && (
            <button
              onClick={() => onEdit(item)}
              className="btn-press cursor-pointer p-1.5 text-[#475569] hover:text-[#0F172A] transition-colors"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
          )}
          <button
            onClick={() => onDelete(item.id)}
            className="btn-press cursor-pointer p-1.5 text-[#475569] hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {showPriceModal && (
        <CheckPriceModal
          itemName={item.name}
          onConfirm={(actualPrice) => {
            setShowPriceModal(false);
            onCheck(item.id, actualPrice);
          }}
          onCancel={() => setShowPriceModal(false)}
        />
      )}
    </>
  );
}
