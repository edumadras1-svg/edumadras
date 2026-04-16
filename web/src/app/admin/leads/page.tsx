"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Loader2,
  Trash2,
  Check,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  target_course: string | null;
  status: string;
  created_at: string;
  colleges?: {
    name: string;
  } | null;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*, colleges(name)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status");
    } else {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      setActiveMenuId(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete inquiry");
    } else {
      setLeads(leads.filter(l => l.id !== id));
      setActiveMenuId(null);
    }
  };

  const handleContact = (phone: string | null) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\s+/g, "");
    window.open(`https://wa.me/${cleanPhone.replace("+", "")}`, "_blank");
  };

  const filteredLeads = leads.filter(l => filterStatus === "All" || l.status === filterStatus);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Student Inquiries</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage your student counseling leads and track conversion progress.
          </p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-border-ghost">
          {["All", "Pending", "Contacted", "Converted"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-caption font-bold transition-all ${
                filterStatus === status ? "bg-teal text-white shadow-sm shadow-teal/20" : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal mb-4" />
            <p className="text-text-secondary font-medium">Loading inquiries...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-text-tertiary opacity-50" />
            </div>
            <p className="text-navy font-bold">No inquiries found</p>
            <p className="text-text-secondary text-sm">There are no leads matching your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50 border-b border-border-ghost text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Student Information</th>
                  <th className="px-6 py-4 text-left">Academic interest</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/30 transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                          {lead.name[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-body-sm font-bold text-navy truncate">{lead.name}</p>
                          <div className="flex flex-col gap-1 mt-1">
                            {lead.phone && (
                              <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
                                <Phone className="w-3 h-3" /> {lead.phone}
                              </div>
                            )}
                            {lead.city && (
                              <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
                                <MapPin className="w-3 h-3" /> {lead.city}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="bg-surface-low p-2.5 rounded-xl border border-border-ghost/50">
                        <p className="text-body-sm font-bold text-navy">{lead.target_course || "General Inquiry"}</p>
                        <p className="text-[11px] text-text-tertiary font-medium uppercase tracking-tight">{lead.colleges?.name || "Multiple Colleges"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                        lead.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200/50' :
                        lead.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' :
                        lead.status === 'Converted' ? 'bg-green-50 text-green-600 border border-green-200/50' :
                        'bg-red-50 text-red-600 border border-red-200/50'
                      }`}>
                        {lead.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {lead.status === 'Contacted' && <User className="w-3 h-3" />}
                        {lead.status === 'Converted' && <CheckCircle2 className="w-3 h-3" />}
                        {lead.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                        {lead.status}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-text-tertiary mt-2">
                         <Calendar className="w-3 h-3" /> {formatDate(lead.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right relative">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleContact(lead.phone)}
                          className="h-9 px-4 bg-navy text-white text-badge font-bold rounded-lg hover:bg-navy/90 transition-all shadow-sm shadow-navy/10 btn-press"
                        >
                          Contact
                        </button>
                        
                        <div className="relative">
                          <button 
                            onClick={() => setActiveMenuId(activeMenuId === lead.id ? null : lead.id)}
                            className={`p-2 transition-all rounded-lg border ${
                              activeMenuId === lead.id 
                                ? "bg-surface border-border-ghost text-navy" 
                                : "text-text-tertiary hover:text-navy hover:bg-surface border-transparent hover:border-border-ghost"
                            }`}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === lead.id && (
                            <div 
                              ref={menuRef}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border-ghost z-50 py-1.5 animate-in fade-in zoom-in duration-200 origin-top-right"
                            >
                              <div className="px-3 py-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest border-b border-border-ghost mb-1">
                                Change Status
                              </div>
                              {["Pending", "Contacted", "Converted", "Rejected"].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleUpdateStatus(lead.id, status)}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-caption font-bold transition-all hover:bg-surface-low ${
                                    lead.status === status ? "text-teal bg-teal/5" : "text-text-secondary hover:text-navy"
                                  }`}
                                >
                                  {status}
                                  {lead.status === status && <Check className="w-3.5 h-3.5" />}
                                </button>
                              ))}
                              
                              <div className="h-px bg-border-ghost my-1.5" />
                              
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-caption font-bold text-red-500 hover:bg-red-50 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Inquiry
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
