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
  Home as HomeIcon, HelpCircle
} from "lucide-react";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { JsonLd } from "@/components/JsonLd";

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const AVIT_COURSES = [
  { name: "B.E CSE", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E CSE (Cyber Security)", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E CSE (AI & ML)", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E CSE (Data Science)", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E ECE", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E EEE", duration: "4 Years", fee: "₹80K/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E Mechanical", duration: "4 Years", fee: "₹80K/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E Civil", duration: "4 Years", fee: "₹80K/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E Bio-Medical", duration: "4 Years", fee: "₹80K/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.Tech Bio-Technology", duration: "4 Years", fee: "₹1.1L/yr", eligibility: "SMART Test / 10+2 Merit" },
  { name: "B.E CSE (HCL Industry Integrated)", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "HCL Industry Integrated" },
  { name: "B.E CSE AI&ML (HCL)", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "HCL Industry Integrated" },
  { name: "B.E CSE (INTEL-NEC)", duration: "4 Years", fee: "₹2.3L/yr", eligibility: "Assured Internship & Placements" },
  { name: "B.E CSE AI&ML (INTEL-NEC)", duration: "4 Years", fee: "₹2.3L/yr", eligibility: "Assured Internship & Placements" },
  { name: "B.E Mechanical (MEDINI)", duration: "4 Years", fee: "₹1.3L/yr", eligibility: "MEDINI Industry Integrated" },
  { name: "B.E ECE (AMTZ)", duration: "4 Years", fee: "₹1.3L/yr", eligibility: "AMTZ Industry Integrated" },
  { name: "MBA", duration: "2 Years", fee: "₹63K/yr", eligibility: "Graduate in any discipline" },
  { name: "ME / M.Tech", duration: "2 Years", fee: "₹43K/yr", eligibility: "B.E / B.Tech Graduate" },
];

const FAQ_ITEMS = [
  { question: "What is the fee structure of AVIT Chennai for B.Tech CSE?", answer: "The B.Tech CSE fees at AVIT Chennai are approximately ₹1,80,000 per year. INTEL-NEC integrated CSE costs ₹2,30,000/yr with assured internship & placements. Total 4-year cost ranges from ₹3.2L to ₹9.2L depending on the programme." },
  { question: "What is the highest package at AVIT Chennai?", answer: "The highest placement package at AVIT Chennai is approximately ₹12 LPA. The average placement package across all departments is ₹3.5–5 LPA." },
  { question: "What is the NIRF ranking of AVIT Chennai?", answer: "AVIT Chennai is ranked in the NIRF 201–300 band for engineering institutions. The college holds a NAAC B+ accreditation grade." },
  { question: "What is the NAAC grade of AVIT Chennai?", answer: "AVIT Chennai holds a NAAC B+ grade as of the latest accreditation cycle." },
  { question: "Does AVIT Chennai have hostel facilities?", answer: "Yes. AVIT Chennai has separate hostel facilities for boys and girls on campus. Hostel fees are approximately ₹65,000–₹90,000 per year including food." },
  { question: "What is the average package for CSE students at AVIT Chennai?", answer: "The average placement package for CSE students at AVIT Chennai is approximately ₹4–5 LPA." },
  { question: "Where is AVIT Chennai located?", answer: "AVIT is located at Paiyanoor (Via Kelambakkam), Chennai — 603 104, on the East Coast Road (ECR), approximately 45 km from Chennai city centre." },
  { question: "What is Sigma at AVIT Chennai?", answer: "Sigma is the annual technical and cultural fest organized by AVIT Chennai, featuring hackathons, coding contests, workshops, and cultural performances." },
];

const TABS = ["Overview", "Fees & Courses", "Placements", "Hostel"];

export default function AVITChennaiPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const collegeSchema = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    name: "Aarupadai Veedu Institute of Technology", alternateName: "AVIT Chennai",
    url: "https://www.avit.ac.in",
    address: { "@type": "PostalAddress", streetAddress: "Paiyanoor, Via Kelambakkam", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "603104", addressCountry: "IN" },
    foundingDate: "1995",
    description: "AVIT Chennai (Aarupadai Veedu Institute of Technology) is a private engineering college affiliated to Anna University, offering B.Tech, M.Tech, and MBA programmes.",
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
            <span className="text-gray-900 font-semibold truncate">AVIT Chennai</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">

            <motion.div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100" initial="initial" animate="animate" variants={fadeInUp}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-center">
                  <img src="https://admin.avit.ac.in/uploads/AVIT_bluelogo_28bfac2511.png" alt="AVIT Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5" /> AICTE Approved</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">NAAC B+</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-3">AVIT Chennai — Fees, Placements & NIRF Ranking 2026</h1>
                  <p className="text-gray-600 text-sm mb-2">Aarupadai Veedu Institute of Technology · Managed by Vinayaka Missions Research Foundation</p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-400" /><span>Paiyanoor (ECR), Chennai — 603 104</span></div>
                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4"><Calendar className="w-4 h-4 text-blue-400" /><span>Est. 1995</span></div>
                  </div>
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
                <div className="bg-amber-50 rounded-2xl p-4 flex flex-col items-center text-center"><Award className="w-6 h-6 text-amber-500 mb-2" /><p className="text-xs text-gray-500 font-medium">NAAC Grade</p><p className="text-lg font-bold text-gray-900">B+</p></div>
                <div className="bg-emerald-50 rounded-2xl p-4 flex flex-col items-center text-center"><Star className="w-6 h-6 text-emerald-500 mb-2" /><p className="text-xs text-gray-500 font-medium">Affiliated To</p><p className="text-lg font-bold text-gray-900">VMRF</p></div>
                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center text-center"><TrendingUp className="w-6 h-6 text-blue-500 mb-2" /><p className="text-xs text-gray-500 font-medium">Highest Pkg</p><p className="text-lg font-bold text-gray-900">₹12 LPA</p></div>
                <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center text-center"><Users className="w-6 h-6 text-purple-500 mb-2" /><p className="text-xs text-gray-500 font-medium">Avg Package</p><p className="text-lg font-bold text-gray-900">₹5 LPA</p></div>
              </div>
            </motion.div>

            <div className="block lg:hidden"><InlineLeadForm collegeName="AVIT Chennai" collegeId="avit-chennai" /></div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-[52px] z-30">
              <div className="flex overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-teal-700 bg-teal-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="avitEnActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              {activeTab === "Overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Building2 className="w-6 h-6 text-teal-600" /> About AVIT Chennai</h2>
                  <p className="text-gray-600 leading-relaxed">AVIT Chennai — formally known as Aarupadai Veedu Institute of Technology — is a private engineering college located at Paiyanoor, Chennai, near Mahabalipuram on the ECR (East Coast Road). Affiliated to Anna University and approved by AICTE, AVIT offers B.Tech, M.Tech, MBA, and research programmes with a strong focus on industry-integrated education.</p>
                  <p className="text-gray-600 leading-relaxed">The college partners with leading companies like HCL, Intel-NEC, AMTZ, and MEDINI for industry-integrated programmes, offering students assured internships and enhanced placement opportunities.</p>
                  <div className="mt-6 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[["Full Name", "Aarupadai Veedu Institute of Technology"], ["Location", "Paiyanoor (ECR), Chennai"], ["Managed By", "Vinayaka Missions Research Foundation"], ["Affiliation", "Anna University"], ["Campus", "100+ acres"], ["NAAC Grade", "B+"]].map(([l, v], i) => (
                        <div key={i}><span className="text-gray-400 font-medium text-xs uppercase">{l}</span><p className="font-semibold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Fees & Courses" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-6 h-6 text-teal-600" /> AVIT Chennai Fee Structure 2026</h2>
                  <div className="grid gap-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
                    {AVIT_COURSES.map((course, i) => (
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
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-teal-600" /> AVIT Chennai Placements & Highest Package 2025</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 text-center">
                      <p className="text-3xl font-black text-teal-700">₹12 LPA</p><p className="text-sm font-medium text-teal-800 mt-1">Highest Package</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center">
                      <p className="text-3xl font-black text-blue-700">₹3.5–5 LPA</p><p className="text-sm font-medium text-blue-800 mt-1">Average Package</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {["TCS", "Infosys", "Wipro", "Cognizant", "Amazon", "HCL", "Hexaware", "MPhasis", "NTT Data", "Zoho", "L&T", "Capgemini"].map(c => (
                        <span key={c} className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-700 border border-amber-200 shadow-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Hostel" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><HomeIcon className="w-6 h-6 text-teal-600" /> AVIT Chennai Hostel Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[["Hostel Type", "Separate Boys & Girls Hostels"], ["Room Sharing", "2–4 students per room"], ["Hostel Fees", "₹65,000–₹90,000/yr (incl. food)"], ["Facilities", "Wi-Fi, mess, reading room, CCTV, 24/7 warden"], ["Location", "Within AVIT campus at Paiyanoor"], ["Campus Area", "100+ acres on ECR"]].map(([l, v], i) => (
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

            <InlineCTABanner headline="Need help with AVIT Chennai admission?" subtext="Talk to our expert counselors for free guidance on fees, placements, and seat availability." />
          </div>

          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-24" id="lead-form">
              <InlineLeadForm collegeName="AVIT Chennai" collegeId="avit-chennai" />
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-amber-900">VMRF-SMART Scholarship</h3>
                <p className="text-sm text-amber-700 mt-2 font-medium">Merit-based tuition fee concession through VMRF-SMART Scholarship Test. Apply now!</p>
              </div>
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600"><Building2 className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-blue-900">Campus Location</h3>
                <p className="text-sm text-blue-700 mt-2 font-medium">Paiyanoor, ECR near Mahabalipuram. Nearest railway: Chengalpattu (~20 km) / Tambaram (~25 km).</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
