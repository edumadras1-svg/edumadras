"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { CollegeCard } from "@/components/CollegeCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { mockColleges, mockCourses, type College, type CollegeCourse } from "@/lib/mockData";
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
  GraduationCap,
  Calendar,
  ChevronRight,
  Download,
  GitCompareArrows,
  Building2,
  TrendingUp,
  Loader2,
} from "lucide-react";

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

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<CollegeCourse[]>([]);
  const [similarColleges, setSimilarColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      setLoading(true);

      // Simulate network
      setTimeout(() => {
        // Fetch college
        const collegeData = mockColleges.find(c => c.id === id);
        
        if (!collegeData) {
          setLoading(false);
          return;
        }

        setCollege(collegeData);

        // Fetch courses
        const coursesData = mockCourses.filter(c => c.college_id === id);
        setCourses(coursesData);

        // Fetch similar colleges (same stream, excluding current)
        const similarData = mockColleges
          .filter(c => c.stream === collegeData.stream && c.id !== id)
          .sort((a, b) => (a.rank || 999) - (b.rank || 999))
          .slice(0, 4);

        setSimilarColleges(similarData);
        setLoading(false);
      }, 400);
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopNavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-teal animate-spin" />
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex flex-col min-h-screen bg-surface">
        <TopNavBar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-h2 text-text-primary">College not found</p>
          <Link href="/colleges" className="mt-4 text-teal font-semibold hover:underline">
            ← Back to Colleges
          </Link>
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
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      {/* Breadcrumb */}
      <div className="bg-white px-4 py-2">
        <div className="container-mobile">
          <nav className="flex items-center gap-1.5 text-caption" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-mid hover:underline">Home</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <Link href={`/colleges?stream=${streamSlug}`} className="text-blue-mid hover:underline capitalize">{college.stream || "Colleges"}</Link>
            <ChevronRight className="w-3 h-3 text-text-tertiary" />
            <span className="text-text-secondary font-medium truncate max-w-[180px]">{college.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative h-56 md:h-72 bg-navy overflow-hidden">
        {college.banner_url ? (
          <img src={college.banner_url} alt={`${college.name} campus`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full gradient-hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 md:hidden">
          <Link href="/colleges" className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors inline-flex">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors" aria-label="Share">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors" aria-label="Save">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* College Info */}
      <section className="container-mobile relative bg-white rounded-t-[20px] -mt-6 pt-2 pb-6 px-4 md:px-6">
        <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-[14px] shadow-hover flex items-center justify-center overflow-hidden">
          {college.logo_url ? (
            <img src={college.logo_url} alt={`${college.name} logo`} className="w-14 h-14 object-contain" />
          ) : (
            <span className="text-xl font-bold text-navy">
              {college.name.split(" ").map(n => n[0]).join("").slice(0, 3)}
            </span>
          )}
        </div>

        <div className="pt-12">
          <h1 className="text-h1 text-text-primary">{college.name} Admissions 2026</h1>

          <div className="flex items-center gap-1.5 mt-1.5 text-text-secondary">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-label">
              {college.city}, {college.state}
              {college.established_year ? ` · Established ${college.established_year}` : ""}
            </span>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {college.rank && (
              <div className="flex items-center gap-1.5 text-label">
                <Award className="w-4 h-4 text-teal" />
                <span className="text-text-secondary">Rank</span>
                <span className="font-semibold text-text-primary">#{college.rank}</span>
              </div>
            )}
            {college.rating && (
              <div className="flex items-center gap-1.5 text-label">
                <Star className="w-4 h-4 text-teal" />
                <span className="text-text-secondary">Rating</span>
                <span className="font-semibold text-text-primary">{college.rating}/5</span>
              </div>
            )}
            {college.established_year && (
              <div className="flex items-center gap-1.5 text-label">
                <Calendar className="w-4 h-4 text-teal" />
                <span className="text-text-secondary">Est.</span>
                <span className="font-semibold text-text-primary">{college.established_year}</span>
              </div>
            )}
            {college.total_students && (
              <div className="flex items-center gap-1.5 text-label">
                <Users className="w-4 h-4 text-teal" />
                <span className="text-text-secondary">Students</span>
                <span className="font-semibold text-text-primary">{formatStudents(college.total_students)}</span>
              </div>
            )}
          </div>

          {/* Approval Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {(college.approvals || []).map((badge) => (
              <span key={badge} className="bg-stream-engineering text-stream-engineering-text text-badge px-3 py-1 rounded-full">
                {badge}
              </span>
            ))}
            {college.is_recommended && (
              <span className="bg-amber-50 text-amber-700 text-badge px-3 py-1 rounded-full">
                ⭐ Recommended
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5 mt-6 md:flex-row">
            <button className="h-12 bg-navy hover:bg-navy-dark text-white font-semibold rounded-[10px] transition-colors btn-press flex items-center justify-center gap-2 md:flex-1">
              Get Free Counseling
            </button>
            <button className="h-12 bg-teal hover:bg-teal/90 text-white font-semibold rounded-[10px] transition-colors btn-press flex items-center justify-center gap-2 md:flex-1">
              <Download className="w-4 h-4" /> Download Brochure
            </button>
            <Link
              href="/compare"
              className="h-12 bg-surface-low hover:bg-surface-container text-navy font-semibold rounded-[10px] transition-colors btn-press flex items-center justify-center gap-2 md:w-auto md:px-6"
            >
              <GitCompareArrows className="w-4 h-4" /> Compare
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-mobile pb-32 space-y-8 mt-2">
        {/* Courses & Fees */}
        {courses.length > 0 && (
          <section className="bg-surface-card rounded-[14px] shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-teal" />
              <h2 className="text-h3 text-text-primary">Courses & Fees</h2>
              <span className="text-badge bg-surface-low text-text-secondary px-2 py-0.5 rounded ml-auto">
                {courses.length} course{courses.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-0">
              {courses.map((course, i) => (
                <div key={course.id} className={`py-4 ${i !== 0 ? "border-t border-border-ghost" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body-sm font-semibold text-text-primary">{course.master_courses?.name || "Course"}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {course.duration && <span className="text-caption text-text-secondary">{course.duration}</span>}
                        {course.seats && (
                          <>
                            <span className="text-text-tertiary">·</span>
                            <span className="text-caption text-text-secondary">{course.seats} Seats</span>
                          </>
                        )}
                        {course.eligibility && (
                          <>
                            <span className="text-text-tertiary">·</span>
                            <span className="text-caption text-text-secondary">{course.eligibility}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-body-sm font-bold text-teal">{formatFee(course.fee)}</p>
                      {course.avg_package && (
                        <p className="text-caption text-text-tertiary">{formatPkg(course.avg_package)} avg pkg</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About */}
        {college.description && (
          <section className="bg-surface-card rounded-[14px] shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-teal" />
              <h2 className="text-h3 text-text-primary">About {college.name}</h2>
            </div>

            <p className="text-body-lg text-text-secondary leading-relaxed">{college.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {[
                { label: "Type", value: college.type || "N/A" },
                { label: "City", value: college.city || "N/A" },
                { label: "State", value: college.state || "N/A" },
                { label: "Established", value: college.established_year?.toString() || "N/A" },
              ].map((fact) => (
                <div key={fact.label} className="bg-surface-low rounded-lg p-3">
                  <p className="text-badge text-text-tertiary">{fact.label}</p>
                  <p className="text-body-sm font-semibold text-text-primary mt-0.5">{fact.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Placement Statistics */}
        {(college.avg_package || college.highest_package) && (
          <section className="bg-surface-card rounded-[14px] shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal" />
              <h2 className="text-h3 text-text-primary">Placement Statistics</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal/10 to-teal/5 rounded-[12px] p-5 text-center">
                <p className="text-3xl font-bold text-teal">{formatPkg(college.avg_package)}</p>
                <p className="text-label text-text-secondary mt-1">Average Package</p>
              </div>
              <div className="bg-gradient-to-br from-navy/10 to-navy/5 rounded-[12px] p-5 text-center">
                <p className="text-3xl font-bold text-navy">{formatPkg(college.highest_package)}</p>
                <p className="text-label text-text-secondary mt-1">Highest Package</p>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-h3 text-text-primary mb-4">Frequently Asked Questions</h2>
          <FAQAccordion items={faqItems} />
        </section>

        {/* Similar Colleges */}
        {similarColleges.length > 0 && (
          <section>
            <h2 className="text-h3 text-text-primary mb-4">Students Also Viewed</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {similarColleges.map((sc) => (
                <div key={sc.id} className="min-w-[300px]">
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
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 z-40 bg-white p-3 shadow-[0_-4px_20px_rgba(27,58,92,0.08)]">
        <div className="container-mobile flex gap-3">
          <Link
            href="/compare"
            className="flex-1 h-12 bg-surface-low text-navy font-semibold rounded-[10px] btn-press hover:bg-surface-container transition-colors flex items-center justify-center"
          >
            Add to Compare
          </Link>
          <button className="flex-1 h-12 bg-navy hover:bg-navy-dark text-white font-semibold rounded-[10px] btn-press transition-colors shadow-sm">
            Get Free Counseling
          </button>
        </div>
      </div>
    </div>
  );
}
