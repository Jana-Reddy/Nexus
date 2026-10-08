"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name) return setError("Full name is required.");
    if (!formData.email.includes("@")) return setError("Please enter a valid email address.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // Authenticate after register
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("An account with this email already exists.");
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
              Create your account
            </h2>
            <p className="text-[14px] text-[#71717A]">
              Start organizing your work with Nexus.
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
                Full name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2 text-[14px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
              />
            </div>

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
              <label className="text-[12px] font-medium text-[#18181B]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a password"
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
              {formData.password && (
                <div className="flex gap-1 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${formData.password.length > 0 ? "bg-[#18181B]" : "bg-[#E4E4E7]"}`} />
                  <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? "bg-[#18181B]" : "bg-[#E4E4E7]"}`} />
                  <div className={`h-1 flex-1 rounded-full ${formData.password.length >= 12 && /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) ? "bg-[#18181B]" : "bg-[#E4E4E7]"}`} />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#18181B]">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full bg-white border border-[#E4E4E7] rounded-lg pl-3 pr-10 py-2 text-[14px] text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input type="checkbox" id="terms" required className="rounded border-[#E4E4E7]" />
              <label htmlFor="terms" className="text-[12px] text-[#71717A]">
                I agree to the Terms & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#18181B] text-white text-[14px] font-medium py-2.5 rounded-lg hover:bg-[#27272A] transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[#71717A]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#18181B] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
