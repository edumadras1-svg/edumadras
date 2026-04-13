import { TopNavBar } from "@/components/TopNavBar";
import { CollegeCard } from "@/components/CollegeCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Scale,
  Palette,
  ArrowRight,
  ShieldCheck,
  Users,
  BookOpen,
  Trophy,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Find the Best Colleges in Tamil Nadu 2026 | EduMadras",
  description: "Discover top engineering, medical, arts and science colleges in Tamil Nadu. Compare fees, placements, and cutoffs.",
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EduMadras",
  "description": "College discovery platform for Tamil Nadu",
  "url": "https://edumadras.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pondicherry",
    "addressCountry": "IN"
  },
  "areaServed": [
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "City", "name": "Pondicherry" }
  ]
};

const streams = [
  { name: "Engineering", slug: "engineering", icon: GraduationCap, color: "bg-stream-engineering text-stream-engineering-text" },
  { name: "Medical", slug: "medical", icon: Stethoscope, color: "bg-stream-medical text-stream-medical-text" },
  { name: "Management", slug: "management", icon: Briefcase, color: "bg-stream-management text-stream-management-text" },
  { name: "Law", slug: "law", icon: Scale, color: "bg-stream-law text-stream-law-text" },
  { name: "Design", slug: "design", icon: Palette, color: "bg-stream-design text-stream-design-text" },
];

const engineeringColleges = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    fees: "₹8L/yr",
    package: "₹21.5 LPA",
    rank: 1,
    stream: "Engineering",
    approvals: ["AICTE", "UGC"],
    bannerUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    totalStudents: "10K+",
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    rating: 4.8,
    fees: "₹8.5L/yr",
    package: "₹20 LPA",
    rank: 2,
    stream: "Engineering",
    approvals: ["AICTE", "UGC"],
    bannerUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    totalStudents: "9.5K+",
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    fees: "₹9L/yr",
    package: "₹23 LPA",
    rank: 3,
    stream: "Engineering",
    approvals: ["AICTE", "UGC"],
    bannerUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&q=80",
    totalStudents: "10.5K+",
  },
];

const medicalColleges = [
  {
    id: "10000000-0000-0000-0000-000000000007",
    name: "AIIMS Delhi",
    location: "New Delhi, Delhi",
    rating: 5.0,
    fees: "₹6K/yr",
    package: "₹25 LPA",
    rank: 1,
    stream: "Medical",
    approvals: ["MCI"],
    bannerUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
    totalStudents: "2K+",
  },
  {
    id: "10000000-0000-0000-0000-000000000008",
    name: "CMC Vellore",
    location: "Vellore, Tamil Nadu",
    rating: 4.8,
    fees: "₹1.5L/yr",
    package: "₹15 LPA",
    rank: 3,
    stream: "Medical",
    approvals: ["MCI"],
    bannerUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    totalStudents: "1.5K+",
  },
];

const counselors = [
  { name: "Dr. Priya Sharma", role: "Senior Counselor — Engineering", isActive: true, exp: "12+ years" },
  { name: "Rajesh Kumar", role: "Lead Counselor — Medical", isActive: true, exp: "8+ years" },
];

const trustFeatures = [
  { icon: ShieldCheck, title: "Verified Data", desc: "All information verified from official college sources" },
  { icon: Users, title: "Free Expert Counseling", desc: "Talk to experienced admission counselors at no cost" },
  { icon: BookOpen, title: "500+ Colleges", desc: "Comprehensive database across Engineering, Medical & more" },
  { icon: Trophy, title: "Trusted by 10,000+", desc: "Students and parents trust EduMadras for college decisions" },
];

const faqItems = [
  { question: "What is EduMadras?", answer: "EduMadras is India's premier college discovery platform helping students find, compare, and apply to the best colleges across Engineering, Medical, Management, Law, and Design streams." },
  { question: "How does free counseling work?", answer: "Our expert counselors provide personalized guidance over phone or video call. Simply fill the form, and a counselor will contact you within 2 hours to discuss your college options." },
  { question: "Which entrance exams can I use to search colleges?", answer: "You can search by JEE Advanced, JEE Mains, NEET, CAT, CLAT, BITSAT, GMAT, NID DAT, and NIFT entrance exams." },
  { question: "How is fee information verified?", answer: "Our team verifies fee data directly from official college websites and admission offices. Each page shows a 'Last verified' timestamp." },
  { question: "Can I compare colleges on EduMadras?", answer: "Yes! Add up to 3 colleges to compare side-by-side on fees, placements, rankings, and more using our Compare tool." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={homeSchema} />
      <TopNavBar />

      {/* ==================== HERO SECTION ==================== */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/10 rounded-full -ml-32 -mb-32 blur-3xl" />

        <div className="container-mobile relative z-10 pt-12 pb-14 md:pt-20 md:pb-24 text-center">
          <h1 className="text-hero text-white max-w-md mx-auto md:text-5xl">
            Find the Best Colleges in Tamil Nadu 2026
          </h1>
          <p className="mt-4 text-white/70 text-body-sm max-w-sm mx-auto md:text-base">
            Compare 500+ colleges · Free expert counseling · Apply online
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-xl h-14 pl-4 pr-2 shadow-modal">
              <Search className="w-5 h-5 text-text-tertiary mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search colleges, courses, cities..."
                className="flex-1 h-full bg-transparent outline-none text-body-sm text-text-primary placeholder:text-text-tertiary"
                aria-label="Search colleges"
              />
              <button className="h-10 px-5 bg-navy hover:bg-navy-dark text-white text-sm font-semibold rounded-lg transition-colors btn-press shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Trust Stats */}
          <div className="mt-8 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { label: "500+ Colleges", icon: BookOpen },
              { label: "14+ Courses", icon: GraduationCap },
              { label: "Free Counseling", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-white/80">
                <stat.icon className="w-4 h-4" />
                <span className="text-caption font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Stream Quick Links */}
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {streams.map((stream) => (
              <Link
                key={stream.slug}
                href={`/colleges?stream=${stream.slug}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-white/30 text-white/90 rounded-full text-caption font-medium hover:bg-white/10 transition-colors"
              >
                <stream.icon className="w-3.5 h-3.5" />
                {stream.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROMOTIONAL BANNER ==================== */}
      <section className="container-mobile -mt-6 relative z-20">
        <div className="bg-gradient-to-r from-navy-dark to-navy rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-hover">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal/20 rounded-full -mr-10 -mt-10 blur-2xl" />
          <span className="text-badge text-teal-light tracking-widest">SCHOLARSHIP ALERT</span>
          <h2 className="text-h2 text-white mt-2">Upto 50% Scholarship for 2025</h2>
          <p className="text-body-sm text-white/60 mt-1">Limited seats available. Apply through EduMadras.</p>
          <button className="mt-5 h-10 px-6 bg-teal hover:bg-teal/90 text-white text-sm font-semibold rounded-lg transition-colors btn-press flex items-center gap-2">
            Check Eligibility <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ==================== TOP ENGINEERING COLLEGES ==================== */}
      <section className="section-gap bg-white mt-8">
        <div className="container-mobile">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stream-engineering rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-stream-engineering-text" />
              </div>
              <h2 className="text-h3 text-text-primary">Top Engineering Colleges</h2>
            </div>
            <Link href="/colleges?stream=engineering" className="text-label text-teal font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {engineeringColleges.map((college) => (
              <div key={college.id} className="min-w-[300px] md:min-w-[320px]">
                <CollegeCard {...college} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOP MEDICAL COLLEGES ==================== */}
      <section className="section-gap bg-surface">
        <div className="container-mobile">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stream-medical rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-stream-medical-text" />
              </div>
              <h2 className="text-h3 text-text-primary">Top Medical Colleges</h2>
            </div>
            <Link href="/colleges?stream=medical" className="text-label text-teal font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {medicalColleges.map((college) => (
              <div key={college.id} className="min-w-[300px] md:min-w-[320px]">
                <CollegeCard {...college} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY EDUMADRAS ==================== */}
      <section className="section-gap bg-white">
        <div className="container-mobile">
          <h2 className="text-h2 text-text-primary text-center">Why EduMadras?</h2>
          <p className="text-body-sm text-text-secondary text-center mt-2 max-w-md mx-auto">
            Trusted by thousands of students making life-defining college decisions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {trustFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface-low rounded-[14px] p-5 text-center hover:shadow-soft transition-shadow"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-card flex items-center justify-center mx-auto">
                  <feature.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-label font-semibold text-text-primary mt-3">{feature.title}</h3>
                <p className="text-caption text-text-secondary mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MEET OUR COUNSELORS ==================== */}
      <section className="section-gap bg-surface">
        <div className="container-mobile">
          <h2 className="text-h2 text-text-primary text-center">Meet Our Counselors</h2>
          <p className="text-body-sm text-text-secondary text-center mt-2 max-w-md mx-auto">
            Expert guidance from experienced admission professionals
          </p>

          <div className="space-y-3 mt-8 max-w-lg mx-auto">
            {counselors.map((c) => (
              <div
                key={c.name}
                className="bg-surface-card rounded-[14px] shadow-card p-4 flex items-center gap-4"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-13 h-13 bg-stream-engineering rounded-full flex items-center justify-center text-lg font-bold text-navy">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {c.isActive && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-body-sm font-semibold text-text-primary truncate">{c.name}</h3>
                  <p className="text-caption text-text-secondary truncate">{c.role}</p>
                  {c.isActive && (
                    <span className="text-badge text-green-600 mt-0.5 inline-block">Available Now</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button className="w-10 h-10 bg-teal/10 text-teal rounded-lg flex items-center justify-center hover:bg-teal/20 transition-colors btn-press" aria-label="Call">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors btn-press" aria-label="WhatsApp">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <Link
              href="/counselors"
              className="block text-center text-label text-teal font-semibold mt-4 hover:underline"
            >
              View All Counselors →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="section-gap bg-white">
        <div className="container-mobile max-w-2xl">
          <h2 className="text-h2 text-text-primary text-center">Frequently Asked Questions</h2>
          <p className="text-body-sm text-text-secondary text-center mt-2">Quick answers for students and parents</p>
          <div className="mt-8">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA BANNER ==================== */}
      <section className="bg-navy py-12">
        <div className="container-mobile text-center">
          <h2 className="text-h2 text-white">Ready to Find Your Dream College?</h2>
          <p className="text-body-sm text-white/60 mt-2">Get free personalized counseling from our experts</p>
          <button className="mt-6 h-12 px-8 bg-teal hover:bg-teal/90 text-white text-base font-semibold rounded-xl transition-colors btn-press shadow-lg">
            Get Free Counseling
          </button>
          <p className="text-caption text-white/40 mt-3">500+ students counseled · Free, no spam</p>
        </div>
      </section>
    </div>
  );
}
