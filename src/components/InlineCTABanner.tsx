"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, ArrowRight, CheckCircle2, User, Landmark } from "lucide-react";

interface InlineCTABannerProps {
  headline?: string;
  subtext?: string;
}

export function InlineCTABanner({ 
  headline = "Not sure which college to pick?", 
  subtext = "Talk to our expert counsellor for free." 
}: InlineCTABannerProps) {
  const [showForm, setShowForm] = useState(false);
  const phoneNumber = "919363699095";
  const message = encodeURIComponent("Hi, I need help finding the right college.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="my-16 bg-navy rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/5 animate-fade-in group">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] transition-all duration-700 group-hover:bg-teal/20" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal/20 text-teal rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 border border-teal/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Expert Counseling
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
            {headline}
          </h3>
          <p className="mt-5 text-white/70 text-body-lg font-medium">
            {subtext}
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-5">
            {!showForm ? (
              <>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold rounded-2xl flex items-center gap-2.5 transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 text-body-sm"
                >
                  <MessageCircle className="w-5 h-5 stroke-[2.5]" /> WhatsApp Us Now
                </a>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all active:scale-95 text-body-sm"
                >
                  Request Callback
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowForm(false)}
                className="text-white/60 hover:text-white text-caption font-bold flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Direct Connect
              </button>
            )}
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-[400px]">
          {showForm ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
              <h4 className="text-white text-h3 font-bold mb-6">Expert Callback</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-11 text-white placeholder:text-white/30 outline-none focus:border-teal/50 transition-all font-medium" 
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-11 text-white placeholder:text-white/30 outline-none focus:border-teal/50 transition-all font-medium" 
                  />
                </div>
                <button className="w-full h-14 bg-teal hover:bg-teal/90 text-navy font-extrabold rounded-xl shadow-lg transition-all active:scale-[0.98] mt-2">
                  Call Me Back
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col items-center">
              <div className="p-5 bg-teal/20 rounded-3xl text-teal mb-6">
                <Landmark className="w-10 h-10 stroke-[2]" />
              </div>
              <div className="text-center">
                <p className="text-white text-badge font-black uppercase tracking-widest mb-1">Elite Counseling</p>
                <p className="text-white/40 text-caption font-bold">Trusted by 10,000+ Students</p>
              </div>
              <div className="mt-8 flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-navy bg-surface-low shadow-lg flex items-center justify-center text-navy font-black text-caption">
                    {i === 1 ? 'JD' : i === 2 ? 'SL' : i === 3 ? 'MK' : '+98'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
