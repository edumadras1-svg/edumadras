"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const banners = [
  { id: 1, title: "Year End Sale!", subtitle: "Get up to 50% off on Premium College Applications", cta: "Apply Now", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", isActive: true, gradient: "bg-gradient-to-r from-blue-600 to-indigo-700" },
  { id: 2, title: "Scholarship Mela 2025", subtitle: "100% Scholarships Available", cta: "Check Eligibility", image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=2070&auto=format&fit=crop", isActive: true, gradient: "bg-gradient-to-r from-emerald-500 to-teal-700" },
  { id: 3, title: "Study Abroad", subtitle: "Your Gateway to Global Education", cta: "Book Consultation", image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2070&auto=format&fit=crop", isActive: false, gradient: "bg-gradient-to-r from-orange-500 to-red-600" },
];

export default function AdminBannersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Banner Management</h1>
          <p className="text-text-secondary text-caption font-medium">
            Control your homepage hero section, promotions, and announcements.
          </p>
        </div>
        <button className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0">
          <Plus className="w-4 h-4" /> Create Banner
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden group hover:shadow-lg transition-all duration-300">
            {/* Preview Area */}
            <div className={`relative h-48 overflow-hidden ${banner.gradient} p-8 flex flex-col justify-center`}>
              <img 
                src={banner.image} 
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{banner.subtitle}</span>
                <h3 className="text-2xl font-bold text-white max-w-sm leading-tight tracking-tight">{banner.title}</h3>
                <div className="pt-2 flex items-center gap-2 text-white/90 text-badge font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  {banner.cta} <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border shadow-sm ${
                banner.isActive ? "bg-white text-green-600 border-green-100" : "bg-white text-text-tertiary border-border-ghost"
              }`}>
                {banner.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {banner.isActive ? "Live" : "Inactive"}
              </div>
            </div>

            {/* Management Bar */}
            <div className="p-4 flex items-center justify-between bg-surface-low/30">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-teal/10 text-teal flex items-center justify-center text-[8px] font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-text-tertiary font-bold uppercase tracking-tight">Active In 3 Collections</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-text-secondary hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2.5 text-text-secondary hover:text-navy transition-colors rounded-xl hover:bg-surface border border-transparent hover:border-border-ghost">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-border-ghost mx-1" />
                <button className="p-2.5 text-text-tertiary hover:text-red-600 transition-colors rounded-xl hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Summary */}
            <div className="p-5 border-t border-border-ghost/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface rounded-xl text-text-tertiary">
                   <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-badge font-extrabold text-navy uppercase tracking-widest">Marketing Copy</p>
                  <p className="text-caption text-text-secondary mt-1 line-clamp-2">
                    {banner.subtitle}. This banner is currently set to link to the global campaign landing page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
