"use client";

import { cn } from "@/lib/utils";

const streams = [
  { name: "All", slug: "all" },
  { name: "Engineering", slug: "engineering" },
  { name: "Medical", slug: "medical" },
  { name: "Management", slug: "management" },
  { name: "Law", slug: "law" },
  { name: "Design", slug: "design" },
  { name: "Marine", slug: "marine" },
];

interface StreamPillsProps {
  activeStream?: string;
  onSelect?: (stream: string) => void;
  className?: string;
}

export function StreamPills({ activeStream = "all", onSelect, className }: StreamPillsProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto no-scrollbar py-1", className)}>
      {streams.map((stream) => {
        const isActive = activeStream === stream.slug;
        return (
          <button
            key={stream.slug}
            onClick={() => onSelect?.(stream.slug)}
            className={cn(
              "shrink-0 h-9 px-4 rounded-full text-label whitespace-nowrap transition-all duration-150 btn-press focus-ring",
              isActive
                ? "bg-navy text-white shadow-sm"
                : "bg-transparent text-text-secondary hover:bg-surface-container"
            )}
            style={{
              border: isActive ? "none" : "1.5px solid #D1D5DB",
            }}
            aria-pressed={isActive}
          >
            {stream.name}
          </button>
        );
      })}
    </div>
  );
}
