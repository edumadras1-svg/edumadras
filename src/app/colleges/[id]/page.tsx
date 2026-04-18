"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { CollegeCard } from "@/components/CollegeCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import type { College, CollegeCourse } from "@/lib/mockData";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Award,
  Users,
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  GitCompareArrows,
  Building2,
  TrendingUp,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { motion, AnimatePresence } from "framer-motion";

function formatPkg(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100) return `₹${(val / 100).toFixed(1)} Cr`;
  return `₹${val} LPA`;
}

function formatFee(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L/yr`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K/yr`;
  return `₹${val}/yr`;
}

function formatStudents(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
  return `${val}`;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<CollegeCourse[]>([]);
  const [similarColleges, setSimilarColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: collegeData, error: collegeError } = await supabase
          .from("colleges")
          .select("*")
          .eq("id", id)
          .single();

        if (collegeError || !collegeData) {
          setLoading(false);
          return;
        }

        setCollege(collegeData as College);

        const { data: coursesData } = await supabase
          .from("college_courses")
          .select("*, master_courses(name, stream)")
          .eq("college_id", id);
          
        if (coursesData) {
          setCourses(coursesData as unknown as CollegeCourse[]);
        }

        const { data: similarData } = await supabase
          .from("colleges")
          .select("*")
          .eq("stream", collegeData.stream || "")
          .neq("id", id)
          .order("rank", { ascending: true })
          .limit(4);

        if (similarData) {
          setSimilarColleges(similarData as College[]);
        }
      } catch (err) {
        console.error("Failed to fetch college details", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopNavBar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-teal" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopNavBar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h2 className="text-3xl font-bold text-text-primary">College not found</h2>
            <p className="text-text-secondary mt-2">The institution you are looking for does not exist or has been moved.</p>
            <Link href="/colleges" className="mt-6 inline-flex items-center gap-2 h-12 px-6 bg-navy text-white font-semibold rounded-xl btn-press">
              <ArrowLeft className="w-5 h-5" /> Back to Colleges
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const faqItems = [
    {
      question: `What is the fee structure at ${college.name}?`,
      answer: courses.length > 0
        ? `${college.name} offers ${courses.length} program(s). Fees range from ${formatFee(Math.min(...courses.map(c => c.fee || Infinity)))} to ${formatFee(Math.max(...courses.map(c => c.fee || 0)))} depending on the program.`
        : `Please contact the admissions office for the latest fee structure.`,
    },
    {
      question: `Is ${college.name} government or private?`,
      answer: `${college.name} is a ${college.type || "N/A"} institution established in ${college.established_year || "N/A"} located in ${college.city}, ${college.state}.`,
    },
    {
      question: `What is the placement record at ${college.name}?`,
      answer: `The average placement package is ${formatPkg(college.avg_package)} and the highest package recorded is ${formatPkg(college.highest_package)}.`,
    },
    {
      question: `What are the approvals for ${college.name}?`,
      answer: `${college.name} is approved by ${(college.approvals || []).join(", ") || "N/A"}.`,
    },
  ];

  const streamSlug = college.stream?.toLowerCase() || "engineering";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <TopNavBar />

      {/* Breadcrumb - Glass Style */}
      <div className="bg-white/50 backdrop-blur-md sticky top-14 md:top-16 z-30 px-4 py-2 border-b border-gray-100">
        <div className="container-mobile">
          <nav className="flex items-center gap-1.5 text-[11px] md:text-caption" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link href={`/colleges?stream=${streamSlug}`} className="text-blue-600 hover:text-blue-800 transition-colors capitalize">{college.stream || "Colleges"}</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600 font-medium truncate max-w-[150px] md:max-w-none">{college.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative h-[280px] md:h-[400px] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {college.banner_url ? (
            <img src={college.banner_url} alt={`${college.name} campus`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full gradient-hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/20" />
        </motion.div>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Main Container */}
      <main className="container-mobile -mt-20 md:-mt-32 relative z-10 px-4 pb-24">
        
        {/* College Identity Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 -mt-2 md:-mt-0">
               {college.logo_url ? (
                <img src={college.logo_url} alt={`${college.name} logo`} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              ) : (
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-navy to-teal">
                  {college.name.split(" ").map(n => n[0]).join("").slice(0, 3)}
                </span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  {college.stream}
                </span>
                {college.is_recommended && (
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-600" /> Recommended
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-2">
                {college.name} Admission 2026
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1.5 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>{college.city}, {college.state}</span>
                </div>
                {college.established_year && (
                  <div className="flex items-center gap-1.5 text-sm md:text-base border-l border-gray-200 pl-4">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Est. {college.established_year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
            {[
              { icon: Award, label: "NIRF Rank", value: `#${college.rank || "N/A"}`, color: "text-amber-500", bg: "bg-amber-50" },
              { icon: Star, label: "User Rating", value: `${college.rating || "N/A"}/5`, color: "text-emerald-500", bg: "bg-emerald-50" },
              { icon: Users, label: "Strength", value: formatStudents(college.total_students), color: "text-blue-500", bg: "bg-blue-50" },
              { icon: TrendingUp, label: "Avg Package", value: formatPkg(college.avg_package), color: "text-pink-500", bg: "bg-pink-50" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className={`${stat.bg} rounded-2xl p-4 flex flex-col items-center text-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</span>
                <span className={`text-base md:text-xl font-extrabold ${stat.color.replace('text-', 'text-slate-900')}`}>{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button className="flex-1 h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl transition-all shadow-xl shadow-slate-200 btn-press flex items-center justify-center gap-2">
              Apply Now Free
            </button>
            <button className="flex-1 h-12 bg-white border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-800 font-bold rounded-xl transition-all btn-press flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Brochure
            </button>
            <button className="w-full sm:w-auto px-6 h-12 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all btn-press flex items-center justify-center gap-2">
              <GitCompareArrows className="w-4 h-4" /> Compare
            </button>
          </div>
        </motion.div>

        {/* Content Tabs Navigation - Placeholder for feel */}
        <div className="flex gap-6 mt-12 overflow-x-auto no-scrollbar pb-2 border-b border-gray-100">
          {["Overview", "Courses", "Placement", "Admission"].map((tab, i) => (
            <button key={tab} className={`text-sm font-bold pb-2 transition-all whitespace-nowrap ${i === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            <motion.section {...fadeInUp} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">About the Institution</h2>
              </div>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {college.description || "Information about this college will be updated soon. Stay tuned for details about campus life, infrastructure, and unique features."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Ownership", value: college.type },
                  { label: "Approved By", value: college.approvals?.join(", ") },
                  { label: "Campus Area", value: "250+ Acres" },
                  { label: "Total Faculty", value: "450+" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-700">{item.value || "Not available"}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Courses & Fees */}
            <motion.section {...fadeInUp} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Popular Courses</h2>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                  {courses.length} Programs
                </span>
              </div>

              <div className="space-y-4">
                {courses.map((course, i) => (
                  <div 
                    key={course.id} 
                    className="p-4 md:p-6 border border-gray-50 bg-slate-50/30 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base md:text-lg font-bold text-slate-800">{course.master_courses?.name}</h3>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.duration}</span>
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.seats} Seats</span>
                          <span className="hidden sm:inline-block text-slate-300">|</span>
                          <span className="text-slate-600">{course.eligibility}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col justify-between md:text-right items-center md:items-end">
                        <p className="text-lg md:text-xl font-extrabold text-[#111827]">{formatFee(course.fee)}</p>
                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Estimated Annual Fee</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-6 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-2">Interested in Admission?</h3>
              <p className="text-white/60 text-sm mb-6">Connect with our expert counselors for free personalized guidance.</p>
              <button className="w-full h-12 bg-white text-navy font-bold rounded-xl mb-3 hover:bg-blue-50 transition-all">
                Talk to Expert
              </button>
              <button className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all">
                Check Cutoffs
              </button>
            </div>

            {/* Ranking Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" /> Ratings Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Academics", score: 4.8 },
                  { label: "Infrastructure", score: 4.5 },
                  { label: "Placement", score: 4.7 },
                  { label: "Campus Life", score: 4.2 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-600">{r.label}</span>
                      <span className="font-bold text-slate-900">{r.score}/5</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(r.score / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement highlights */}
            <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-50 rounded-full pointer-events-none" />
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 relative">
                <TrendingUp className="w-5 h-5 text-rose-500" /> Placement History
              </h3>
              <div className="space-y-6 relative">
                 <div className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl">
                    <div>
                      <p className="text-2xl font-black text-rose-600">{formatPkg(college.highest_package)}</p>
                      <p className="text-[10px] font-bold text-rose-400 uppercase">Highest CTC</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-bold text-slate-800">{formatPkg(college.avg_package)}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Average CTC</p>
                    </div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {["Google", "Microsoft", "Amazon", "Goldman Sachs", "ITC"].map(c => (
                     <span key={c} className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full">{c}</span>
                   ))}
                   <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full">200+ more</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Have Some Questions?</h2>
            <p className="text-slate-500">Find answers to commonly asked questions about {college.name}</p>
          </div>
          <div className="max-w-3xl mx-auto">
             <FAQAccordion items={faqItems} />
          </div>
        </section>

        <InlineCTABanner />

        {/* Similar Colleges (Horizontal Scroll) */}
        {similarColleges.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Students Also Compared With</h2>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pl-1 -ml-1">
              {similarColleges.map((sc, i) => (
                <motion.div 
                  key={sc.id} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[300px] md:min-w-[340px]"
                >
                  <CollegeCard
                    id={sc.id}
                    name={sc.name}
                    location={`${sc.city || ""}, ${sc.state || ""}`.replace(/^, |, $/g, "")}
                    rating={sc.rating || 0}
                    fees={""}
                    package={formatPkg(sc.avg_package)}
                    rank={sc.rank || undefined}
                    stream={sc.stream || "Engineering"}
                    approvals={sc.approvals || []}
                    bannerUrl={sc.banner_url || undefined}
                    logoUrl={sc.logo_url || undefined}
                    totalStudents={sc.total_students ? formatStudents(sc.total_students) : "N/A"}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom Actions (Mobile) */}
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl md:hidden p-4 pb-6 flex gap-3 border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]"
        >
          <button className="flex-1 h-12 bg-navy text-white font-bold rounded-xl btn-press text-sm">
            Talk to Experts
          </button>
          <button className="flex-1 h-12 bg-teal text-white font-bold rounded-xl btn-press text-sm">
            Apply Online
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

