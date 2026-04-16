"use client";

import React from "react";
import {
  Users,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { mockColleges } from "@/lib/mockData";

const stats = [
  { label: "Total Colleges", value: mockColleges.length, icon: GraduationCap, color: "bg-blue-50 text-blue-600", trend: "+12%" },
  { label: "Total Leads", value: "1,284", icon: MessageSquare, color: "bg-teal-50 text-teal-600", trend: "+18%" },
  { label: "Counselors", value: "24", icon: Users, color: "bg-amber-50 text-amber-600", trend: "0%" },
  { label: "Success Rate", value: "68%", icon: TrendingUp, color: "bg-purple-50 text-purple-600", trend: "+5%" },
];

const recentLeads = [
  { id: 1, name: "Rahul Sharma", course: "B.Tech CSE", college: "IIT Madras", status: "Pending", time: "2 mins ago" },
  { id: 2, name: "Ananya Iyer", course: "MBBS", college: "CMC Vellore", status: "Contacted", time: "15 mins ago" },
  { id: 3, name: "Varun Gupta", course: "MBA", college: "IIM Ahmedabad", status: "Pending", time: "1 hour ago" },
  { id: 4, name: "Priya Das", course: "B.Des", college: "NID Ahmedabad", status: "Converted", time: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Platform Overview</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Welcome back! Here's what's happening on EduMadras today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-border-ghost hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.color} transition-colors group-hover:bg-white group-hover:ring-1 group-hover:ring-current`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-badge font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-surface text-text-tertiary'}`}>
                {stat.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-h2 font-bold text-navy">{stat.value}</p>
              <p className="text-label text-text-tertiary mt-0.5 uppercase tracking-wider font-bold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
          <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">Recent Inquiries</h2>
            <button className="text-teal font-semibold text-caption hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Interests</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-xs">
                          {lead.name[0]}
                        </div>
                        <span className="text-body-sm font-semibold text-text-primary">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-body-sm text-text-primary font-medium">{lead.course}</p>
                      <p className="text-[11px] text-text-tertiary uppercase tracking-tight">{lead.college}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${
                        lead.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        lead.status === 'Contacted' ? 'bg-blue-50 text-blue-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">{lead.time}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-navy rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal/10 rounded-full blur-3xl opacity-50" />
            <h3 className="text-lg font-bold mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  <span className="text-body-sm font-medium">Database Connection</span>
                </div>
                <span className="text-badge text-teal">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  <span className="text-body-sm font-medium">Storage Bucket</span>
                </div>
                <span className="text-badge text-teal">Healthy</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 opacity-60">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-body-sm font-medium">Email API</span>
                </div>
                <span className="text-badge text-amber-400">Degraded</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl text-caption transition-all btn-press">
              Run System Diagnostic
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Admin Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border-ghost hover:border-teal hover:bg-teal/5 transition-all group">
                <GraduationCap className="w-6 h-6 text-text-tertiary group-hover:text-teal" />
                <span className="text-badge font-bold text-text-secondary">Add College</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border-ghost hover:border-teal hover:bg-teal/5 transition-all group">
                <MessageSquare className="w-6 h-6 text-text-tertiary group-hover:text-teal" />
                <span className="text-badge font-bold text-text-secondary">Export Leads</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
