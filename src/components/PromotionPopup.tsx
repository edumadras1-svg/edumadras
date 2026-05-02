"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, BellRing } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState<any>(null);

  useEffect(() => {
    const fetchPromo = async () => {
      const { data } = await supabase
        .from("alerts")
        .select("*")
        .eq("is_active", true)
        .eq("type", "offer")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setPromo(data);
        setTimeout(() => setIsOpen(true), 2000);
      } else {
        // Fallback for demo if no data in DB
        setPromo({
          title: "Year End Special!",
          message: "Get up to 50% discount on premium college application processing. Valid for the next 48 hours only!",
          image_url: "https://images.unsplash.com/photo-1523050335392-9bef867a4975?auto=format&fit=crop&q=80&w=1000"
        });
        setTimeout(() => setIsOpen(true), 2000);
      }
    };

    fetchPromo();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPromoPopup", "true");
  };

  if (!isOpen || !promo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/80 backdrop-blur-md" 
        onClick={handleClose}
      />

      {/* Popup Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-slide-up border border-white/20 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 z-30 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/20 transition-all active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Wrapper */}
        <div className="overflow-y-auto no-scrollbar flex-1">
          <div className="flex flex-col">
            {/* Header Area with Gradient & Image Overlay */}
            <div className="relative h-56 md:h-64 flex items-center justify-center overflow-hidden shrink-0">
              {/* Base Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-black" />
              
              {/* Animated Circles for Depth */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/20 rounded-full blur-[80px] animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />

              {promo.image_url && (
                <img 
                  src={promo.image_url} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105"
                />
              )}
              
              <div className="relative z-10 text-center px-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/20 backdrop-blur-md border border-teal/30 text-teal-light text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4">
                  <BellRing className="w-3.5 h-3.5" /> Special Announcement
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                  {promo.title.split(" ").map((word: string, i: number) => (
                    <span key={i} className={i === 0 ? "text-white" : "text-teal-light"}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-10 text-center bg-white">
              <p className="text-base md:text-lg text-text-secondary font-medium leading-relaxed mb-8 max-w-[90%] mx-auto">
                {promo.message}
              </p>
              
              <div className="flex flex-col gap-3">
                <Link
                  href="/counselors"
                  onClick={handleClose}
                  className="w-full h-14 bg-navy text-white text-lg font-black rounded-[20px] flex items-center justify-center gap-3 hover:bg-navy-dark transition-all btn-press shadow-[0_10px_30px_rgba(27,58,92,0.3)] group"
                >
                  Claim This Offer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={handleClose}
                  className="text-[11px] font-black text-text-tertiary hover:text-navy transition-colors py-2 tracking-widest uppercase"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
