"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { CollegeCard } from "@/components/CollegeCard";
import { PromoSection } from "@/components/PromoSection";
import { StreamPills } from "@/components/StreamPills";
import type { College } from "@/lib/mockData";
import { supabase } from "@/lib/supabase/client";
import {
  SlidersHorizontal,
  ChevronDown,
  ArrowLeft,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Sort options
const sortOptions = [
  { label: "Rank (Low to High)", value: "rank-asc" },
  { label: "Rank (High to Low)", value: "rank-desc" },
  { label: "Rating (High to Low)", value: "rating-desc" },
  { label: "Rating (Low to High)", value: "rating-asc" },
  { label: "Avg Package (High to Low)", value: "avg_package-desc" },
  { label: "Avg Package (Low to High)", value: "avg_package-asc" },
  { label: "Name (A-Z)", value: "name-asc" },
];

// Filter options
const typeOptions = ["Government", "Private"];
const approvalOptions = ["AICTE", "UGC", "NAAC", "MCI", "BCI", "AACSB", "EQUIS", "AMBA"];

const ITEMS_PER_PAGE = 9;

function formatPackage(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100) return `₹${val.toFixed(0)} LPA`;
  return `₹${val} LPA`;
}

function formatStudents(val: number | null): string {
  if (!val) return "";
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K+`;
  return `${val}+`;
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-surface">
        <TopNavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-teal animate-spin" />
        </div>
      </div>
    }>
      <CollegesContent />
    </Suspense>
  );
}

function CollegesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialStream = searchParams.get("stream") || "all";

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [activeStream, setActiveStream] = useState(initialStream);
  const [sortBy, setSortBy] = useState("rank-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // DB state
  const [allDbColleges, setAllDbColleges] = useState<College[]>([]);
  const [isDbLoaded, setIsDbLoaded] = useState(false);

  useEffect(() => {
    const fetchAllDb = async () => {
      const { data } = await supabase.from('colleges').select('*');
      if (data) {
        setAllDbColleges(data as College[]);
      }
      setIsDbLoaded(true);
    };
    fetchAllDb();
  }, []);

  // Filter state
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);

  // Temp filter state (for drawer apply/cancel)
  const [tempTypes, setTempTypes] = useState<string[]>([]);
  const [tempApprovals, setTempApprovals] = useState<string[]>([]);

  const activeFilterCount = selectedTypes.length + selectedApprovals.length;

  const fetchColleges = useCallback(() => {
    if (!isDbLoaded) return;

    setLoading(true);

    const [sortField, sortDir] = sortBy.split("-");
    const ascending = sortDir === "asc";

    let filtered = [...allDbColleges];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.city.toLowerCase().includes(q) || 
        c.state.toLowerCase().includes(q) ||
        (c.stream && c.stream.toLowerCase().includes(q))
      );
    }

    // Stream filter
    if (activeStream !== "all") {
      filtered = filtered.filter(c => {
        if (!c.stream) return false;
        const streams = c.stream.split(',').map(s => s.trim().toLowerCase());
        return streams.includes(activeStream.toLowerCase());
      });
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(c => c.type && selectedTypes.includes(c.type));
    }

    // Approval filter (contains any of selected)
    if (selectedApprovals.length > 0) {
      filtered = filtered.filter(c => 
        c.approvals && selectedApprovals.some(a => c.approvals!.includes(a))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA = a[sortField as keyof College];
      let valB = b[sortField as keyof College];
      
      if (valA === null) return 1;
      if (valB === null) return -1;
      
      if (valA! < valB!) return ascending ? -1 : 1;
      if (valA! > valB!) return ascending ? 1 : -1;
      return 0;
    });

    // Pagination
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    const paginated = filtered.slice(from, to);

    // Simulate network delay
    setTimeout(() => {
      setColleges(paginated);
      setTotalCount(filtered.length);
      setLoading(false);
    }, 100);
  }, [activeStream, sortBy, currentPage, selectedTypes, selectedApprovals, searchQuery, isDbLoaded, allDbColleges]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Sync stream from URL if it changes
  useEffect(() => {
    const s = searchParams.get("stream");
    if (s) setActiveStream(s);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeStream, sortBy, selectedTypes, selectedApprovals, searchQuery]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const streamLabel =
    activeStream === "all"
      ? "All"
      : activeStream.charAt(0).toUpperCase() + activeStream.slice(1);

  // Open filter drawer
  const openFilterDrawer = () => {
    setTempTypes([...selectedTypes]);
    setTempApprovals([...selectedApprovals]);
    setShowFilterDrawer(true);
  };

  // Apply filters
  const applyFilters = () => {
    setSelectedTypes([...tempTypes]);
    setSelectedApprovals([...tempApprovals]);
    setShowFilterDrawer(false);
  };

  // Reset filters
  const resetFilters = () => {
    setTempTypes([]);
    setTempApprovals([]);
  };

  // Toggle helper
  const toggleItem = (
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      {/* Page Header */}
      <div className="bg-white pt-4 pb-2 px-4">
        <div className="container-mobile">
          <div className="flex items-center gap-2 mb-3 md:hidden">
            <Link href="/" className="p-1.5 hover:bg-surface-low rounded-lg transition-colors" aria-label="Go back">
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Link>
            <span className="text-label text-text-secondary">Back</span>
          </div>

          <h1 className="text-h1 text-text-primary">
            Top {streamLabel} Colleges in India 2026
          </h1>
          <p className="text-body-sm text-text-secondary mt-2 max-w-2xl">
            Discover the best {streamLabel.toLowerCase()} institutions across India. Compare fees, placements, rankings, and get expert counseling for free.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-14 z-30 bg-white shadow-nav">
        <div className="container-mobile py-3">
          <StreamPills activeStream={activeStream} onSelect={setActiveStream} />
        </div>
      </div>

      {/* Results Bar */}
      <div className="container-mobile pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-label text-text-secondary">
              Showing{" "}
              <span className="font-semibold text-text-primary">
                {Math.min(colleges.length, ITEMS_PER_PAGE)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-text-primary">{totalCount}</span>{" "}
              {streamLabel} Colleges
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setSelectedTypes([]); setSelectedApprovals([]); }}
                className="text-caption text-teal font-medium mt-0.5 hover:underline"
              >
                Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
              </button>
            )}
          </div>
          <div className="flex gap-2 relative">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDrawer(false); }}
                className="flex items-center gap-1.5 h-9 px-3 bg-surface-card rounded-[10px] shadow-card text-label font-semibold text-text-primary btn-press focus-ring"
              >
                Sort <ChevronDown className={`w-3.5 h-3.5 text-text-tertiary transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
              </button>

              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute right-0 top-11 z-50 bg-white rounded-[12px] shadow-modal py-1.5 w-56 animate-fade-in">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-label transition-colors flex items-center justify-between ${
                          sortBy === opt.value
                            ? "text-teal bg-teal/5 font-semibold"
                            : "text-text-primary hover:bg-surface-low"
                        }`}
                      >
                        {opt.label}
                        {sortBy === opt.value && <Check className="w-4 h-4 text-teal" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={openFilterDrawer}
              className="flex items-center gap-1.5 h-9 px-3 bg-navy text-white rounded-[10px] text-label font-semibold btn-press focus-ring shadow-sm relative"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* College Cards Grid */}
      <main className="container-mobile pb-24 flex-1">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-card rounded-[14px] shadow-card overflow-hidden animate-pulse">
                <div className="h-40 bg-surface-container" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-surface-container rounded w-3/4" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                  <div className="h-4 bg-surface-container rounded w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-10 bg-surface-container rounded-[10px] flex-1" />
                    <div className="h-10 bg-surface-container rounded-[10px] flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {colleges.map((college, index) => (
              <div key={college.id} className="contents">
                <CollegeCard
                  id={college.id}
                  name={college.name}
                  location={`${college.city || ""}, ${college.state || ""}`.replace(/^, |, $/g, "")}
                  rating={college.rating || 0}
                  fees={""}
                  package={formatPackage(college.avg_package)}
                  rank={college.rank || undefined}
                  stream={college.stream || "Engineering"}
                  approvals={college.approvals || []}
                  bannerUrl={college.banner_url || undefined}
                  logoUrl={college.logo_url || undefined}
                  totalStudents={formatStudents(college.total_students)}
                  isRecommended={college.is_recommended || false}
                />
                {index === 2 && <PromoSection />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-h3 text-text-primary">No colleges found</p>
            <p className="text-body-sm text-text-secondary mt-2">Try adjusting your filters or stream selection</p>
            <button
              onClick={() => { setActiveStream("all"); setSelectedTypes([]); setSelectedApprovals([]); }}
              className="mt-4 h-10 px-6 bg-navy text-white text-label font-semibold rounded-[10px] btn-press"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-9 px-3 text-label font-medium text-text-secondary hover:bg-surface-container rounded-lg transition-colors btn-press disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-label font-semibold transition-colors btn-press ${
                    currentPage === page
                      ? "bg-navy text-white"
                      : "text-text-secondary hover:bg-surface-container"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-text-tertiary">...</span>
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-9 px-3 text-label font-medium text-navy hover:bg-surface-container rounded-lg transition-colors btn-press disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <button className="flex items-center gap-2 h-12 px-5 bg-navy text-white rounded-full shadow-hover btn-press">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-label font-semibold">Talk to Expert</span>
        </button>
      </div>

      {/* ==================== FILTER DRAWER ==================== */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilterDrawer(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] max-h-[80vh] flex flex-col animate-slide-bottom md:absolute md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[16px] md:max-w-md md:max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-ghost shrink-0">
              <h2 className="text-h3 text-text-primary">Filters</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="text-label text-teal font-semibold hover:underline"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-1.5 hover:bg-surface-low rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* College Type */}
              <div>
                <p className="text-meta text-text-tertiary mb-3">College Type</p>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((type) => {
                    const isSelected = tempTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleItem(tempTypes, setTempTypes, type)}
                        className={`h-9 px-4 rounded-full text-label font-medium transition-all btn-press ${
                          isSelected
                            ? "bg-navy text-white"
                            : "bg-surface-low text-text-secondary hover:bg-surface-container"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 inline mr-1.5" />}
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Approvals */}
              <div>
                <p className="text-meta text-text-tertiary mb-3">Approvals & Accreditation</p>
                <div className="flex flex-wrap gap-2">
                  {approvalOptions.map((approval) => {
                    const isSelected = tempApprovals.includes(approval);
                    return (
                      <button
                        key={approval}
                        onClick={() => toggleItem(tempApprovals, setTempApprovals, approval)}
                        className={`h-9 px-4 rounded-full text-label font-medium transition-all btn-press ${
                          isSelected
                            ? "bg-navy text-white"
                            : "bg-surface-low text-text-secondary hover:bg-surface-container"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 inline mr-1.5" />}
                        {approval}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-ghost shrink-0">
              <button
                onClick={applyFilters}
                className="w-full h-12 bg-navy hover:bg-navy-dark text-white font-semibold rounded-[10px] transition-colors btn-press shadow-sm"
              >
                Apply Filters
                {(tempTypes.length + tempApprovals.length) > 0 && (
                  <span className="ml-2 bg-white/20 text-white text-badge px-2 py-0.5 rounded-full">
                    {tempTypes.length + tempApprovals.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SORT OVERLAY (mobile) ==================== */}
    </div>
  );
}
