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
  Loader2,
  Handshake,
  Wallet,
  Banknote,
  ClipboardList,
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
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Admissions", href: "/admin/partners/admissions", icon: ClipboardList, indent: true },
  { name: "Commissions", href: "/admin/partners/commissions", icon: Wallet, indent: true },
  { name: "Payouts", href: "/admin/partners/payouts", icon: Banknote, indent: true },
  { name: "Banners", href: "/admin/banners", icon: ImageIcon },
  { name: "Popups", href: "/admin/popups", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

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
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 bg-navy border-r border-white/10 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:w-64
        `}
      >
        {/* Brand Logo */}
        <div className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg shadow-black/20">
              <img src="/logo_icon.ico" alt="EduMadras" className="w-full h-full object-contain bg-white" />
            </div>
            <span className="text-white font-bold tracking-tight text-base lg:text-lg">
              Edu<span className="text-teal">Madras</span>
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 lg:py-6 px-3 lg:px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item: any) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 ${item.indent ? 'pl-10 lg:pl-12 pr-3 lg:pr-4' : 'px-3 lg:px-4'} py-2.5 lg:py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-teal text-white shadow-lg shadow-teal/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`${item.indent ? 'w-4 h-4' : 'w-5 h-5'} shrink-0 ${isActive ? "text-white" : "group-hover:text-teal"}`} />
                <span className={`font-medium ${item.indent ? 'text-xs lg:text-[13px]' : 'text-sm lg:text-[15px]'}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-3 lg:p-4 border-t border-white/5 bg-black/10">
          <button onClick={handleSignOut} suppressHydrationWarning className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 w-full rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all group">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm lg:text-[15px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header */}
        <header className="h-14 lg:h-16 bg-white border-b border-border-ghost flex items-center justify-between px-4 lg:px-8 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary"
            >
              <Menu className="w-5 h-5" />
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

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="relative p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-border-ghost mx-1 hidden sm:block" />
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-label font-semibold text-text-primary leading-none max-w-[120px] lg:max-w-[150px] truncate text-xs lg:text-sm">{session?.user?.email}</p>
                <p className="text-[10px] lg:text-[11px] text-text-tertiary mt-1 uppercase tracking-wider font-bold">Administrator</p>
              </div>
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-navy flex items-center justify-center text-white text-xs lg:text-sm font-bold border-2 border-surface shadow-sm uppercase">
                {session?.user?.email?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
