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
    <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
      {/* Header Strip */}
      <div className="bg-gradient-to-r from-teal to-emerald-400 px-5 py-3.5 flex items-center gap-2.5">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-white text-sm font-bold leading-tight">
            {collegeName ? `Apply to ${collegeName}` : "Get Free Counseling"}
          </h3>
          <p className="text-white/60 text-[10px] font-medium">Counselor will call in 30 mins · 100% Free</p>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-4 md:p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="text"
                placeholder="Full Name"
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
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
              <input
                required
                type="email"
                placeholder="Email"
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
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="relative group mt-2.5">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-teal transition-colors" />
            <select
              required
              value={formData.target_course}
              onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
              className="w-full h-10 pl-9 pr-9 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs text-slate-800 font-medium appearance-none cursor-pointer focus:outline-none focus:border-teal focus:bg-white focus:shadow-sm transition-all"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full h-11 mt-3 bg-gradient-to-r from-teal to-emerald-400 hover:from-teal/90 hover:to-emerald-400/90 text-white text-sm font-bold rounded-xl shadow-lg shadow-teal/20 flex items-center justify-center gap-2 transition-all btn-press"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Apply Free — Get Callback
              </>
            )}
          </button>

          <p className="text-[9px] text-center text-slate-300 mt-2 font-medium">
            ✅ No charges · No spam · Trusted by 10,000+ students
          </p>
        </form>
      </div>
    </div>
  );
}
