"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function TopNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const handlePopularSearch = (item: string) => {
    router.push(`/colleges?q=${encodeURIComponent(item)}`);
    setSearchOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-6 transition-all duration-300 py-2 md:py-0 ${
          scrolled
            ? "glass shadow-nav"
            : "bg-white/0"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "white",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <Link href="/" className="flex items-center focus-ring rounded-md">
          <Image 
            src="/edumadras-logo.png" 
            alt="EduMadras Logo" 
            width={180} 
            height={50} 
            className="object-contain w-24 md:w-36 h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {["Colleges", "Courses", "Counselors", "Compare"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors focus-ring rounded-md px-1 py-0.5"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 text-navy hover:bg-surface-container rounded-full transition-colors focus-ring btn-press"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/counselors"
            className="hidden md:flex items-center gap-2 h-10 px-5 bg-navy text-white text-sm font-semibold rounded-[10px] hover:bg-navy-dark transition-colors btn-press focus-ring"
          >
            Get Free Counseling
          </Link>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-white md:bg-black/40 animate-fade-in">
          <div className="w-full md:max-w-2xl md:mx-auto md:mt-20 bg-white md:rounded-xl md:shadow-modal">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 p-4 border-b border-border-ghost">
              <Search className="w-5 h-5 text-text-secondary shrink-0" />
              <input
                type="text"
                placeholder="Search colleges, courses, cities..."
                className="flex-1 text-base font-normal text-text-primary bg-transparent outline-none placeholder:text-text-tertiary"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </form>
            <div className="p-4">
              <p className="text-meta text-text-tertiary mb-3">Popular Searches</p>
              <div className="space-y-1">
                {["IIT Madras", "AIIMS Delhi", "B.Tech Computer Science", "MBA Colleges in India"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => handlePopularSearch(item)}
                      className="w-full text-left px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-low rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
