"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Phone,
  Trash2,
  Edit2,
  Loader2,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Counselor {
  id: string;
  name: string;
  phone: string;
  role: string | null;
  is_active: boolean;
  avatar_url: string | null;
}

export default function AdminCounselorsPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "Counselor",
    is_active: true,
    avatar_url: ""
  });

  const fetchCounselors = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('counselors')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching counselors", error);
    } else {
      setCounselors(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const handleOpenModal = (counselor?: Counselor) => {
    if (counselor) {
      setEditingId(counselor.id);
      setFormData({
        name: counselor.name,
        phone: counselor.phone,
        role: counselor.role || "Counselor",
        is_active: counselor.is_active,
        avatar_url: counselor.avatar_url || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        phone: "",
        role: "Counselor",
        is_active: true,
        avatar_url: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingId) {
      const { error } = await supabase
        .from('counselors')
        .update({
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          is_active: formData.is_active,
          avatar_url: formData.avatar_url
        })
        .eq('id', editingId);
        
      if (!error) {
        handleCloseModal();
        fetchCounselors();
      } else {
        alert("Failed to update counselor.");
      }
    } else {
      const { error } = await supabase
        .from('counselors')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          is_active: formData.is_active,
          avatar_url: formData.avatar_url
        }]);
        
      if (!error) {
        handleCloseModal();
        fetchCounselors();
      } else {
        alert("Failed to add counselor.");
        console.error(error);
      }
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this counselor?")) {
      const { error } = await supabase
        .from('counselors')
        .delete()
        .eq('id', id);
        
      if (!error) {
        fetchCounselors();
      } else {
        alert("Failed to delete counselor.");
      }
    }
  };

  const filteredCounselors = counselors.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.role || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Expert Counselors</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage your network of admissions experts and educational consultants.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Counselor
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-ghost flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search counselors by name or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal/30 focus:ring-4 focus:ring-teal/5 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-teal" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredCounselors.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ring-offset-2 ring-teal/0 group-hover:ring-2 transition-all overflow-hidden relative">
                    {c.avatar_url ? (
                      <img src={c.avatar_url} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      c.name.split(" ").map(n => n[0]).join("")
                    )}
                  </div>
                  <div>
                    <h3 className="text-body-sm font-bold text-navy truncate">{c.name}</h3>
                    <div className={`mt-1.5 flex items-center gap-1.5 text-badge font-bold uppercase tracking-widest ${
                      c.is_active ? "text-green-600" : "text-text-tertiary"
                    }`}>
                      {c.is_active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {c.is_active ? "Active Now" : "Currently Off"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(c)}
                    className="p-2 text-text-tertiary hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-text-tertiary hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-surface-low rounded-xl p-3 border border-border-ghost/50">
                     <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-bold">Role</p>
                     <p className="text-caption font-bold text-navy truncate mt-0.5">{c.role || "Counselor"}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-caption text-text-secondary">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{c.phone || "Not Set"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredCounselors.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-border-ghost">
                <Users className="w-12 h-12 text-text-tertiary mb-3 opacity-50" />
                <h3 className="text-lg font-bold text-navy mb-1">No counselors found</h3>
                <p className="text-text-secondary text-sm">Create your first counselor to get started.</p>
             </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-border-ghost">
            <div className="flex items-center justify-between p-5 border-b border-border-ghost bg-surface-low/50">
              <h2 className="text-lg font-bold text-navy">
                {editingId ? "Edit Counselor" : "Add New Counselor"}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-text-tertiary hover:text-navy hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    placeholder="e.g. Dr. Priya Sharma"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Role / Title</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    placeholder="e.g. Senior Counselor — Engineering"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Avatar URL</label>
                  <input
                    type="url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    placeholder="e.g. https://example.com/avatar.jpg"
                  />
                </div>
                
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-11 h-6 bg-border-ghost rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-teal after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </div>
                    <span className="text-sm font-bold text-navy">Counselor is Active</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border-ghost flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-sm font-bold text-text-secondary hover:text-navy transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-teal text-white text-sm font-bold rounded-xl hover:bg-teal/90 transition-colors shadow-md shadow-teal/20 disabled:opacity-70 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    "Save Counselor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
