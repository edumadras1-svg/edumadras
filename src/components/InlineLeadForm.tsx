"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  User,
  Mail,
  MapPin,
  BookOpen,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

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
    email: "",
    phone: "",
    city: "",
    target_course: "",
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
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          target_course: formData.target_course,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-emerald-800">Application Submitted!</h3>
        <p className="text-emerald-600 text-sm mt-1">
          Our counselor will call you within 30 minutes about {collegeName || "your admission"}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1B3A5C] rounded-2xl p-5 md:p-6 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full -mr-12 -mt-12 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-teal/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-teal" />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold leading-tight">
              {collegeName ? `Apply to ${collegeName}` : "Get Free Counseling"}
            </h3>
            <p className="text-white/40 text-[10px]">Our counselor will call you in 30 mins</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 pl-8 pr-3 bg-white/10 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-all"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                required
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-10 pl-8 pr-3 bg-white/10 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 pl-8 pr-3 bg-white/10 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-all"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                required
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-10 pl-8 pr-3 bg-white/10 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-2.5">
            <div className="relative">
              <BookOpen className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <select
                required
                value={formData.target_course}
                onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
                className="w-full h-10 pl-8 pr-8 bg-white/10 border border-white/10 rounded-lg text-xs text-white appearance-none cursor-pointer focus:outline-none focus:border-teal/50 transition-all [&>option]:text-slate-900"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="h-10 px-5 bg-teal hover:bg-teal/90 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all btn-press whitespace-nowrap shadow-lg shadow-teal/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Apply Free
                </>
              )}
            </button>
          </div>

          <p className="text-[9px] text-center text-white/25 mt-2.5">
            100% Free · No spam · Callback within 30 mins
          </p>
        </form>
      </div>
    </div>
  );
}
