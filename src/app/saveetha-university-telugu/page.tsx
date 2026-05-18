"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Phone, Award, Star, Users, BookOpen,
  CheckCircle2, ChevronRight, TrendingUp, Building2, GraduationCap
} from "lucide-react";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { JsonLd } from "@/components/JsonLd";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const SAVEETHA_COURSES = [
  // Engineering
  { name: "B.E. Computer Science & Engineering", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. CSE (AI & Data Science)", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. Information Technology", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. ECE", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. EEE", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. Mechanical Engineering", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. Civil Engineering", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E. Biomedical Engineering", duration: "4 Years", fee: "₹1.5L/yr", eligibility: "TNEA / 10+2 Merit" },
  // Medical
  { name: "MBBS", duration: "5.5 Years", fee: "₹27.5L/yr", eligibility: "NEET UG" },
  { name: "BDS", duration: "5 Years", fee: "₹9.1L/yr", eligibility: "NEET UG" },
  { name: "B.Sc Nursing", duration: "4 Years", fee: "₹2.5L/yr", eligibility: "10+2 (Science)" },
  { name: "BPT (Physiotherapy)", duration: "4.5 Years", fee: "₹2.0L/yr", eligibility: "10+2 (Science)" },
  { name: "B.Pharm", duration: "4 Years", fee: "₹1.8L/yr", eligibility: "10+2 (PCM/PCB)" },
  // Management & Science
  { name: "MBA", duration: "2 Years", fee: "₹2.5L/yr", eligibility: "TANCET / CAT / MAT" },
  { name: "BBA", duration: "3 Years", fee: "₹1.2L/yr", eligibility: "10+2 Any Stream" },
  { name: "B.Com", duration: "3 Years", fee: "₹80K/yr", eligibility: "10+2 Commerce" },
  { name: "BCA", duration: "3 Years", fee: "₹1.0L/yr", eligibility: "10+2 Any Stream" },
  { name: "B.Sc (Various)", duration: "3 Years", fee: "₹80K/yr", eligibility: "10+2 Science" },
  // PG Engineering
  { name: "M.E. / M.Tech", duration: "2 Years", fee: "₹1.0L/yr", eligibility: "B.E / B.Tech Graduate" },
  { name: "MD / MS", duration: "3 Years", fee: "₹15L–40L/yr", eligibility: "NEET PG" },
  { name: "MDS", duration: "3 Years", fee: "₹9L–17.5L/yr", eligibility: "NEET MDS" },
  // Law
  { name: "BA LLB (Hons)", duration: "5 Years", fee: "₹1.5L/yr", eligibility: "10+2 Any Stream" },
  { name: "BBA LLB (Hons)", duration: "5 Years", fee: "₹1.5L/yr", eligibility: "10+2 Any Stream" },
  { name: "LLB", duration: "3 Years", fee: "₹1.5L/yr", eligibility: "Any UG Degree" },
  // Medical (Management Quota)
  { name: "Medical", duration: "N/A", fee: "₹20L", eligibility: "No eligibility specified" },
  // B.Tech Programs
  { name: "B.Tech AI & DS", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Artificial Intelligence and Machine Learning", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech Computer Science and Engineering", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Computer Science and BioSciences", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - CSE (Artificial Intelligence)", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - CSE (Data Science)", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech CSE (Cyber Security)", duration: "4 Years", fee: "₹4.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Electronics and Communication Engineering", duration: "4 Years", fee: "₹3.2L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Information Technology", duration: "4 Years", fee: "₹3.35L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Bioinformatics", duration: "4 Years", fee: "₹3.2L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Biotechnology", duration: "4 Years", fee: "₹3.2L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Biomedical Engineering", duration: "4 Years", fee: "₹3.2L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Dental Technology", duration: "4 Years", fee: "₹1.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Electrical and Electronics Engineering", duration: "4 Years", fee: "₹1.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Civil Engineering", duration: "4 Years", fee: "₹1.6L", eligibility: "50% in 10+2" },
  { name: "B.Tech - Mechanical Engineering", duration: "4 Years", fee: "₹1.6L", eligibility: "50% in 10+2" },
];

export default function SaveethaTeluguPage() {
  const [activeTab, setActiveTab] = useState("అవలోకనం");

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-teal-100 selection:text-teal-900 pb-24">
      <TopNavBar />

      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          "name": "Saveetha University (SIMATS)",
          "description": "సవీతా ఇన్స్టిట్యూట్ ఆఫ్ మెడికల్ అండ్ టెక్నికల్ సైన్సెస్ (SIMATS) చెన్నైలో ఉన్న ప్రముఖ డీమ్డ్ విశ్వవిద్యాలయం.",
          "url": "https://www.edumadras.com/saveetha-university-telugu"
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-teal-600 transition-colors">హోమ్ (Home)</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/colleges" className="hover:text-teal-600 transition-colors">కళాశాలలు (Colleges)</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-semibold truncate">సవీతా యూనివర్సిటీ (SIMATS)</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Hero Card */}
            <motion.div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100" initial="initial" animate="animate" variants={fadeInUp}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlQ4ctP_xNY_UfLEtPIukzd3DtXc9SC_bVBA&s" alt="Saveetha Logo" className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    UGC Approved Deemed University | NAAC A++
                  </div>

                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-3">
                    సవీతా ఇన్స్టిట్యూట్ ఆఫ్ మెడికల్ అండ్ టెక్నికల్ సైన్సెస్ (SIMATS)
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm md:text-base">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>చెన్నై, తమిళనాడు (Chennai)</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>స్థాపన: 1988</span>
                    </div>
                  </div>

                  {/* Phone CTA */}
                  <div className="mt-6 flex items-center">
                    <a href="tel:+917339329264" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 pr-6 rounded-full shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30 hover:-translate-y-0.5">
                      <div className="bg-white rounded-full p-2.5 shadow-inner flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
                        <Phone className="w-5 h-5 text-teal-600 fill-teal-600/20 relative z-10" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/90 leading-none">తెలుగులో అడ్మిషన్ సహాయం (Telugu Helpline)</span>
                        <span className="text-lg font-black text-white leading-tight mt-0.5">+91 7339329264</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="bg-amber-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Award className="w-6 h-6 text-amber-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">NAAC Grade</p>
                  <p className="text-lg font-bold text-gray-900">A++</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Star className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Placement Rate</p>
                  <p className="text-lg font-bold text-gray-900">97%</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Highest Package</p>
                  <p className="text-lg font-bold text-gray-900">44 LPA</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Users className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Avg Package</p>
                  <p className="text-lg font-bold text-gray-900">5.36 LPA</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile Lead Form */}
            <div className="block lg:hidden mt-6">
              <InlineLeadForm collegeName="Saveetha University (Telugu Landing)" collegeId="saveetha-telugu" />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-[60px] z-30">
              <div className="flex overflow-x-auto scrollbar-hide">
                {["అవలోకనం", "కోర్సులు", "ప్లేస్‌మెంట్స్", "హాస్టల్"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-teal-700 bg-teal-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="saveethaActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              {activeTab === "అవలోకనం" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-teal-600" /> కళాశాల గురించి (About)
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    సవీతా ఇన్స్టిట్యూట్ ఆఫ్ మెడికల్ అండ్ టెక్నికల్ సైన్సెస్ (SIMATS) చెన్నైలో ఉన్న అగ్రశ్రేణి డీమ్డ్ విశ్వవిద్యాలయం. 1988లో స్థాపించబడిన ఈ సంస్థ మెడికల్, డెంటల్, ఇంజనీరింగ్, మేనేజ్‌మెంట్, లా మరియు సైన్స్ రంగాలలో అత్యుత్తమ విద్యను అందిస్తోంది.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    NAAC ద్వారా A++ గ్రేడ్‌తో గుర్తింపు పొందిన సవీతా యూనివర్సిటీ, NIRF ర్యాంకింగ్స్‌లో నిరంతరం టాప్ స్థానాలలో నిలుస్తోంది. Google, Meta, Amazon, TCS వంటి అగ్రశ్రేణి కంపెనీలు క్యాంపస్ ప్లేస్‌మెంట్స్‌లో పాల్గొంటాయి.
                  </p>

                  <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">ఎందుకు సవీతా యూనివర్సిటీని ఎంచుకోవాలి? (Why Choose Saveetha?)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">NAAC A++ గ్రేడ్ — దేశంలోని అగ్రశ్రేణి విశ్వవిద్యాలయాలలో ఒకటి.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">మెడికల్, డెంటల్, ఇంజనీరింగ్, లా — అన్ని స్ట్రీమ్‌లు ఒకే క్యాంపస్‌లో.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">97% ప్లేస్‌మెంట్ రేటు — 44 LPA అత్యధిక ప్యాకేజీ.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">Google, Meta, Amazon, JP Morgan వంటి టాప్ కంపెనీలు రిక్రూట్ చేస్తాయి.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">సొంత హాస్పిటల్ — ప్రాక్టికల్ ట్రైనింగ్‌కు అత్యుత్తమ సౌకర్యం.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "కోర్సులు" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-teal-600" /> ప్రధాన కోర్సులు (Top Courses)
                  </h2>
                  <div className="grid gap-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-hide">
                    {SAVEETHA_COURSES.map((course, i) => (
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
                          <button onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-teal-600 font-bold hover:underline mt-1">
                            వివరాలు తెలుసుకోండి
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "ప్లేస్‌మెంట్స్" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-teal-600" /> ప్లేస్‌మెంట్స్ (Placements)
                  </h2>
                  <p className="text-gray-600">
                    సవీతా యూనివర్సిటీ విద్యార్థులకు అత్యుత్తమ ఉద్యోగ అవకాశాలను కల్పిస్తోంది. Google, Meta, Amazon, TCS, Infosys, Cognizant, JP Morgan Chase, Apollo Hospitals వంటి అగ్రశ్రేణి కంపెనీలు క్యాంపస్ ప్లేస్‌మెంట్స్‌లో పాల్గొంటాయి.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 text-center">
                      <p className="text-3xl font-black text-teal-700">44 LPA</p>
                      <p className="text-sm font-medium text-teal-800 mt-1">అత్యధిక ప్యాకేజీ (Highest)</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center">
                      <p className="text-3xl font-black text-blue-700">5.36 LPA</p>
                      <p className="text-sm font-medium text-blue-800 mt-1">సగటు ప్యాకేజీ (Average)</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">టాప్ రిక్రూటర్లు (Top Recruiters)</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Google", "Meta", "Amazon", "TCS", "Infosys", "Cognizant", "JP Morgan", "Apollo Hospitals", "Fortis", "HCL", "Wipro", "Zoho"].map((company) => (
                        <span key={company} className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-700 border border-amber-200 shadow-sm">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "హాస్టల్" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-teal-600" /> హాస్టల్ సౌకర్యాలు (Hostel Facilities)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["హాస్టల్ రకం", "బాలురు & బాలికలకు వేర్వేరు హాస్టళ్ళు"],
                      ["గదులు", "2–4 మంది షేరింగ్ రూమ్‌లు"],
                      ["హాస్టల్ ఫీజు", "₹70,000 – ₹1,10,000/సంవత్సరం (ఆహారంతో సహా)"],
                      ["సౌకర్యాలు", "Wi-Fi, 24/7 సెక్యూరిటీ, రీడింగ్ రూమ్, లాండ్రీ, మెస్"],
                      ["భోజనం", "శాఖాహార & మాంసాహార ఎంపికలు"],
                      ["సంప్రదించండి", "+91-44-26810600"],
                    ].map(([l, v], i) => (
                      <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                        <span className="text-xs text-gray-400 font-bold uppercase">{l}</span>
                        <p className="font-semibold text-gray-800 mt-1">{v}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-8">
              <InlineCTABanner
                headline="మీ అడ్మిషన్ ప్రాసెస్‌లో సహాయం కావాలా?"
                subtext="మా తెలుగు మాట్లాడే నిపుణులతో ఉచితంగా మాట్లాడండి."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-24" id="lead-form">
              <InlineLeadForm collegeName="Saveetha University (Telugu Landing)" collegeId="saveetha-telugu" />

              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-amber-900">స్కాలర్‌షిప్ అవకాశం</h3>
                <p className="text-sm text-amber-700 mt-2 font-medium">మెరిట్ ఆధారంగా ట్యూషన్ ఫీజులో గణనీయమైన రాయితీ లభించే అవకాశం ఉంది. ఇప్పుడే దరఖాస్తు చేసుకోండి!</p>
              </div>

              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-blue-900">క్యాంపస్ సౌకర్యాలు</h3>
                <p className="text-sm text-blue-700 mt-2 font-medium">సొంత హాస్పిటల్, డెంటల్ క్లినిక్, హాస్టల్, లైబ్రరీ, స్పోర్ట్స్ కాంప్లెక్స్, WiFi క్యాంపస్ — అన్ని సౌకర్యాలతో కూడిన ఆధునిక క్యాంపస్.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
