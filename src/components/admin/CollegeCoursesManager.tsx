"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Plus, Trash2, Edit2, Loader2, BookOpen, X, CheckSquare } from "lucide-react";

interface MasterCourse {
  id: string;
  name: string;
  stream: string | null;
}

interface CollegeCourse {
  id: string;
  college_id: string;
  course_id: string;
  fee: number | null;
  duration: string | null;
  seats: number | null;
  eligibility: string | null;
  avg_package: number | null;
  master_course?: MasterCourse; // Joined table data
}

export default function CollegeCoursesManager({ collegeId }: { collegeId: string }) {
  const [courses, setCourses] = useState<CollegeCourse[]>([]);
  const [masterCourses, setMasterCourses] = useState<MasterCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    course_id: "",
    fee: "",
    duration: "",
    seats: "",
    eligibility: "",
    avg_package: ""
  });

  const fetchData = async () => {
    setIsLoading(true);

    // Fetch assigned courses with their master course details
    const { data: collegeCourses, error: ccError } = await supabase
      .from('college_courses')
      .select(`
        *,
        master_courses:course_id (
          id,
          name,
          stream
        )
      `)
      .eq('college_id', collegeId);

    // Fetch all master courses for the dropdown
    const { data: masterData, error: mError } = await supabase
      .from('master_courses')
      .select('id, name, stream')
      .order('name');

    if (ccError || mError) {
      console.error("Error fetching course data", ccError, mError);
    } else {
      // Map the nested join to a flatter structure for convenience
      const mappedCourses = (collegeCourses || []).map(cc => ({
        ...cc,
        master_course: cc.master_courses || undefined
      }));
      setCourses(mappedCourses);
      setMasterCourses(masterData || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [collegeId]);

  const handleOpenModal = (course?: CollegeCourse) => {
    if (course) {
      setEditingId(course.id);
      setFormData({
        course_id: course.course_id,
        fee: course.fee?.toString() || "",
        duration: course.duration || "",
        seats: course.seats?.toString() || "",
        eligibility: course.eligibility || "",
        avg_package: course.avg_package?.toString() || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        course_id: masterCourses.length > 0 ? masterCourses[0].id : "",
        fee: "",
        duration: "",
        seats: "",
        eligibility: "",
        avg_package: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course_id) {
      alert("Please select a master course");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      college_id: collegeId,
      course_id: formData.course_id,
      fee: formData.fee ? parseFloat(formData.fee) : null,
      duration: formData.duration || null,
      seats: formData.seats ? parseInt(formData.seats) : null,
      eligibility: formData.eligibility || null,
      avg_package: formData.avg_package ? parseFloat(formData.avg_package) : null
    };

    if (editingId) {
      const { error } = await supabase
        .from('college_courses')
        .update(payload)
        .eq('id', editingId);

      if (!error) {
        handleCloseModal();
        fetchData();
      } else {
        alert("Failed to update course: " + error.message);
      }
    } else {
      // Check if course already added
      if (courses.some(c => c.course_id === formData.course_id)) {
        alert("This course is already assigned to the college.");
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('college_courses')
        .insert([payload]);

      if (!error) {
        handleCloseModal();
        fetchData();
      } else {
        alert("Failed to assign course: " + error.message);
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this course from the college?")) {
      const { error } = await supabase
        .from('college_courses')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchData();
      } else {
        alert("Failed to delete course.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm border border-border-ghost">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border-ghost flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-navy">Assigned Courses</h3>
          <p className="text-caption text-text-secondary">Manage fee, duration, and seats for courses in this college.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          disabled={masterCourses.length === 0}
          className="px-4 py-2 bg-navy text-white text-sm font-bold rounded-xl hover:bg-navy/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Assign Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-low border-b border-border-ghost">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-navy uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-navy uppercase tracking-wider">Fee (₹)</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-navy uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-navy uppercase tracking-wider">Seats</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-navy uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-ghost">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-surface/30 transition-all">
                <td className="px-6 py-4">
                  <p className="font-bold text-sm text-navy">{course.master_course?.name || "Unknown Course"}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{course.eligibility || "No eligibility specified"}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-navy">
                  {course.fee ? course.fee.toLocaleString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {course.duration || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {course.seats || "N/A"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(course)}
                      className="p-1.5 text-text-tertiary hover:text-blue-600 transition-colors rounded hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 text-text-tertiary hover:text-red-600 transition-colors rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <CheckSquare className="w-10 h-10 text-text-tertiary opacity-30 mx-auto mb-3" />
                  <p className="text-navy font-bold text-sm">No courses assigned</p>
                  <p className="text-xs text-text-secondary mt-1">Assign a course to display it here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-border-ghost">
            <div className="flex items-center justify-between p-5 border-b border-border-ghost bg-surface-low/50">
              <h2 className="text-lg font-bold text-navy">
                {editingId ? "Edit Course Details" : "Assign Master Course"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-text-tertiary hover:text-navy hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Master Course <span className="text-red-500">*</span></label>
                <select
                  name="course_id"
                  required
                  disabled={!!editingId} // Don't allow changing course once assigned, just delete and re-add
                  value={formData.course_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all appearance-none disabled:opacity-60"
                >
                  <option value="" disabled>Select a course</option>
                  {masterCourses.map(mc => (
                    <option key={mc.id} value={mc.id}>{mc.name} ({mc.stream})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Total Fee (₹)</label>
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal outline-none transition-all"
                    placeholder="e.g. 500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal outline-none transition-all"
                    placeholder="e.g. 4 Years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Seats Available</label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal outline-none transition-all"
                    placeholder="e.g. 120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Avg Package (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="avg_package"
                    value={formData.avg_package}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal outline-none transition-all"
                    placeholder="e.g. 6.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Eligibility</label>
                <input
                  type="text"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low text-body-sm focus:border-teal outline-none transition-all"
                  placeholder="e.g. 60% in 12th PCM"
                />
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
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
