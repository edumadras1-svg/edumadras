import { TopNavBar } from "@/components/TopNavBar";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Trophy,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Colleges Side-by-Side | EduMadras",
  description: "Compare top colleges in Tamil Nadu side-by-side on fees, placement packages, NIRF rankings, and infrastructure.",
};


const colleges = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    bannerUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
    rank: 1,
    rating: 4.9,
    fees: "₹8L/yr",
    avgPackage: "₹21.5 LPA",
    highestPackage: "₹1.2 Cr",
    totalStudents: "10,000",
    type: "Government",
    approvals: "AICTE, UGC, NAAC",
    established: "1959",
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    bannerUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
    rank: 2,
    rating: 4.8,
    fees: "₹9L/yr",
    avgPackage: "₹20 LPA",
    highestPackage: "₹1.1 Cr",
    totalStudents: "9,500",
    type: "Government",
    approvals: "AICTE, UGC, NAAC",
    established: "1961",
  },
];

const comparisonRows = [
  { label: "Rank", key: "rank", winIndex: 0, type: "lower-wins" },
  { label: "Rating", key: "rating", winIndex: 0, type: "higher-wins" },
  { label: "Annual Fees", key: "fees", winIndex: 0, type: "text" },
  { label: "Avg Package", key: "avgPackage", winIndex: 0, type: "text" },
  { label: "Highest Package", key: "highestPackage", winIndex: 0, type: "text" },
  { label: "Total Students", key: "totalStudents", winIndex: null, type: "text" },
  { label: "Type", key: "type", winIndex: null, type: "text" },
  { label: "Approvals", key: "approvals", winIndex: null, type: "text" },
  { label: "Location", key: "location", winIndex: null, type: "text" },
  { label: "Established", key: "established", winIndex: 0, type: "text" },
];

const courseComparison = [
  { course: "B.Tech CS", college1: "₹8L/yr", college2: "₹9L/yr", winIndex: 0 },
  { course: "M.Tech AI", college1: "₹4L/yr", college2: "₹4.5L/yr", winIndex: 0 },
  { course: "B.Tech EE", college1: "₹8L/yr", college2: "₹8.5L/yr", winIndex: 0 },
];

export default function ComparePage() {
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
            Compare Colleges in Tamil Nadu
          </h1>
          <p className="text-body-sm text-text-secondary mt-1.5">
            Which is Better? Compare fees, placements & rankings side-by-side
          </p>

          <button className="mt-3 p-2 hover:bg-surface-low rounded-lg transition-colors" aria-label="Share comparison">
            <Share2 className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* College Headers */}
      <div className="container-mobile -mt-1">
        <div className="flex gap-3">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.id}`}
              className="flex-1 bg-surface-card rounded-[14px] shadow-card overflow-hidden card-hover"
            >
              <div className="relative h-20 overflow-hidden">
                <img src={college.bannerUrl} alt={`${college.name} campus`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-3 -mt-5 relative">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-bold text-navy mb-2">
                  {college.name.split(" ").map(n => n[0]).join("").slice(0, 3)}
                </div>
                <h3 className="text-label font-semibold text-text-primary truncate">{college.name}</h3>
                <p className="text-caption text-text-secondary truncate">{college.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <main className="container-mobile pb-24 mt-6 space-y-6">
        {/* Comparison Table */}
        <section className="bg-surface-card rounded-[14px] shadow-card overflow-hidden">
          <div className="p-4 bg-surface-low">
            <h2 className="text-h3 text-text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Quick Comparison
            </h2>
          </div>

          <div>
            {comparisonRows.map((row, i) => {
              const val1 = colleges[0][row.key as keyof typeof colleges[0]];
              const val2 = colleges[1][row.key as keyof typeof colleges[1]];
              const isWinner1 = row.winIndex === 0;
              const isWinner2 = row.winIndex === 1;
              const isTie = row.winIndex === null;

              return (
                <div
                  key={row.label}
                  className={`flex items-center ${i % 2 === 0 ? "bg-white" : "bg-surface-low/50"}`}
                >
                  <div className="w-28 md:w-36 shrink-0 p-3 text-badge text-text-secondary">
                    {row.label}
                  </div>
                  <div className="flex-1 flex">
                    <div className={`flex-1 p-3 text-center text-label font-semibold ${
                      isWinner1 && !isTie ? "text-teal bg-teal/5" : "text-text-primary"
                    }`}>
                      <div className="flex items-center justify-center gap-1">
                        {isWinner1 && !isTie && <Trophy className="w-3 h-3 text-amber-500" />}
                        {String(val1)}
                      </div>
                    </div>
                    <div className={`flex-1 p-3 text-center text-label font-semibold ${
                      isWinner2 && !isTie ? "text-teal bg-teal/5" : "text-text-primary"
                    }`}>
                      <div className="flex items-center justify-center gap-1">
                        {isWinner2 && !isTie && <Trophy className="w-3 h-3 text-amber-500" />}
                        {String(val2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Course Comparison */}
        <section className="bg-surface-card rounded-[14px] shadow-card overflow-hidden">
          <div className="p-4 bg-surface-low">
            <h2 className="text-h3 text-text-primary">Course Comparison</h2>
          </div>

          <div>
            {/* Header Row */}
            <div className="flex items-center bg-surface-low/50">
              <div className="w-28 md:w-36 shrink-0 p-3 text-badge text-text-secondary">Course</div>
              <div className="flex-1 flex">
                <div className="flex-1 p-3 text-center text-badge text-text-secondary">{colleges[0].name}</div>
                <div className="flex-1 p-3 text-center text-badge text-text-secondary">{colleges[1].name}</div>
              </div>
            </div>

            {courseComparison.map((row, i) => (
              <div key={row.course} className={`flex items-center ${i % 2 === 0 ? "bg-white" : "bg-surface-low/50"}`}>
                <div className="w-28 md:w-36 shrink-0 p-3 text-label font-medium text-text-primary">{row.course}</div>
                <div className="flex-1 flex">
                  <div className={`flex-1 p-3 text-center text-label font-semibold ${
                    row.winIndex === 0 ? "text-teal" : "text-text-primary"
                  }`}>
                    {row.college1}
                  </div>
                  <div className={`flex-1 p-3 text-center text-label font-semibold ${
                    row.winIndex === 1 ? "text-teal" : "text-text-primary"
                  }`}>
                    {row.college2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Verdict */}
        <section className="bg-surface-card rounded-[14px] shadow-card p-5">
          <h2 className="text-h3 text-text-primary mb-3">
            Which is Better for Computer Science?
          </h2>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            Both IIT Madras and IIT Delhi are world-class institutions offering exceptional Computer Science programs. 
            IIT Madras edges slightly ahead with a higher NIRF ranking (#1 vs #2), better average placement packages 
            (₹21.5 LPA vs ₹20 LPA), and lower annual fees. However, IIT Delhi offers exceptional networking opportunities 
            being in the capital and has a stronger alumni network in management and entrepreneurship. For purely 
            technical roles and research, IIT Madras is the preferred choice.
          </p>
        </section>

        {/* CTA Banner */}
        <section className="gradient-navy rounded-[14px] p-6 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal/15 rounded-full -mr-10 -mt-10 blur-3xl" />
          <h2 className="text-h3 text-white relative z-10">Need Help Choosing?</h2>
          <p className="text-body-sm text-white/60 mt-2 relative z-10">
            Get free personalized counseling to choose between these colleges
          </p>
          <button className="mt-5 h-12 px-8 bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl transition-colors btn-press relative z-10 shadow-lg">
            Get Free Counseling
          </button>
        </section>
      </main>
    </div>
  );
}
