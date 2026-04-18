"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { X, Loader2, Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink, ChevronRight, Sparkles } from "lucide-react";

interface Banner {
  id?: number;
  title: string;
  subtitle: string | null;
  cta: string;
  cta_link: string | null;
  image: string;
  gradient: string | null;
  is_active: boolean;
  created_at?: string;
  description?: string | null;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingBanner, setEditingBanner] = React.useState<Banner | null>(null);
  const [formData, setFormData] = React.useState<Banner>({
    title: "",
    subtitle: "",
    cta: "Learn More",
    cta_link: "#",
    image: "",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
    is_active: true,
  });

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBanners(data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData(banner);
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        subtitle: "",
        cta: "Learn More",
        cta_link: "#",
        image: "",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingBanner) {
      const { error } = await supabase
        .from("banners")
        .update(formData)
        .eq("id", editingBanner.id);
      if (!error) fetchBanners();
    } else {
      const { error } = await supabase.from("banners").insert([formData]);
      if (!error) fetchBanners();
    }

    setLoading(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (!error) fetchBanners();
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    const { error } = await supabase
      .from("banners")
      .update({ is_active: !banner.is_active })
      .eq("id", banner.id);
    if (!error) fetchBanners();
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Banner Management</h1>
          <p className="text-text-secondary text-caption font-medium">
            Control your homepage hero section, promotions, and announcements.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Banner
        </button>
      </div>

      {loading && banners.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-teal" />
        </div>
      ) : (
        /* Banner Grid */
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
                <button 
                  onClick={() => handleToggleActive(banner)}
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border shadow-sm transition-colors ${
                  banner.is_active ? "bg-white text-green-600 border-green-100 font-bold" : "bg-white text-text-tertiary border-border-ghost"
                }`}>
                  {banner.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {banner.is_active ? "Live" : "Inactive"}
                </button>
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
                  <button 
                    onClick={() => handleOpenModal(banner)}
                    className="p-2.5 text-text-secondary hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <a 
                    href={banner.cta_link || "#"}
                    target="_blank"
                    className="p-2.5 text-text-secondary hover:text-navy transition-colors rounded-xl hover:bg-surface border border-transparent hover:border-border-ghost"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="w-[1px] h-4 bg-border-ghost mx-1" />
                  <button 
                    onClick={() => handleDelete(banner.id!)}
                    className="p-2.5 text-text-tertiary hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                  >
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
                      {banner.description || banner.subtitle}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-8 border-b border-border-ghost flex items-center justify-between bg-surface-low/30">
              <div>
                <h2 className="text-2xl font-bold text-navy">{editingBanner ? "Edit Banner" : "Create New Banner"}</h2>
                <p className="text-caption text-text-secondary font-medium">Capture attention with beautiful visuals and clear CTAs.</p>
              </div>
              <button onClick={handleCloseModal} className="p-2 hover:bg-surface rounded-full transition-colors">
                <X className="w-6 h-6 text-text-tertiary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Main Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                    placeholder="e.g., Year End Sale!" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Subtitle/Badge</label>
                  <input 
                    type="text" 
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                    placeholder="e.g., Upto 50% Off" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">CTA Text</label>
                  <input 
                    type="text" 
                    required
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                    placeholder="e.g., Apply Now" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">CTA Link</label>
                  <input 
                    type="text" 
                    value={formData.cta_link || ""}
                    onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                    placeholder="e.g., /compare or URL" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>

              <div className="space-y-2">
                <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Marketing Copy / Description</label>
                <textarea 
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-surface-low border border-border-ghost rounded-xl p-4 text-navy font-medium focus:border-teal outline-none transition-all resize-none h-24"
                  placeholder="Tell students why this matters..." 
                />
              </div>

              <div className="flex items-center gap-6 p-4 bg-surface rounded-2xl border border-border-ghost">
                <div className="flex-1">
                  <p className="text-body-sm font-bold text-navy">Visibility Control</p>
                  <p className="text-caption text-text-secondary font-medium">Show this banner on the homepage immediately.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                  className={`w-14 h-8 rounded-full relative transition-colors ${formData.is_active ? 'bg-teal' : 'bg-border-ghost'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.is_active ? 'right-1' : 'left-1 shadow-sm'}`} />
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 h-12 border border-border-ghost text-navy font-bold rounded-xl hover:bg-surface transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-12 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingBanner ? "Save Changes" : "Create Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
