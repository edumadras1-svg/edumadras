"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit2,
  Loader2,
  X,
  BookMarked
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface MasterCourse {
  id: string;
  name: string;
  code: string | null;
  stream: string | null;
  description: string | null;
}

export default function AdminMasterCoursesPage() {
  const [courses, setCourses] = useState<MasterCourse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    stream: "Engineering",
    description: ""
  });

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('master_courses')
      .select('*')
      .order('name');
      
    if (error) {
      console.error("Error fetching courses", error);
    } else {
      setCourses(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenModal = (course?: MasterCourse) => {
    if (course) {
      setEditingId(course.id);
      setFormData({
        name: course.name,
        code: course.code || "",
        stream: course.stream || "Engineering",
        description: course.description || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        code: "",
        stream: "Engineering",
        description: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace empty string with null for code to avoid unique constraint issues if any
    const payload = {
      name: formData.name,
      code: formData.code || null,
      stream: formData.stream,
      description: formData.description
    };
    
    if (editingId) {
      const { error } = await supabase
        .from('master_courses')
        .update(payload)
        .eq('id', editingId);
        
      if (!error) {
        handleCloseModal();
        fetchCourses();
      } else {
        alert("Failed to update course: " + error.message);
      }
    } else {
      const { error } = await supabase
        .from('master_courses')
        .insert([payload]);
        
      if (!error) {
        handleCloseModal();
        fetchCourses();
      } else {
        alert("Failed to add course: " + error.message);
      }
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this master course? It will be removed from all colleges as well.")) {
      const { error } = await supabase
        .from('master_courses')
        .delete()
        .eq('id', id);
        
      if (!error) {
        fetchCourses();
      } else {
        alert("Failed to delete course.");
      }
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.code || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.stream || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Master Courses</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage the global dictionary of degrees and courses that can be assigned to colleges.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Master Course
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-ghost flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search courses by name, code or stream..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal/30 focus:ring-4 focus:ring-teal/5 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50 border-b border-border-ghost">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course Name & Desc</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course Code</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Stream</th>
                  <th className="px-6 py-4 text-right text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-surface/30 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 mt-1 bg-teal/10 text-teal rounded-lg flex items-center justify-center shrink-0">
                          <BookMarked className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-body-sm font-bold text-navy">{course.name}</p>
                          <p className="text-caption text-text-tertiary line-clamp-1 mt-0.5 max-w-sm">
                            {course.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-surface-low px-2 py-1 border border-border-ghost rounded text-text-secondary">
                        {course.code || "---"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600">
                        {course.stream || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(course)}
                          className="p-2 text-text-tertiary hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                          title="Edit Course"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id)}
                          className="p-2 text-text-tertiary hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      <BookOpen className="w-12 h-12 text-text-tertiary opacity-30 mx-auto mb-3" />
                      <p className="text-navy font-bold">No master courses found</p>
                      <p className="text-sm text-text-secondary">Try adjusting your search or add a new one.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-border-ghost">
            <div className="flex items-center justify-between p-5 border-b border-border-ghost bg-surface-low/50">
              <h2 className="text-lg font-bold text-navy">
                {editingId ? "Edit Master Course" : "Add Master Course"}
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
                  <label className="block text-sm font-bold text-navy mb-1.5">Course Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
                    placeholder="e.g. B.Tech in Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Course Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all font-mono"
                    placeholder="e.g. BTECH-CSE"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Stream <span className="text-red-500">*</span></label>
                  <select
                    name="stream"
                    required
                    value={formData.stream}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all appearance-none"
                  >
                    <option>Engineering</option>
                    <option>Medical</option>
                    <option>Management</option>
                    <option>Law</option>
                    <option>Arts & Science</option>
                    <option>Design</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all resize-none"
                    placeholder="A brief overview of the course..."
                  ></textarea>
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
                    "Save Course"
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
