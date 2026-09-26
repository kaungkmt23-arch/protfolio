"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function InviteCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
      <span className="font-mono font-bold tracking-widest text-lg text-[#0F172A]">{code}</span>
      <button
        onClick={copy}
        className="btn-press cursor-pointer ml-auto text-[#475569] hover:text-[#0F172A] transition-colors"
        title="Copy invite code"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
}
