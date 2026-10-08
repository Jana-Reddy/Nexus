"use client";

import { Lock, ShieldCheck, Server } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "JWT-based authentication with securely hashed passwords.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Data",
    description: "Users can only access and manage their own projects and tasks.",
  },
  {
    icon: Server,
    title: "Validated Requests",
    description: "Incoming data is validated before it reaches the application.",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-32 px-6 bg-[#09090B] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-[11px] font-semibold text-[#6366F1] tracking-widest uppercase mb-6">
            Security
          </span>
          <h2 className="text-[38px] md:text-[46px] font-bold tracking-[-0.03em] text-[#FAFAFA] mb-5 leading-[1.1]">
            Built with security<br />at its core.
          </h2>
          <p className="text-[17px] text-[#71717A] leading-relaxed">
            Your projects and tasks stay protected with secure authentication, protected APIs, and user-level data isolation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-xl border border-[#1F1F22] bg-[#111113] hover:border-[#27272A] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg border border-[#27272A] flex items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors" />
              </div>
              <h3 className="text-[17px] font-semibold text-[#FAFAFA] mb-3">{title}</h3>
              <p className="text-[14px] text-[#71717A] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
