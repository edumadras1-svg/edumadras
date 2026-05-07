import type { Metadata } from "next";
import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { JsonLd } from "@/components/JsonLd";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { CollegeCard } from "@/components/CollegeCard";
import {
  GraduationCap,
  MapPin,
  ChevronRight,
  Users,
  BookOpen,
  Trophy,
  Building2,
  Stethoscope,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Phone,
  Star,
  TrendingUp,
  Landmark,
} from "lucide-react";

const PAGE_URL = "https://edumadras.com/kallakurichi";

export const metadata: Metadata = {
  title: "Colleges in Kallakurichi 2026 — Engineering, Medical, Arts & Science | EduMadras",
  description:
    "Complete guide to all colleges in Kallakurichi district 2026. Find engineering, medical, arts & science colleges with fees, courses, placements. Visit EduMadras Kallakurichi office for free admission counseling.",
  keywords:
    "colleges in kallakurichi, kallakurichi colleges list, engineering colleges in kallakurichi, medical college kallakurichi, arts and science colleges kallakurichi, best colleges in kallakurichi district, EduMadras Kallakurichi office, education consultants in kallakurichi, free college counseling kallakurichi, admission guidance kallakurichi",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Colleges in Kallakurichi 2026 — Engineering, Medical, Arts & Science | EduMadras",
    description: "Complete guide to all colleges in Kallakurichi district 2026.",
    url: PAGE_URL,
    siteName: "EduMadras",
    type: "website",
    locale: "en_IN",
  },
};

// --- Local Kallakurichi college data (not in Supabase yet) ---
const kallakurichiColleges = [
  {
    name: "Government Medical College, Kallakurichi",
    type: "Government",
    stream: "Medical",
    courses: ["MBBS"],
    established: 2019,
    approvals: ["NMC", "Govt. of TN"],
    description: "Established under the Tamil Nadu government's initiative to expand medical education access in rural districts. Offers MBBS seats through NEET counselling.",
  },
  {
    name: "AKT Memorial College of Engineering & Technology",
    type: "Private",
    stream: "Engineering",
    courses: ["B.E. CSE", "B.E. ECE", "B.E. Mechanical", "B.E. Civil", "B.Tech IT"],
    established: 2001,
    approvals: ["AICTE", "Anna University"],
    description: "One of the oldest engineering colleges in Kallakurichi, affiliated to Anna University. Known for strong placement records in IT and manufacturing sectors.",
  },
  {
    name: "Government Arts College, Kallakurichi",
    type: "Government",
    stream: "Arts & Science",
    courses: ["B.A. Tamil", "B.A. History", "B.A. Economics", "B.Sc. Mathematics", "B.Sc. Computer Science", "B.Com"],
    established: 1986,
    approvals: ["UGC", "Thiruvalluvar University"],
    description: "A well-established government institution offering affordable undergraduate education with strong faculty in humanities and sciences.",
  },
  {
    name: "Arignar Anna Government Arts College, Villupuram (nearest)",
    type: "Government",
    stream: "Arts & Science",
    courses: ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc."],
    established: 1971,
    approvals: ["UGC", "NAAC B++"],
    description: "Located in the neighboring Villupuram district, this NAAC-accredited college is a popular choice for Kallakurichi students seeking quality government education.",
  },
  {
    name: "Dhanalakshmi Srinivasan College of Engineering",
    type: "Private",
    stream: "Engineering",
    courses: ["B.E. CSE", "B.E. ECE", "B.E. EEE", "B.E. Mechanical", "B.Tech AI & DS"],
    established: 2001,
    approvals: ["AICTE", "NAAC", "Anna University"],
    description: "Part of the Dhanalakshmi Srinivasan Group, located near Perambalur. Popular among Kallakurichi students for its strong campus placements and AI/Data Science programs.",
  },
  {
    name: "Government Polytechnic College, Kallakurichi",
    type: "Government",
    stream: "Polytechnic",
    courses: ["Diploma in Civil", "Diploma in Mechanical", "Diploma in ECE", "Diploma in EEE"],
    established: 2012,
    approvals: ["AICTE", "DOTE"],
    description: "Offers diploma-level technical education at affordable fees. Students can pursue lateral entry to engineering after diploma completion.",
  },
];

const districtFacts = [
  { icon: Landmark, label: "District Formed", value: "2019" },
  { icon: MapPin, label: "Location", value: "South TN" },
  { icon: Users, label: "Population", value: "30L+" },
  { icon: GraduationCap, label: "Local Colleges", value: "10+" },
];

const faqItems = [
  {
    question: "How many colleges are there in Kallakurichi district?",
    answer: "Kallakurichi district has approximately 10+ colleges including 1 government medical college, 2 engineering colleges, several arts & science colleges, and polytechnic institutions. As a newly formed district (2019), the educational infrastructure is still developing rapidly.",
  },
  {
    question: "Which is the best engineering college in Kallakurichi?",
    answer: "AKT Memorial College of Engineering & Technology is the most established engineering college in Kallakurichi, affiliated to Anna University. For students seeking higher-ranked options, colleges in Chennai (about 250 km away) like SRM, VIT, and Anna University offer significantly better placement opportunities.",
  },
  {
    question: "Is there a medical college in Kallakurichi?",
    answer: "Yes, the Government Medical College, Kallakurichi was established in 2019. It offers MBBS seats through NEET counselling under the Tamil Nadu government quota. Admission is highly competitive with limited seats.",
  },
  {
    question: "What are the admission processes for Kallakurichi colleges?",
    answer: "For engineering colleges: Apply through TNEA counselling after qualifying in +2 exams. For medical: NEET score is mandatory. For arts & science: Direct admission based on +2 marks through the respective university portal. For polytechnics: Apply through DOTE counselling.",
  },
  {
    question: "Should Kallakurichi students consider colleges in Chennai?",
    answer: "Absolutely. While local colleges are improving, Chennai offers 100+ engineering colleges, better industry exposure, multinational company placements, and starting salaries that are 2-3x higher. Many Chennai colleges also offer hostel facilities and scholarship programs for rural students.",
  },
  {
    question: "What is the average fee for colleges in Kallakurichi?",
    answer: "Government colleges charge ₹5,000–₹15,000 per year. Government medical college fees are approximately ₹13,000–₹50,000 per year. Private engineering colleges charge ₹40,000–₹1,00,000 per year. Arts & science colleges are the most affordable at ₹3,000–₹25,000 per year.",
  },
];

const nearbyHubs = [
  { name: "Chennai", distance: "250 km", colleges: "100+ Engineering, Medical", href: "/engineering-colleges/chennai" },
  { name: "Villupuram", distance: "60 km", colleges: "15+ Colleges", href: "/colleges" },
  { name: "Salem", distance: "120 km", colleges: "20+ Colleges", href: "/colleges" },
  { name: "Pondicherry", distance: "100 km", colleges: "30+ Colleges", href: "/colleges" },
];

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

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Colleges in Kallakurichi 2026",
  description: "Complete guide to all colleges in Kallakurichi district 2026.",
  url: PAGE_URL,
  isPartOf: { "@type": "WebSite", name: "EduMadras", url: "https://edumadras.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default async function KallakurichiCollegesPage() {
  // Fetch top recommended colleges from Supabase for the "Premium Alternatives" section
  const premiumColleges = await fetchCollegesByFilter({ limit: 6 });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <JsonLd schema={pageSchema} />
      <JsonLd schema={faqSchema} />
      <TopNavBar />

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002444] via-[#1B3A5C] to-[#1a7a6e] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90 font-medium">Colleges in Kallakurichi</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-4xl">
            Colleges in Kallakurichi 2026 — Complete District Guide
          </h1>
          <p className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl leading-relaxed font-medium">
            Find every engineering, medical, arts & science, and polytechnic college in Kallakurichi district.
            Compare fees, courses, placements, and discover premium alternatives nearby.
          </p>

          {/* District Quick Facts */}
          <div className="flex flex-wrap gap-4 mt-10">
            {districtFacts.map((fact, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
                <fact.icon className="w-5 h-5 text-teal-light" />
                <div>
                  <p className="text-xl font-bold">{fact.value}</p>
                  <p className="text-[11px] text-white/50 uppercase tracking-wider font-bold">{fact.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* ---- About Kallakurichi Section ---- */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">
            About Kallakurichi — Education Overview
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              <strong>Kallakurichi</strong> is one of Tamil Nadu's newest districts, carved out of Villupuram district
              in 2019. Located in the southern part of Tamil Nadu, it is home to a growing number of educational institutions
              catering to the district's 30 lakh+ population. The district headquarters, Kallakurichi town, serves as
              the primary educational hub.
            </p>
            <p>
              While the district is still developing its educational infrastructure, it already hosts a government medical
              college, multiple engineering colleges, several arts & science institutions, and polytechnic colleges.
              For students seeking tier-1 institutions, nearby cities like <strong>Chennai (250 km)</strong>,
              <strong> Pondicherry (100 km)</strong>, and <strong>Salem (120 km)</strong> offer excellent options
              with better placement records and industry connections.
            </p>
            <p>
              The Tamil Nadu government has been actively investing in educational development in Kallakurichi, with
              new colleges and skill development centers being established under various state schemes. The TNEA counselling
              process provides students from Kallakurichi fair access to 500+ engineering colleges across Tamil Nadu.
            </p>
          </div>
        </section>

        {/* ---- EduMadras Kallakurichi Office (Local SEO) ---- */}
        <section className="mb-16 bg-white rounded-3xl border border-teal/20 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <MapPin className="w-3.5 h-3.5" /> Local Presence
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-4">
                Visit the EduMadras Office in Kallakurichi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Are you confused about which college to choose? EduMadras is now locally available in Kallakurichi! Our expert <strong>education consultants in Kallakurichi</strong> provide 100% free, unbiased admission guidance. Whether you are looking for local institutions or premium colleges in Chennai, we help you make the best choice based on your cut-off, budget, and career goals.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free one-on-one career counseling",
                  "Guidance for TNEA, NEET, and Arts & Science admissions",
                  "Direct interaction with premium college representatives",
                  "Assistance with scholarship and education loan applications"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-[#1E293B] mb-4">Kallakurichi Office Details</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal shrink-0" />
                  <p><strong>EduMadras Kallakurichi</strong><br />No.88/17D,<br />MRN Nagar, Kallakurichi, Tamil Nadu 606202</p>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-teal shrink-0" />
                  <p><strong>Email:</strong> [EMAIL_ADDRESS]</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal shrink-0" />
                  <p><strong>Phone:</strong> +91 88257 21496</p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ---- Local Colleges Grid ---- */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
                All Colleges in Kallakurichi District
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Local and nearby institutions serving the district</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {kallakurichiColleges.map((college, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-teal/20 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center shrink-0">
                    {college.stream === "Medical" && <Stethoscope className="w-5 h-5 text-red-500" />}
                    {college.stream === "Engineering" && <GraduationCap className="w-5 h-5 text-blue-600" />}
                    {college.stream === "Arts & Science" && <BookOpen className="w-5 h-5 text-purple-600" />}
                    {college.stream === "Polytechnic" && <Briefcase className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${college.type === "Government"
                        ? "bg-green-50 text-green-600"
                        : "bg-purple-50 text-purple-600"
                        }`}>
                        {college.type}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wider">
                        {college.stream}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B] leading-tight group-hover:text-teal transition-colors">
                      {college.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {college.description}
                </p>

                {/* Courses */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Courses Offered</p>
                  <div className="flex flex-wrap gap-1.5">
                    {college.courses.map((course, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 pt-3 border-t border-gray-50">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    {college.approvals.join(", ")}
                  </span>
                  <span>Est. {college.established}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- CTA Banner ---- */}
        <InlineCTABanner />

        {/* ---- Nearby Education Hubs ---- */}
        <section className="my-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-2">
            Nearby Education Hubs for Kallakurichi Students
          </h2>
          <p className="text-gray-500 mb-8 max-w-2xl">
            Students from Kallakurichi often explore colleges in these nearby cities for better placements and industry exposure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyHubs.map((hub, i) => (
              <Link
                key={i}
                href={hub.href}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-teal/20 transition-all group block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-teal transition-colors">{hub.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-1">{hub.distance} from Kallakurichi</p>
                <p className="text-xs font-bold text-teal">{hub.colleges}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-navy group-hover:text-teal transition-colors">
                  Explore Colleges <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---- Premium Alternatives (from Supabase) ---- */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
              Top Recommended Colleges for Kallakurichi Students
            </h2>
          </div>
          <p className="text-gray-500 mb-8 max-w-2xl ml-[52px]">
            Higher-ranked institutions with proven placement records that actively recruit students from all Tamil Nadu districts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {premiumColleges?.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={`${college.city || ""}, ${college.state || ""}`.replace(/^, |, $/g, "")}
                rating={college.rating || 0}
                fees={""}
                package={college.avg_package ? formatPackage(college.avg_package) : "N/A"}
                rank={college.rank || undefined}
                stream={college.stream || "Engineering"}
                approvals={college.approvals || []}
                bannerUrl={college.banner_url || undefined}
                logoUrl={college.logo_url || undefined}
                totalStudents={formatStudents(college.total_students)}
                isRecommended={true}
              />
            ))}
          </div>
        </section>

        {/* ---- Admission Process Section ---- */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">
            How to Get Admission in Kallakurichi Colleges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Engineering (B.E./B.Tech)",
                icon: GraduationCap,
                color: "bg-blue-50 text-blue-600",
                steps: [
                  "Pass +2 with Physics, Chemistry, Maths",
                  "Register for TNEA counselling at tneaonline.org",
                  "Fill college preferences during choice filling",
                  "Attend counselling rounds for seat allotment",
                ],
              },
              {
                title: "Medical (MBBS)",
                icon: Stethoscope,
                color: "bg-red-50 text-red-600",
                steps: [
                  "Qualify NEET with minimum cutoff score",
                  "Register on MCC portal for AIQ / State quota",
                  "Tamil Nadu students apply through TN Medical Selection Committee",
                  "Attend counselling rounds at DMS, Chennai",
                ],
              },
              {
                title: "Arts & Science (B.A./B.Sc./B.Com)",
                icon: BookOpen,
                color: "bg-purple-50 text-purple-600",
                steps: [
                  "Complete +2 in relevant stream",
                  "Apply directly to college or through university portal",
                  "Merit-based selection from +2 marks",
                  "Complete document verification and pay fees",
                ],
              },
              {
                title: "Polytechnic (Diploma)",
                icon: Briefcase,
                color: "bg-orange-50 text-orange-600",
                steps: [
                  "Pass 10th (SSLC) examination",
                  "Apply through DOTE online counselling portal",
                  "Fill preferences and attend counselling",
                  "Can pursue lateral entry to B.E. after diploma",
                ],
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                </div>
                <ol className="space-y-3">
                  {item.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="w-6 h-6 bg-navy/5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-navy mt-0.5">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ---- FAQs ---- */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about colleges in Kallakurichi.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ---- Internal Links ---- */}
        <section className="border-t border-gray-100 pt-10 mb-10">
          <h3 className="text-xl font-extrabold text-[#1E293B] mb-6">Explore More Colleges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Top Engineering Colleges in Chennai", href: "/top-engineering-colleges-in-chennai" },
              { label: "Government Medical Colleges in Chennai", href: "/government-medical-colleges-chennai" },
              { label: "Arts & Science Colleges in Chennai", href: "/arts-science-colleges/chennai" },
              { label: "Best Engineering Colleges in Tamil Nadu", href: "/top-engineering-colleges-tamilnadu" },
              { label: "Engineering Colleges — Low Fees", href: "/engineering-colleges-chennai-low-fees" },
              { label: "Engineering Colleges Without JEE", href: "/engineering-colleges-chennai-without-jee" },
              { label: "NIRF Ranking 2025 Engineering", href: "/nirf-ranking-2025-engineering-colleges" },
              { label: "MBA Colleges in Tamil Nadu", href: "/mba-colleges/tamilnadu" },
              { label: "Top 10 Engineering Colleges Chennai", href: "/top-10-engineering-colleges-chennai" },
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

        <InlineCTABanner />
      </main>
    </div>
  );
}
