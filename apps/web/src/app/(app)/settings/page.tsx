"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight mb-1">
            Settings
          </h1>
          <p className="text-[14px] text-[#71717A]">
            Manage your account and preferences.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            {[
              { id: "general", label: "General" },
              { id: "security", label: "Security" },
              { id: "notifications", label: "Notifications" },
              { id: "billing", label: "Billing" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#F4F4F5] text-[#18181B]"
                    : "text-[#71717A] hover:bg-[#FAFAF9] hover:text-[#18181B]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 max-w-2xl">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E4E4E7] rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#18181B] mb-1">
                    Profile Information
                  </h3>
                  <p className="text-[13px] text-[#71717A] mb-4">
                    Update your account profile information.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#18181B] mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        defaultValue="User"
                        className="w-full max-w-md border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#18181B] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="w-full max-w-md border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] bg-[#FAFAF9] focus:outline-none transition-colors"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#E4E4E7]">
                  <button className="bg-[#18181B] text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-[#27272A] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#FECACA] rounded-xl p-6 shadow-sm">
                <h3 className="text-[14px] font-semibold text-[#DC2626] mb-1">
                  Danger Zone
                </h3>
                <p className="text-[13px] text-[#71717A] mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <button className="bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-[#FEE2E2] transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-[#E4E4E7] rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#18181B] mb-1">
                    Change Password
                  </h3>
                  <p className="text-[13px] text-[#71717A] mb-4">
                    Update your password to keep your account secure.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-medium text-[#18181B] mb-1.5">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full max-w-md border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#18181B] mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full max-w-md border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#18181B] mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full max-w-md border border-[#E4E4E7] rounded-lg px-4 py-2 text-[14px] text-[#18181B] focus:outline-none focus:border-[#18181B] transition-colors"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#E4E4E7]">
                  <button className="bg-[#18181B] text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-[#27272A] transition-colors">
                    Save Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "general" && activeTab !== "security" && (
            <div className="bg-white border border-[#E4E4E7] rounded-xl p-12 shadow-sm text-center animate-in fade-in duration-300">
              <h3 className="text-[14px] font-medium text-[#18181B] mb-2">
                Coming Soon
              </h3>
              <p className="text-[13px] text-[#71717A]">
                This settings page is currently under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
