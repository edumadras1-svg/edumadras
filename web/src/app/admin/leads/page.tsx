"use client";

import React, { useState } from "react";
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
} from "lucide-react";

const leads = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@gmail.com", phone: "+91 98765 43210", city: "Chennai", course: "B.Tech CSE", college: "IIT Madras", status: "Pending", date: "Apr 06, 2026", time: "14:20" },
  { id: 2, name: "Ananya Iyer", email: "ananya.iyer@yahoo.com", phone: "+91 87654 32109", city: "Madurai", course: "MBBS", college: "CMC Vellore", status: "Contacted", date: "Apr 06, 2026", time: "11:45" },
  { id: 3, name: "Varun Gupta", email: "v.gupta@outlook.com", phone: "+91 76543 21098", city: "Coimbatore", course: "MBA", college: "IIM Ahmedabad", status: "Pending", date: "Apr 05, 2026", time: "18:20" },
  { id: 4, name: "Priya Das", email: "priya.das@gmail.com", phone: "+91 95432 10987", city: "Salem", course: "B.Des", college: "NID Ahmedabad", status: "Converted", date: "Apr 05, 2026", time: "15:10" },
  { id: 5, name: "Siddharth J", email: "sid.j@rediff.com", phone: "+91 84321 09876", city: "Trichy", course: "Law", college: "NLSIU Bangalore", status: "Rejected", date: "Apr 04, 2026", time: "10:30" },
];

export default function AdminLeadsPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredLeads = leads.filter(l => filterStatus === "All" || l.status === filterStatus);

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
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-low/50 border-b border-border-ghost text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 text-left">Student Information</th>
                <th className="px-6 py-4 text-left">Academic interest</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left font-bold text-navy">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-ghost">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface/30 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-sm shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-body-sm font-bold text-navy truncate">{lead.name}</p>
                        <div className="flex flex-col gap-1 mt-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
                            <MapPin className="w-3 h-3" /> {lead.city}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="bg-surface-low p-2.5 rounded-xl border border-border-ghost/50">
                      <p className="text-body-sm font-bold text-navy">{lead.course}</p>
                      <p className="text-[11px] text-text-tertiary font-medium uppercase tracking-tight">{lead.college}</p>
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
                       <Calendar className="w-3 h-3" /> {lead.date}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-left">
                    <div className="flex items-center gap-1.5">
                      <button className="h-9 px-4 bg-navy text-white text-badge font-bold rounded-lg hover:bg-navy/90 transition-all shadow-sm shadow-navy/10 btn-press">
                        Contact
                      </button>
                      <button className="p-2 text-text-tertiary hover:text-navy transition-colors rounded-lg hover:bg-surface border border-transparent hover:border-border-ghost">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
