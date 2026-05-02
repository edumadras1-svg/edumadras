"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, Loader2, Phone, User, Mail, MapPin, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeId: string;
  collegeName: string;
  courses: { id: string; name: string }[];
  mode?: "apply" | "counseling";
}

export function ApplicationModal({ isOpen, onClose, collegeId, collegeName, courses, mode = "apply" }: ApplicationModalProps) {
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
      const { error } = await supabase.from("leads").insert([
        {
          college_id: collegeId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          target_course: formData.target_course,
          status: "Pending",
        },
      ]);

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="relative h-32 bg-[#0F172A] flex items-center justify-center p-6 text-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative z-10">
              <h2 className="text-white text-xl font-bold">
                {mode === "apply" ? `Apply to ${collegeName}` : `Counseling for ${collegeName}`}
              </h2>
              <p className="text-white/40 text-xs mt-1">
                {mode === "apply" ? "Free Admission Guidance for 2026 Session" : "Expert guidance to help you choose the right path"}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
          </div>

          <div className="p-6">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-slate-500 mt-2 text-sm">
                  Our expert counselor will contact you shortly to guide you through the next steps at {collegeName}.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-8 h-12 w-full bg-[#0F172A] text-white font-bold rounded-xl btn-press shadow-lg"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="Current City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm"
                  />
                </div>

                <div className="relative group">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <select
                    required
                    value={formData.target_course}
                    onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
                    className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all appearance-none text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="">Select Preferred Course</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Other">Other / Not Listed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full h-12 bg-[#0F172A] text-white font-bold rounded-xl shadow-lg shadow-slate-200 btn-press flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {mode === "apply" ? "Submit Application" : "Request Callback"}
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400 mt-4 leading-tight px-4">
                  By clicking submit, you agree to our Terms of Use and Privacy Policy. You may receive SMS/Call from our experts.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
