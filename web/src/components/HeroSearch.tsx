"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/colleges?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg mx-auto">
      <div className="flex items-center bg-white rounded-xl h-14 pl-4 pr-2 shadow-modal">
        <Search className="w-5 h-5 text-text-tertiary mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Search colleges, courses, cities..."
          className="flex-1 h-full bg-transparent outline-none text-body-sm text-text-primary placeholder:text-text-tertiary"
          aria-label="Search colleges"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit"
          className="h-10 px-5 bg-navy hover:bg-navy-dark text-white text-sm font-semibold rounded-lg transition-colors btn-press shrink-0"
        >
          Search
        </button>
      </div>
    </form>
  );
}
