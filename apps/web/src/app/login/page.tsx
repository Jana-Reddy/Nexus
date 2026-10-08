"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email.includes("@")) return setError("Please enter a valid email address.");
    if (!formData.password) return setError("Password is required.");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (!err.response) {
        setError("Unable to connect. Please check your connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans antialiased bg-[#FAFAF9]">
      {/* Left side */}
      <div className="hidden lg:flex flex-col flex-1 bg-[#18181B] text-white p-12 justify-between">
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div className="w-6 h-6 bg-white rounded-[4px] flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-[#18181B] font-bold text-[11px]">
              ⌘
            </span>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">NEXUS</span>
        </Link>
        <div className="max-w-md">
          <h1 className="text-[38px] font-bold tracking-tight mb-4 leading-[1.1]">
            Turn complex work into clear progress.
          </h1>
          <p className="text-[17px] text-[#A1A1AA] leading-relaxed">
            One focused workspace for projects, tasks, and progress.
          </p>
        </div>
        <div className="text-[12px] text-[#71717A]">
          © 2026 Nexus
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8">
            <h2 className="text-[26px] font-bold text-[#18181B] tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Sign in to continue to your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-[13px] font-medium text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#18181B]">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2 text-[14px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-medium text-[#18181B]">
                  Password
                </label>
                <Link href="#" className="text-[12px] font-medium text-[#71717A] hover:text-[#18181B]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-[#E4E4E7] rounded-lg pl-3 pr-10 py-2 text-[14px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#18181B] text-white text-[14px] font-medium py-2.5 rounded-lg hover:bg-[#27272A] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[#71717A]">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#18181B] font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
