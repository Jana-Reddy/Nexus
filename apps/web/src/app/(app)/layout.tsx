"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

function AppContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: Briefcase },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex font-sans antialiased">
      {/* Sidebar */}
      <aside 
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-[#FAFAF9] border-r border-[#E4E4E7] flex flex-col shrink-0 fixed inset-y-0 left-0 z-10 transition-all duration-300`}
      >
        <div className="p-6">
          <Link href="/dashboard" className={`flex items-center gap-2 mb-8 group ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-6 h-6 bg-[#18181B] rounded-[4px] flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <span className="text-white font-bold text-[11px]">
                ⌘
              </span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-[15px] tracking-tight text-[#18181B]">
                NEXUS
              </span>
            )}
          </Link>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#F4F4F5] text-[#18181B]"
                      : "text-[#71717A] hover:bg-[#FAFAF9] hover:text-[#18181B]"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium text-[#71717A] hover:bg-[#FAFAF9] hover:text-[#18181B] w-full transition-colors ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <header className="h-16 bg-[#FAFAF9] border-b border-[#E4E4E7] flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 -ml-1.5 rounded-md text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
              <input
                type="text"
                placeholder="Search projects, tasks, or settings..."
                className="w-full bg-[#F4F4F5] border border-transparent rounded-md pl-10 pr-4 py-1.5 text-[13px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E4E4E7] focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center">
              <span className="text-[12px] font-semibold text-[#18181B]">U</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent>{children}</AppContent>
    </Suspense>
  );
}
