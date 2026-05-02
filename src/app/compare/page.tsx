"use client";

import { useState } from "react";
import { TopNavBar } from "@/components/TopNavBar";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Trophy,
  ChevronRight,
  Plus,
  X,
  MapPin,
  Building2,
  Calendar,
  Users,
} from "lucide-react";
import { College } from "@/lib/mockData";
import { CollegeSearchModal } from "@/components/CollegeSearchModal";

const comparisonRows = [
  { label: "NIRF Rank", key: "rank", type: "lower-wins", icon: Trophy },
  { label: "Rating", key: "rating", type: "higher-wins", icon: Trophy },
  { label: "Avg Package", key: "avg_package", type: "currency", icon: Building2 },
  { label: "Highest Package", key: "highest_package", type: "currency", icon: Building2 },
  { label: "Total Students", key: "total_students", type: "number", icon: Users },
  { label: "Type", key: "type", type: "text", icon: Building2 },
  { label: "Established", key: "established_year", type: "text", icon: Calendar },
  { label: "Location", key: "city", type: "location", icon: MapPin },
];

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<(College | null)[]>([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const handleOpenModal = (slot: number) => {
    setActiveSlot(slot);
    setIsModalOpen(true);
  };

  const handleSelectCollege = (college: College) => {
    if (activeSlot !== null) {
      const newSelected = [...selectedColleges];
      newSelected[activeSlot] = college;
      setSelectedColleges(newSelected);
    }
  };

  const handleRemoveCollege = (slot: number) => {
    const newSelected = [...selectedColleges];
    newSelected[slot] = null;
    setSelectedColleges(newSelected);
  };

  const formatValue = (college: College | null, row: any) => {
    if (!college) return "-";
    const val = college[row.key as keyof College];
    if (val === null || val === undefined) return "-";
    
    if (row.type === "currency") return `₹${val} LPA`;
    if (row.type === "location") return `${college.city}, ${college.state}`;
    return String(val);
  };

  const getWinner = (row: any) => {
    const c1 = selectedColleges[0];
    const c2 = selectedColleges[1];
    if (!c1 || !c2) return null;

    const val1 = c1[row.key as keyof College];
    const val2 = c2[row.key as keyof College];

    if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) return null;
    if (val1 === val2) return null;

    if (row.type === "lower-wins") {
      return (val1 as number) < (val2 as number) ? 0 : 1;
    } else if (row.type === "higher-wins" || row.type === "currency" || row.type === "number") {
      return (val1 as number) > (val2 as number) ? 0 : 1;
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      {/* Page Header */}
      <div className="bg-white pt-4 pb-5 px-4">
        <div className="container-mobile">
          <div className="flex items-center gap-2 mb-3 md:hidden">
            <Link href="/colleges" className="p-1.5 hover:bg-surface-low rounded-lg transition-colors" aria-label="Go back">
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-caption mb-3" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-mid hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <Link href="/colleges" className="text-blue-mid hover:underline">Colleges</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium">Compare</span>
          </nav>

          <h1 className="text-h1 text-text-primary">
            Compare Colleges
          </h1>
          <p className="text-body-sm text-text-secondary mt-1.5">
            Select two colleges to compare their fees, placements and rankings side-by-side
          </p>
        </div>
      </div>

      {/* College Selection Slots */}
      <div className="container-mobile -mt-1 px-4">
        <div className="flex gap-4">
          {[0, 1].map((slot) => {
            const college = selectedColleges[slot];
            return (
              <div key={slot} className="flex-1">
                {college ? (
                  <div className="relative bg-surface-card rounded-2xl shadow-card overflow-hidden border border-border-ghost animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <button 
                      onClick={() => handleRemoveCollege(slot)}
                      className="absolute top-2 right-2 z-20 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative h-24 overflow-hidden">
                      {college.banner_url ? (
                        <img src={college.banner_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full gradient-navy" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-3 -mt-6 relative z-10">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-border-ghost flex items-center justify-center p-1 mb-2">
                        {college.logo_url ? (
                          <img src={college.logo_url} alt={college.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-navy font-bold text-xs">
                            {college.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-label font-bold text-navy line-clamp-1">{college.name}</h3>
                      <p className="text-caption text-text-secondary line-clamp-1">{college.city}, {college.state}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenModal(slot)}
                    className="w-full h-40 bg-white border-2 border-dashed border-border-ghost rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-teal hover:bg-teal/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-teal" />
                    </div>
                    <span className="text-sm font-semibold text-text-secondary">Add College</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <main className="container-mobile pb-24 mt-8 px-4 space-y-6">
        {/* Comparison Table */}
        <section className="bg-surface-card rounded-2xl shadow-card overflow-hidden border border-border-ghost">
          <div className="p-4 bg-navy text-white flex items-center justify-between">
            <h2 className="text-h3 font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-teal" /> Comparison Stats
            </h2>
          </div>

          <div className="divide-y divide-border-ghost">
            {comparisonRows.map((row, i) => {
              const winIndex = getWinner(row);
              const val1 = formatValue(selectedColleges[0], row);
              const val2 = formatValue(selectedColleges[1], row);

              return (
                <div key={row.label} className="flex items-stretch min-h-[56px]">
                  <div className="w-24 md:w-40 shrink-0 p-4 bg-surface-low border-r border-border-ghost flex items-center">
                    <span className="text-badge font-bold text-text-secondary uppercase tracking-wider">{row.label}</span>
                  </div>
                  <div className="flex-1 flex">
                    <div className={`flex-1 p-4 flex items-center justify-center text-center text-label border-r border-border-ghost transition-colors ${
                      winIndex === 0 ? "bg-teal/5 font-bold text-teal" : "text-text-primary"
                    }`}>
                      <div className="flex flex-col items-center gap-1">
                        {winIndex === 0 && <Trophy className="w-3 h-3 text-amber-500" />}
                        {val1}
                      </div>
                    </div>
                    <div className={`flex-1 p-4 flex items-center justify-center text-center text-label transition-colors ${
                      winIndex === 1 ? "bg-teal/5 font-bold text-teal" : "text-text-primary"
                    }`}>
                      <div className="flex flex-col items-center gap-1">
                        {winIndex === 1 && <Trophy className="w-3 h-3 text-amber-500" />}
                        {val2}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Empty State / Hint */}
        {!selectedColleges[0] || !selectedColleges[1] ? (
          <div className="bg-blue-low/30 border border-blue-mid/20 rounded-xl p-4 flex items-start gap-3">
            <div className="mt-0.5">
              <Building2 className="w-5 h-5 text-blue-mid" />
            </div>
            <p className="text-sm text-blue-dark leading-relaxed">
              Select two colleges to see a detailed side-by-side comparison. We'll show you rankings, package data, and more to help you decide.
            </p>
          </div>
        ) : null}

        {/* CTA Banner */}
        <section className="gradient-navy rounded-2xl p-6 text-center overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal/15 rounded-full -mr-10 -mt-10 blur-3xl" />
          <h2 className="text-h3 text-white font-bold relative z-10">Need Help Choosing?</h2>
          <p className="text-body-sm text-white/60 mt-2 relative z-10">
            Get free personalized counseling to choose between these colleges
          </p>
          <button className="mt-6 h-12 px-10 bg-teal hover:bg-teal-light text-navy font-bold rounded-xl transition-all btn-press relative z-10 shadow-lg">
            Get Free Counseling
          </button>
        </section>
      </main>

      <CollegeSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectCollege}
      />
    </div>
  );
}
