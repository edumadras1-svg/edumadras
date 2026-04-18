"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Save,
  Loader2,
  Building,
  MapPin,
  Trophy,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import CollegeCoursesManager from "@/components/admin/CollegeCoursesManager";

export default function AdminCollegeFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    type: "Private",
    stream: "Engineering",
    rank: "",
    established_year: "",
    rating: "",
    avg_package: "",
    highest_package: "",
    total_students: "",
    description: "",
    approvals: "", // Array of strings handled as comma separated visually
    logo_url: "",
    banner_url: "",
    fee_structure_url: "",
    is_recommended: false,
  });

  useEffect(() => {
    if (!isNew) {
      fetchCollege();
    }
  }, [isNew]);

  const fetchCollege = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', resolvedParams.id)
      .single();
      
    if (error) {
      console.error("Error fetching college", error);
      alert("College not found");
      router.push("/admin/colleges");
    } else if (data) {
      setFormData({
        name: data.name || "",
        city: data.city || "",
        state: data.state || "",
        type: data.type || "Private",
        stream: data.stream || "Engineering",
        rank: data.rank?.toString() || "",
        established_year: data.established_year?.toString() || "",
        rating: data.rating?.toString() || "",
        avg_package: data.avg_package?.toString() || "",
        highest_package: data.highest_package?.toString() || "",
        total_students: data.total_students?.toString() || "",
        description: data.description || "",
        approvals: data.approvals ? data.approvals.join(", ") : "",
        logo_url: data.logo_url || "",
        banner_url: data.banner_url || "",
        fee_structure_url: data.fee_structure_url || "",
        is_recommended: data.is_recommended || false,
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Process approvals from string to array
    const approvalsArray = formData.approvals
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload = {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      type: formData.type,
      stream: formData.stream,
      rank: formData.rank ? parseInt(formData.rank) : null,
      established_year: formData.established_year ? parseInt(formData.established_year) : null,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      avg_package: formData.avg_package ? parseFloat(formData.avg_package) : null,
      highest_package: formData.highest_package ? parseFloat(formData.highest_package) : null,
      total_students: formData.total_students ? parseInt(formData.total_students) : null,
      description: formData.description,
      approvals: approvalsArray,
      logo_url: formData.logo_url,
      banner_url: formData.banner_url,
      fee_structure_url: formData.fee_structure_url,
      is_recommended: formData.is_recommended,
    };

    if (isNew) {
      const { data, error } = await supabase
        .from('colleges')
        .insert([payload])
        .select()
        .single();
        
      if (error) {
        alert("Error saving college: " + error.message);
      } else if (data) {
        router.push(`/admin/colleges/${data.id}`);
      }
    } else {
      const { error } = await supabase
        .from('colleges')
        .update(payload)
        .eq('id', resolvedParams.id);
        
      if (error) {
        alert("Error updating college: " + error.message);
      } else {
        alert("College updated successfully");
      }
    }
    
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in relative pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/colleges" className="p-2 text-text-tertiary hover:text-navy transition-colors bg-white rounded-xl shadow-sm border border-border-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy tracking-tight">
              {isNew ? "Add New College" : "Edit College"}
            </h1>
            <p className="text-text-secondary text-caption font-medium">
              {isNew ? "Enter the details for the new institution." : formData.name}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          {['details', 'metrics', 'media', 'courses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-3 \${
                activeTab === tab 
                  ? "bg-teal text-white shadow-md shadow-teal/20" 
                  : "bg-white text-text-secondary hover:bg-surface border border-border-ghost"
              }`}
            >
              {tab === 'details' && <Building className="w-4 h-4" />}
              {tab === 'metrics' && <Trophy className="w-4 h-4" />}
              {tab === 'media' && <ImageIcon className="w-4 h-4" />}
              {tab === 'courses' && <BookOpen className="w-4 h-4" />}
              <span className="capitalize">{tab}</span>
              {activeTab === tab && <CheckCircle2 className="w-4 h-4 ml-auto opacity-70" />}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="flex-1">
          {activeTab === 'courses' && !isNew ? (
            <CollegeCoursesManager collegeId={resolvedParams.id} />
          ) : activeTab === 'courses' && isNew ? (
             <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                 <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-2">Save College First</h3>
               <p className="text-text-secondary max-w-md mb-6">
                 You need to save the basic details of this college before you can start assigning courses to it.
               </p>
               <button 
                 onClick={() => setActiveTab('details')}
                 className="px-6 py-2.5 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition-colors shadow-md shadow-teal/20"
               >
                 Back to Details Layout
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6 md:p-8 space-y-8">
              
              {/* DETAILS TAB */}
              {activeTab === "details" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-navy">Basic Details</h3>
                    <p className="text-caption text-text-secondary">Primary information about the institution.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-navy mb-1.5">Institution Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">City *</label>
                      <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">State *</label>
                      <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Institution Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all appearance-none">
                        <option>Private</option>
                        <option>Government</option>
                        <option>Deemed</option>
                        <option>Autonomous</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Primary Stream</label>
                      <select name="stream" value={formData.stream} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all appearance-none">
                        <option>Engineering</option>
                        <option>Medical</option>
                        <option>Management</option>
                        <option>Law</option>
                        <option>Arts & Science</option>
                        <option>Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Established Year</label>
                      <input type="number" name="established_year" value={formData.established_year} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Approvals (Comma separated)</label>
                      <input type="text" name="approvals" value={formData.approvals} onChange={handleChange} placeholder="e.g. AICTE, UGC, NAAC" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-navy mb-1.5">Description</label>
                       <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all resize-none"></textarea>
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer p-4 border border-border-ghost rounded-xl bg-surface-low/50">
                        <div className="relative flex items-center shrink-0">
                          <input type="checkbox" name="is_recommended" checked={formData.is_recommended} onChange={handleChange} className="peer sr-only" />
                          <div className="w-11 h-6 bg-border-ghost rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-navy block">Mark as Recommended</span>
                          <span className="text-caption text-text-secondary">This college will appear in the "Recommended Courses & Top Exams" featured sections.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* METRICS TAB */}
              {activeTab === "metrics" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-navy">Rankings & Placement</h3>
                    <p className="text-caption text-text-secondary">Enter metrics to display on the college card.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">NIRF / Overall Rank</label>
                      <input type="number" name="rank" value={formData.rank} onChange={handleChange} placeholder="e.g. 5" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Overall Rating (out of 5)</label>
                      <input type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleChange} placeholder="e.g. 4.8" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Average Package (in LPA)</label>
                      <input type="number" step="0.1" name="avg_package" value={formData.avg_package} onChange={handleChange} placeholder="e.g. 15.5" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Highest Package (in LPA)</label>
                      <input type="number" step="0.1" name="highest_package" value={formData.highest_package} onChange={handleChange} placeholder="e.g. 50" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Total Students Enrolled</label>
                      <input type="number" name="total_students" value={formData.total_students} onChange={handleChange} placeholder="e.g. 15000" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* MEDIA TAB */}
              {activeTab === "media" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-navy">Media Assets</h3>
                    <p className="text-caption text-text-secondary">Links to external images for the college.</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Fee Structure PDF/Image URL</label>
                      <input type="url" name="fee_structure_url" value={formData.fee_structure_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Logo URL</label>
                      <input type="url" name="logo_url" value={formData.logo_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                      {formData.logo_url && (
                        <div className="mt-3 w-20 h-20 rounded-xl border border-border-ghost overflow-hidden bg-surface p-2">
                          <img src={formData.logo_url} alt="Logo preview" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1.5">Banner Image URL</label>
                      <input type="url" name="banner_url" value={formData.banner_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
                      {formData.banner_url && (
                        <div className="mt-3 w-full h-40 rounded-xl border border-border-ghost overflow-hidden bg-surface">
                          <img src={formData.banner_url} alt="Banner preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button fixed at bottom */}
              <div className="pt-6 border-t border-border-ghost flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition-colors shadow-md shadow-teal/20 disabled:opacity-70 flex items-center gap-2"
                >
                  {isSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save College</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
