import React from "react";

interface AccountAvatarProps {
  nickname?: string;
  isPro?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
];

function getInitials(name?: string): string {
  if (!name || !name.trim()) return "U";
  const trimmed = name.trim();

  // If camelCase or PascalCase (e.g. DragonSlayer, ShadowNinja)
  const capitalMatches = trimmed.match(/[A-Z]/g);
  if (capitalMatches && capitalMatches.length >= 2) {
    return capitalMatches.slice(0, 2).join("");
  }

  // If contains space or delimiter
  const parts = trimmed.split(/[\s_\-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // Single word: take first 2 chars
  return trimmed.slice(0, 2).toUpperCase();
}

function getGradient(name?: string): string {
  if (!name) return GRADIENTS[0];
  const charCodeSum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENTS[charCodeSum % GRADIENTS.length];
}

export function AccountAvatar({
  nickname,
  isPro = false,
  size = "sm",
  className = "",
}: AccountAvatarProps) {
  const initials = getInitials(nickname);
  const gradient = getGradient(nickname);

  const sizeClasses = {
    sm: "h-7 w-7 text-[11px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
  }[size];

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white font-bold font-mono tracking-tighter select-none shadow-sm ${sizeClasses} ${
        isPro ? "ring-2 ring-amber-500/60 shadow-amber-500/10" : "ring-1 ring-white/20"
      } ${className}`}
      title={nickname || "Tài khoản"}
    >
      <span>{initials}</span>
      {isPro && (
        <span
          className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-background shadow-xs"
          title="Thành viên PRO"
        />
      )}
    </div>
  );
}
