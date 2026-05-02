"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ApplicationModal } from "@/components/ApplicationModal";
import {
  GraduationCap, MapPin, Trophy, Star, TrendingUp, Users,
  ChevronRight, Search, Filter, ArrowUpRight, BookOpen, Award,
  Phone, CheckCircle2, Building2
} from "lucide-react";

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  rank: number | null;
  rating: number | null;
  avg_package: number | null;
  highest_package: number | null;
  total_students: number | null;
  type: string | null;
  stream: string | null;
  established_year: number | null;
  logo_url: string | null;
  banner_url: string | null;
  approvals: string[] | null;
  description: string | null;
}

interface SEOCollegeListingProps {
  colleges: College[];
  title: string;
  h1: string;
  subtitle: string;
  introText: string;
  breadcrumbs: { label: string; href: string }[];
  faqItems: { question: string; answer: string }[];
  pageUrl: string;
  filterLabel?: string;
  showRankColumn?: boolean;
  showPlacementColumn?: boolean;
}

function formatPkg(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100) return `₹${(val / 100).toFixed(1)} Cr`;
  return `₹${val} LPA`;
}

function formatStudents(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K+`;
  return `${val}`;
}

export function SEOCollegeListing({
  colleges,
  title,
  h1,
  subtitle,
  introText,
  breadcrumbs,
  faqItems,
  pageUrl,
  filterLabel,
  showRankColumn = true,
  showPlacementColumn = true,
}: SEOCollegeListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);

  const filtered = colleges.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.city || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || c.type === filterType;
    return matchesSearch && matchesType;
  });


  const types = ["All", ...Array.from(new Set(colleges.map((c) => c.type).filter(Boolean)))];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <TopNavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002444] via-[#1B3A5C] to-[#1a7a6e] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-[100px]" />
        </div>
        <div className="container-mobile relative py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="w-3.5 h-3.5" />
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-white/90 font-medium">{b.label}</span>
                ) : (
                  <Link href={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">
            {h1}
          </h1>
          <p className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl leading-relaxed font-medium">
            {subtitle}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { icon: GraduationCap, label: "Colleges Listed", value: colleges.length.toString() },
              { icon: Building2, label: "Govt. Colleges", value: colleges.filter(c => c.type === "Government").length.toString() },
              { icon: TrendingUp, label: "Avg. Package", value: colleges.length > 0 ? formatPkg(Math.round(colleges.reduce((s, c) => s + (c.avg_package || 0), 0) / colleges.filter(c => c.avg_package).length)) : "N/A" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
                <stat.icon className="w-5 h-5 text-teal-light" />
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-[11px] text-white/50 uppercase tracking-wider font-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="sticky top-14 md:top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container-mobile flex items-center gap-4 py-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:border-teal/30 focus:ring-4 focus:ring-teal/5 outline-none transition-all"
            />
          </div>
          <div className="hidden md:flex gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as string)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterType === type
                    ? "bg-navy text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-mobile py-10 px-4">
        {/* Intro Text (SEO) */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {introText}
          </p>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-gray-500">
            Showing <span className="text-navy">{filtered.length}</span> of {colleges.length} colleges
            {filterLabel && <span className="text-teal ml-1">— {filterLabel}</span>}
          </p>
        </div>

        {/* College Cards Grid */}
        <div className="space-y-4">
          {filtered.map((college, index) => (
            <Link
              key={college.id}
              href={`/colleges/${college.id}`}
              className="block bg-white rounded-2xl border border-gray-100 hover:border-teal/20 hover:shadow-lg transition-all group p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-5">
                {/* Rank Badge + Logo */}
                <div className="flex items-start gap-4">
                  {showRankColumn && college.rank && (
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-amber-600">#{college.rank}</span>
                    </div>
                  )}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                    {college.logo_url ? (
                      <img src={college.logo_url} alt={college.name} className="w-12 h-12 md:w-14 md:h-14 object-contain" />
                    ) : (
                      <span className="text-xl font-bold text-navy">
                        {college.name.split(" ").map(n => n[0]).join("").slice(0, 3)}
                      </span>
                    )}
                  </div>
                </div>

                {/* College Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {college.stream && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wider">
                        {college.stream}
                      </span>
                    )}
                    {college.type && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        college.type === "Government" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"
                      }`}>
                        {college.type}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-[#1E293B] group-hover:text-teal transition-colors line-clamp-1">
                    {college.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-red-400" /> {college.city}, {college.state}</span>
                    {college.established_year && (
                      <span className="hidden md:inline-flex items-center gap-1 border-l border-gray-200 pl-3">Est. {college.established_year}</span>
                    )}
                    {college.approvals && college.approvals.length > 0 && (
                      <span className="hidden md:inline-flex items-center gap-1 border-l border-gray-200 pl-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {college.approvals.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-row md:flex-col gap-4 md:gap-3 md:items-end md:text-right shrink-0 mt-2 md:mt-0">
                  {college.rating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-gray-800">{college.rating}/5</span>
                    </div>
                  )}
                  {showPlacementColumn && college.avg_package && (
                    <div>
                      <p className="text-base md:text-lg font-extrabold text-[#1E293B]">{formatPkg(college.avg_package)}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Avg. Package</p>
                    </div>
                  )}
                  <div className="hidden md:flex items-center gap-1 text-teal text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-700">No colleges found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16">
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 relative">Need Help Choosing the Right College?</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 relative">Our expert counselors have guided 10,000+ students. Get free, personalized admission guidance today.</p>
            <button
              onClick={() => setIsCounselingOpen(true)}
              className="h-14 px-10 bg-teal hover:bg-teal/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-teal/20 btn-press text-base relative"
            >
              Talk to Expert Counselor — Free
            </button>
          </div>
        </div>

        {/* FAQs */}
        {faqItems.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know before making your decision.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqItems} />
            </div>
          </section>
        )}

        {/* Internal Linking / Popular Categories Widget */}
        <section className="mt-16 border-t border-gray-100 pt-10">
          <h3 className="text-xl font-extrabold text-[#1E293B] mb-6">Popular Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Top Engineering Colleges in Chennai", href: "/top-engineering-colleges-in-chennai" },
              { label: "Government Medical Colleges in Chennai", href: "/government-medical-colleges-chennai" },
              { label: "Arts & Science Colleges in Chennai", href: "/arts-science-colleges/chennai" },
              { label: "Best Engineering Colleges in Tamil Nadu", href: "/top-engineering-colleges-tamilnadu" },
              { label: "Engineering Colleges Without JEE", href: "/engineering-colleges-chennai-without-jee" },
              { label: "Low Fee Engineering Colleges", href: "/engineering-colleges-chennai-low-fees" },
              { label: "MBA Colleges in Tamil Nadu", href: "/mba-colleges/tamilnadu" },
              { label: "Architecture Colleges in Tamil Nadu", href: "/architecture-colleges-tamilnadu" },
              { label: "Colleges in Kallakurichi", href: "/colleges-in-kallakurichi" }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-teal/30 hover:shadow-sm group transition-all"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-teal transition-colors">
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <InlineCTABanner />
        </div>
      </main>

      <ApplicationModal
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        collegeName="EduMadras"
        collegeId="edumadras-general"
        courses={[]}
        mode="counseling"
      />
    </div>
  );
}
