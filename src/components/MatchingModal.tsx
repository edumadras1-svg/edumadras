"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, Loader2, Sparkles, User, Phone, MapPin, GraduationCap, Star, ArrowRight, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";

interface MatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MatchingModal({ isOpen, onClose }: MatchingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    stream: "",
    marks: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          target_course: `${formData.stream} (Match Request)`,
          qualification: `Marks: ${formData.marks}`,
          status: "Pending",
        },
      ]);

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting match request:", err);
      alert("Failed to process matching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />

        <div className="p-8 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-teal" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">Match Found!</h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                We've identified 3 expert counselors perfect for your profile. They will contact you within 2 hours to start your journey.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 h-14 w-full bg-[#0F172A] text-white font-black rounded-2xl shadow-xl shadow-slate-200 btn-press"
              >
                Awesome!
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Get Your Perfect Counselor Match</h2>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-teal" : "bg-slate-100"}`} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 1: Your Interest</p>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal transition-colors" />
                      <select
                        required
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full h-16 pl-12 pr-10 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all font-bold text-slate-700 appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="">Select Your Stream</option>
                        {["Engineering", "Medical", "Management", "Law", "Design", "Marine", "Arts & Science", "Agriculture", "Architecture", "Pharmacy", "Nursing"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                    </div>
                    
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.stream}
                      className="w-full h-14 bg-[#0F172A] text-white font-black rounded-2xl shadow-xl shadow-slate-200 btn-press disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 2: Performance</p>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input
                        required
                        type="text"
                        placeholder="12th Marks (%) or Entrance Score"
                        value={formData.marks}
                        onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal focus:bg-white transition-all font-bold text-slate-700"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.marks}
                      className="w-full h-14 bg-[#0F172A] text-white font-black rounded-2xl btn-press disabled:opacity-50"
                    >
                      Continue
                    </button>
                    <button type="button" onClick={prevStep} className="w-full text-slate-400 font-bold text-sm">Go Back</button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 3: Contact Info</p>
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                          required
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal transition-all font-bold"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                          required
                          type="tel"
                          placeholder="Mobile Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal transition-all font-bold"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal transition-all font-bold"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                          required
                          type="text"
                          placeholder="Your City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-teal transition-all font-bold"
                        />
                      </div>
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full h-14 bg-teal text-white font-black text-lg rounded-2xl shadow-xl shadow-teal/20 btn-press flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          Find My Match <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <button type="button" onClick={prevStep} className="w-full text-slate-400 font-bold text-sm">Go Back</button>
                  </motion.div>
                )}
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
