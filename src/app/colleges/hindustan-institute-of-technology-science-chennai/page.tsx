"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Phone, Award, Star, Users, BookOpen,
  CheckCircle2, ChevronRight, TrendingUp, Building2, GraduationCap,
  Home as HomeIcon, HelpCircle, Plane
} from "lucide-react";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { JsonLd } from "@/components/JsonLd";

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const HITS_COURSES = [
  { name: "B.Tech Aeronautical Engineering", duration: "4 Years", fee: "₹4.0L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech Aerospace Engineering", duration: "4 Years", fee: "₹4.0L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech Computer Science Engineering", duration: "4 Years", fee: "₹2.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech AI & DS", duration: "4 Years", fee: "₹2.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech CSE (AI & ML) with IBM", duration: "4 Years", fee: "₹3.5L/yr", eligibility: "HITSEEE / JEE Main" },
  { name: "B.Tech CSE (Cyber Security) with IBM", duration: "4 Years", fee: "₹3.5L/yr", eligibility: "HITSEEE / JEE Main" },
  { name: "B.Tech CSE (Gen AI) with Google", duration: "4 Years", fee: "₹3.2L/yr", eligibility: "HITSEEE / JEE Main" },
  { name: "B.Tech CSE (Full Stack Development)", duration: "4 Years", fee: "₹3.6L/yr", eligibility: "HITSEEE / JEE Main" },
  { name: "B.Tech Auto-Electric Mobility", duration: "4 Years", fee: "₹3.1L/yr", eligibility: "HITSEEE / JEE Main" },
  { name: "B.Tech Mechanical Engineering", duration: "4 Years", fee: "₹1.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech Civil Engineering", duration: "4 Years", fee: "₹1.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech ECE", duration: "4 Years", fee: "₹1.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Tech EEE", duration: "4 Years", fee: "₹1.9L/yr", eligibility: "HITSEEE / JEE Main / 10+2" },
  { name: "B.Arch", duration: "5 Years", fee: "₹1.9L/yr", eligibility: "NATA / JEE Main Paper-2" },
  { name: "BBA", duration: "3 Years", fee: "₹1.4L/yr", eligibility: "10+2 Any Stream" },
  { name: "BBA Aviation Management", duration: "3 Years", fee: "₹1.7L/yr", eligibility: "10+2 Any Stream" },
  { name: "BCA", duration: "3 Years", fee: "₹1.1L/yr", eligibility: "10+2 Any Stream" },
  { name: "MBA Aviation Management", duration: "2 Years", fee: "₹3.7L/yr", eligibility: "Any UG + TANCET/CAT/MAT" },
  { name: "MBA Finance/Marketing/HR", duration: "2 Years", fee: "₹3.3L/yr", eligibility: "Any UG + TANCET/CAT/MAT" },
  { name: "BA LLB (Hons)", duration: "5 Years", fee: "₹2.3L/yr", eligibility: "10+2 Any Stream" },
  { name: "B.Sc Nursing", duration: "4 Years", fee: "₹2.3L/yr", eligibility: "10+2 (Science)" },
  { name: "M.Tech CSE", duration: "2 Years", fee: "₹1.1L/yr", eligibility: "B.E / B.Tech Graduate" },
  { name: "M.Tech Aeronautical", duration: "2 Years", fee: "₹1.1L/yr", eligibility: "B.E / B.Tech Graduate" },
];

const FAQ_ITEMS = [
  { question: "What is the fees structure of Hindustan Engineering College for B.Tech?", answer: "HITS B.Tech fees range from ₹1,90,000 to ₹4,00,000 per year. CSE is ₹2.9L/yr, Aeronautical & Aerospace Engineering are ₹4.0L/yr. CSE with IBM/Google partnerships cost ₹3.2L–3.6L/yr." },
  { question: "What is the TNEA code for Hindustan Engineering College Chennai?", answer: "The TNEA code for Hindustan Institute of Technology and Science (HITS) is 1119. As a Deemed University, most seats are under management quota." },
  { question: "What is the highest package at Hindustan University?", answer: "The highest placement package at HITS Chennai is approximately ₹12 LPA. The average package across departments is ₹4.5 LPA." },
  { question: "What is the NIRF ranking of Hindustan University?", answer: "HITS is ranked #107 in NIRF Engineering rankings. It holds a NAAC A+ grade." },
  { question: "What are the hostel fees at Hindustan University?", answer: "Hostel fees are approximately ₹1,00,000–₹1,30,000 per year for both boys and girls, including food. AC/Non-AC options available." },
  { question: "What is the MBA fees at Hindustan University?", answer: "MBA Aviation Management costs ₹3.7L/yr. MBA Finance/Marketing/HR costs ₹3.3L/yr. Executive MBA is ₹6.0L for 1 year." },
  { question: "What is the aeronautical engineering fees at Hindustan University?", answer: "Aeronautical Engineering fees at HITS are ₹4,00,000 per year (total ₹16L for 4 years). HITS is one of the few private colleges with dedicated aeronautical infrastructure." },
  { question: "What is the Hindustan University entrance exam?", answer: "HITS conducts HITSEEE (Hindustan Institute of Technology & Science Engineering Entrance Exam) — an online CBT covering Physics, Chemistry, Mathematics in 90 minutes. JEE Main scores are also accepted." },
  { question: "What is the dress code at Hindustan University?", answer: "Boys: Dark formal trousers, light formal shirts, formal shoes. Girls: Salwar kameez or formal trousers with formal top. ID cards must be worn visibly at all times." },
  { question: "Where is Hindustan University located?", answer: "Main campus: Padur, OMR (Old Mahabalipuram Road), Chennai — 603 103. Head office: Guindy, Chennai. The 165+ acre campus is on OMR near Kelambakkam." },
];

const TABS = ["Overview", "Fees & Courses", "Placements", "Hostel"];

export default function HindustanChennaiPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const collegeSchema = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    name: "Hindustan Institute of Technology and Science", alternateName: ["Hindustan University", "Hindustan Engineering College", "HITS Chennai"],
    url: "https://www.hindustanuniv.ac.in",
    address: { "@type": "PostalAddress", streetAddress: "Padur, OMR", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "603103", addressCountry: "IN" },
    foundingDate: "1985",
    description: "Hindustan Institute of Technology and Science (HITS) is a UGC-approved Deemed University in Chennai offering engineering, management, law, aviation, design, and science programmes.",
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-teal-100 selection:text-teal-900 pb-24">
      <TopNavBar />
      <JsonLd schema={collegeSchema} />
      <JsonLd schema={faqSchema} />

      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/engineering-colleges/chennai" className="hover:text-teal-600 transition-colors">Engineering Colleges Chennai</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-semibold truncate">Hindustan University (HITS)</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">

            <motion.div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100" initial="initial" animate="animate" variants={fadeInUp}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-center">
                  <img src="https://cdn.npfs.co/uploads/template/58/4367/publish/images/logo.png?1730800613" alt="Hindustan Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> UGC Approved Deemed University</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">NAAC A+</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-2">Hindustan University Chennai — Fees, Package & Ranking 2026</h1>
                  <p className="text-gray-600 text-sm mb-2">Hindustan Institute of Technology and Science (HITS) · Also known as Hindustan Engineering College</p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-400" /><span>Padur, OMR, Chennai — 603 103</span></div>
                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4"><Calendar className="w-4 h-4 text-blue-400" /><span>Est. 1985</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">TNEA Code: <strong className="text-gray-700">1119</strong> · Campus: 165+ acres on OMR</p>
                  <div className="mt-5 flex items-center">
                    <a href="tel:+919363699095" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 pr-6 rounded-full shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30 hover:-translate-y-0.5">
                      <div className="bg-white rounded-full p-2.5 shadow-inner flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
                        <Phone className="w-5 h-5 text-teal-600 fill-teal-600/20 relative z-10" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/90 leading-none">Admission Helpline</span>
                        <span className="text-lg font-black text-white leading-tight mt-0.5">+91 93636 99095</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="bg-amber-50 rounded-2xl p-4 flex flex-col items-center text-center"><Award className="w-6 h-6 text-amber-500 mb-2" /><p className="text-xs text-gray-500 font-medium">NIRF Rank</p><p className="text-lg font-bold text-gray-900">#107</p></div>
                <div className="bg-emerald-50 rounded-2xl p-4 flex flex-col items-center text-center"><Star className="w-6 h-6 text-emerald-500 mb-2" /><p className="text-xs text-gray-500 font-medium">NAAC Grade</p><p className="text-lg font-bold text-gray-900">A+</p></div>
                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center text-center"><TrendingUp className="w-6 h-6 text-blue-500 mb-2" /><p className="text-xs text-gray-500 font-medium">Highest Pkg</p><p className="text-lg font-bold text-gray-900">₹12 LPA</p></div>
                <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center text-center"><Users className="w-6 h-6 text-purple-500 mb-2" /><p className="text-xs text-gray-500 font-medium">Students</p><p className="text-lg font-bold text-gray-900">10,000+</p></div>
              </div>
            </motion.div>

            <div className="block lg:hidden"><InlineLeadForm collegeName="Hindustan University (HITS)" collegeId="hits-chennai" /></div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-[52px] z-30">
              <div className="flex overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-teal-700 bg-teal-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="hitsEnActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              {activeTab === "Overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Building2 className="w-6 h-6 text-teal-600" /> About Hindustan University (HITS)</h2>
                  <p className="text-gray-600 leading-relaxed">Hindustan Institute of Technology and Science (HITS) — commonly referred to as Hindustan University or Hindustan Engineering College — is a deemed university located at Padur, OMR, Chennai. Established in 1985, HITS is one of Tamil Nadu&apos;s well-known private deemed universities offering engineering, management, law, aviation, design, and science programmes.</p>
                  <p className="text-gray-600 leading-relaxed">HITS is particularly renowned for its Aeronautical and Aerospace Engineering programmes, with partnerships with Boeing India, Airbus, and Air India. The university holds NAAC A+ accreditation and is ranked #107 in NIRF Engineering rankings.</p>
                  <div className="mt-4 bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><Plane className="w-5 h-5 text-indigo-600" /> Flagship: Aeronautical & Aerospace Engineering</h3>
                    <p className="text-gray-600 text-sm">HITS is one of the few private colleges in South India with dedicated aeronautical infrastructure. Fees: ₹4.0L/yr. Recruiters include Boeing India, Airbus, Air India, and Honeywell.</p>
                  </div>
                  <div className="mt-6 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[["Full Name", "Hindustan Institute of Technology and Science"], ["TNEA Code", "1119"], ["University Type", "Deemed University (Private)"], ["NAAC Grade", "A+"], ["Entrance Exam", "HITSEEE / JEE Main"], ["Website", "www.hindustanuniv.ac.in"]].map(([l, v], i) => (
                        <div key={i}><span className="text-gray-400 font-medium text-xs uppercase">{l}</span><p className="font-semibold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Fees & Courses" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-6 h-6 text-teal-600" /> Hindustan University Fees Structure 2026</h2>
                  <div className="grid gap-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
                    {HITS_COURSES.map((course, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{course.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {course.duration}</span>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">{course.eligibility}</span>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-teal-700">{course.fee}</div>
                          <button onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-teal-600 font-bold hover:underline mt-1">Get Details →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "Placements" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-teal-600" /> Hindustan University Placements 2025</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 text-center">
                      <p className="text-3xl font-black text-teal-700">₹12 LPA</p><p className="text-sm font-medium text-teal-800 mt-1">Highest Package</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center">
                      <p className="text-3xl font-black text-blue-700">₹4.5 LPA</p><p className="text-sm font-medium text-blue-800 mt-1">Average Package</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "IBM", "HCL", "Amazon", "Zoho", "Boeing India", "Airbus", "Air India", "Honeywell", "Capgemini", "L&T"].map(c => (
                        <span key={c} className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-700 border border-amber-200 shadow-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Hostel" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><HomeIcon className="w-6 h-6 text-teal-600" /> Hindustan University Hostel Fees & Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[["Hostel Type", "Separate Boys & Girls Hostels"], ["Room Type", "2–3 sharing rooms (AC/Non-AC)"], ["Hostel Fees", "₹1,00,000–₹1,30,000/yr (incl. food)"], ["Facilities", "Wi-Fi, CCTV, gym, reading room, medical facility"], ["Food", "Veg & non-veg mess with hygienic kitchen"], ["Campus Size", "165+ acres on OMR"]].map(([l, v], i) => (
                      <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                        <span className="text-xs text-gray-400 font-bold uppercase">{l}</span>
                        <p className="font-semibold text-gray-800 mt-1">{v}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6"><HelpCircle className="w-6 h-6 text-teal-600" /> Frequently Asked Questions</h2>
              <FAQAccordion items={FAQ_ITEMS} />
            </div>

            <InlineCTABanner headline="Need help with Hindustan University admission?" subtext="Talk to our expert counselors for free guidance on HITSEEE, fees, and seat availability." />
          </div>

          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-24" id="lead-form">
              <InlineLeadForm collegeName="Hindustan University (HITS)" collegeId="hits-chennai" />
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-amber-900">HITSEEE Scholarship</h3>
                <p className="text-sm text-amber-700 mt-2 font-medium">Merit scholarships available based on HITSEEE scores. JEE Main scores also accepted for direct admission.</p>
              </div>
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600"><Building2 className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-blue-900">TNEA Code: 1119</h3>
                <p className="text-sm text-blue-700 mt-2 font-medium">Padur, OMR, near Kelambakkam. Regular college bus from Tambaram, Guindy, T. Nagar, Anna Nagar.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
