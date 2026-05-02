"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, School, GitCompareArrows, Headset, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Home", href: "/", icon: Home },
  { name: "Colleges", href: "/colleges", icon: School },
  { name: "Compare", href: "/compare", icon: GitCompareArrows },
  { name: "Counselors", href: "/counselors", icon: Headset },
  { name: "Guides", href: "/guides", icon: BookOpen },
];

export function BottomNav() {
  const pathname = usePathname();

  // Hide the mobile bottom nav on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-[60px] bg-white flex items-center justify-around px-1 md:hidden animate-slide-bottom"
      style={{
        boxShadow: "0 -1px 12px rgba(27, 58, 92, 0.06)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.href ||
          (tab.href !== "/" && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors relative focus-ring rounded-md",
              isActive ? "text-navy" : "text-text-tertiary"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-teal rounded-full" />
            )}
            <Icon
              className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-navy" : "text-text-tertiary"
              )}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className={cn(
                "text-[10px] tracking-wide transition-colors",
                isActive ? "font-semibold text-navy" : "font-normal"
              )}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
