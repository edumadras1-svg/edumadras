"use client";

import { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { College } from "@/lib/mockData";

interface CollegeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (college: College) => void;
}

export function CollegeSearchModal({ isOpen, onClose, onSelect }: CollegeSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchColleges = async () => {
      setLoading(true);
      let queryBuilder = supabase.from("colleges").select("*");

      if (query.trim().length >= 2) {
        queryBuilder = queryBuilder.ilike("name", `%${query}%`);
      } else if (query.trim().length > 0) {
        // Just show all if query is very short, or we could just skip filtering
      } else {
        // Fetch all ordered by rank
        queryBuilder = queryBuilder.order("rank", { ascending: true, nullsFirst: false });
      }

      const { data, error } = await queryBuilder.limit(50);

      if (error) {
        console.error("Error searching colleges:", error);
      } else {
        setResults(data as College[] || []);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(searchColleges, query.length > 0 ? 300 : 0);
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-border-ghost flex items-center justify-between">
          <h2 className="text-h3 text-navy font-bold">Select College</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-low rounded-full transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              autoFocus
              type="text"
              placeholder="Search by college name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-surface-low border border-border-ghost rounded-xl focus:outline-none focus:border-teal transition-colors"
            />
          </div>

          <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 text-text-tertiary">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p className="text-sm">Searching colleges...</p>
              </div>
            ) : results.length > 0 ? (
              results.map((college) => (
                <button
                  key={college.id}
                  onClick={() => {
                    onSelect(college);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-surface-low rounded-xl transition-colors text-left border border-transparent hover:border-border-ghost"
                >
                  <div className="w-12 h-12 bg-surface rounded-lg flex-shrink-0 overflow-hidden border border-border-ghost">
                    {college.logo_url ? (
                      <img src={college.logo_url} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy font-bold text-xs">
                        {college.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm line-clamp-1">{college.name}</h4>
                    <p className="text-xs text-text-secondary">{college.city}, {college.state}</p>
                  </div>
                </button>
              ))
            ) : query.length >= 2 ? (
              <div className="text-center py-8 text-text-tertiary">
                <p className="text-sm">No colleges found matching "{query}"</p>
              </div>
            ) : (
              <div className="text-center py-8 text-text-tertiary">
                <p className="text-sm italic">Scroll through the list or search by name</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
