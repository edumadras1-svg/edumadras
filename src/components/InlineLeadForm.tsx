"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  User,
  UserPlus,
  Mail,
  MapPin,
  BookOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { sendLeadEmails } from "@/lib/sendLeadEmails";

const courses = [
  { id: "btech-cse", name: "B.Tech / B.E. Computer Science" },
  { id: "btech-ece", name: "B.Tech / B.E. ECE" },
  { id: "btech-mech", name: "B.Tech / B.E. Mechanical" },
  { id: "btech-civil", name: "B.Tech / B.E. Civil" },
  { id: "btech-ai", name: "B.Tech AI & Data Science" },
  { id: "mbbs", name: "MBBS" },
  { id: "bds", name: "BDS" },
  { id: "bpharm", name: "B.Pharm" },
  { id: "bsc", name: "B.Sc." },
  { id: "bcom", name: "B.Com" },
  { id: "ba", name: "B.A." },
  { id: "bba", name: "BBA" },
  { id: "mba", name: "MBA" },
  { id: "law", name: "LLB / BL" },
  { id: "other", name: "Other / Not Listed" },
];

interface InlineLeadFormProps {
  collegeName?: string;
  collegeId?: string;
}

export function InlineLeadForm({ collegeName, collegeId }: InlineLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    target_course: "",
    father_name: "",
    father_phone: "",
    email: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          college_id: collegeId || undefined,
          name: formData.name,
          phone: formData.phone,
          target_course: formData.target_course,
          father_name: formData.father_name,
          father_phone: formData.father_phone,
          email: formData.email || undefined,
          city: formData.city,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
      sendLeadEmails({ ...formData, college_name: collegeName });
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-emerald-800">Application Submitted!</h3>
        <p className="text-emerald-600 text-sm mt-1">
          Our counselor will call you within 30 minutes about {collegeName || "your admission"}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-orange-200/40 border-2 border-orange-300/60" style={{ animation: 'formGlow 2s ease-in-out infinite alternate' }}>
      {/* Big Admission Enquiry Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-5 py-5 text-center relative overflow-hidden">
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'formShimmer 2s ease-in-out infinite' }} />
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">Admissions Open 2026</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>

          {/* College Name — Big Highlight */}
          {collegeName && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 mx-auto mb-3 border-2 border-yellow-300 shadow-lg shadow-orange-900/20 max-w-[95%]">
              <p className="text-sm font-extrabold text-orange-500 uppercase tracking-widest mb-1">Admission Enquiry For</p>
              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                🎓 {collegeName}
              </h3>
            </div>
          )}

          {!collegeName && (
            <h3 className="text-white text-xl md:text-2xl font-extrabold leading-tight drop-shadow-md mb-1">
              📝 Admission Enquiry
            </h3>
          )}

          <p className="text-white text-base md:text-lg font-extrabold drop-shadow-sm">
            Fill the Form Below 👇
          </p>
          <p className="text-white/80 text-xs font-semibold mt-1">
            ⚡ Get instant callback within 30 minutes · 100% Free
          </p>
        </div>
      </div>

      {/* Form Body */}
      <div className="bg-white p-4 md:p-5">
        <form onSubmit={handleSubmit}>
          {/* Row 1: Name + Phone */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="tel"
                placeholder="Phone *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Row 2: Course (full width) */}
          <div className="relative group mt-2.5">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
            <select
              required
              value={formData.target_course}
              onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
              className="w-full h-10 pl-9 pr-9 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium appearance-none cursor-pointer focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
            >
              <option value="">Select Course *</option>
              {courses.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
          </div>

          {/* Row 3: Father Name + Father Phone */}
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            <div className="relative group">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="text"
                placeholder="Father Name *"
                value={formData.father_name}
                onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="tel"
                placeholder="Father Phone *"
                value={formData.father_phone}
                onChange={(e) => setFormData({ ...formData, father_phone: e.target.value.replace(/\D/g, "") })}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Row 4: Email (optional) + City */}
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                type="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="text"
                placeholder="City *"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full h-12 mt-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-base font-extrabold rounded-xl shadow-lg shadow-orange-300/40 flex items-center justify-center gap-2 transition-all btn-press"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Apply Free — Get Callback
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400 mt-2.5 font-semibold">
            ✅ No charges · No spam · Trusted by 10,000+ students
          </p>
        </form>
      </div>


    </div>
  );
}
