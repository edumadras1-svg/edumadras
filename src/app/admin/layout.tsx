"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  BookOpen,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import AdminLogin from "@/components/admin/AdminLogin";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Colleges", href: "/admin/colleges", icon: GraduationCap },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Leads", href: "/admin/leads", icon: MessageSquare },
  { name: "Counselors", href: "/admin/counselors", icon: Users },
  { name: "Banners", href: "/admin/banners", icon: ImageIcon },
  { name: "Popups", href: "/admin/popups", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-low">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="flex h-screen bg-surface-low overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out bg-navy border-r border-white/10 flex flex-col z-50`}
      >
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg shadow-black/20">
              <img src="/logo_icon.ico" alt="EduMadras" className="w-full h-full object-contain bg-white" />
            </div>
            {isSidebarOpen && (
              <span className="text-white font-bold tracking-tight text-lg">
                Edu<span className="text-teal">Madras</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-teal text-white shadow-lg shadow-teal/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "group-hover:text-teal"}`} />
                {isSidebarOpen && <span className="font-medium text-[15px]">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <button onClick={handleSignOut} suppressHydrationWarning className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all group">
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium text-[15px]">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-border-ghost flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full border border-border-ghost w-72 group focus-within:border-teal/30 focus-within:ring-2 focus-within:ring-teal/5 transition-all">
              <Search className="w-4 h-4 text-text-tertiary group-focus-within:text-teal" />
              <input
                type="text"
                placeholder="Quick search..."
                className="bg-transparent border-none outline-none text-body-sm w-full placeholder:text-text-tertiary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-border-ghost mx-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-label font-semibold text-text-primary leading-none max-w-[150px] truncate">{session?.user?.email}</p>
                <p className="text-[11px] text-text-tertiary mt-1 uppercase tracking-wider font-bold">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold border-2 border-surface shadow-sm uppercase">
                {session?.user?.email?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
