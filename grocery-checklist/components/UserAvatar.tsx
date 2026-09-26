export default function UserAvatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const cls =
    size === "sm"
      ? "w-6 h-6 text-xs"
      : "w-8 h-8 text-sm";

  return (
    <span
      className={`${cls} rounded-full bg-slate-200 text-slate-600 font-medium flex items-center justify-center shrink-0`}
    >
      {initials}
    </span>
  );
}
