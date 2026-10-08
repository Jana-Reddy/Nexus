"use client";

export default function CrossPlatformSection() {
  return (
    <section className="py-32 px-6 border-t border-[#E4E4E7] bg-[#FAFAF9]">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block text-[11px] font-semibold text-[#6366F1] tracking-widest uppercase mb-6">
          Cross Platform
        </span>
        <h2 className="text-[38px] md:text-[48px] font-bold tracking-[-0.03em] text-[#18181B] mb-5 leading-[1.1]">
          Your work, wherever you are.
        </h2>
        <p className="text-[17px] text-[#71717A] max-w-lg mx-auto mb-16 leading-relaxed">
          Start on the web. Continue on mobile. Nexus keeps your projects and tasks connected through one platform.
        </p>

        {/* Platform visual */}
        <div className="flex flex-col items-center gap-0 mb-16">
          {/* Web App */}
          <div className="w-full max-w-[420px] rounded-xl border border-[#E4E4E7] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F7F7F8] border-b border-[#E4E4E7]">
              <div className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
              <div className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
              <div className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
              <div className="ml-2 flex-1 h-4 bg-[#E4E4E7] rounded max-w-[140px]" />
            </div>
            <div className="p-5 flex gap-3">
              <div className="w-28 bg-[#F7F7F8] rounded-lg h-24 flex flex-col gap-1.5 p-2.5">
                {["Dashboard", "Projects", "Tasks"].map((item) => (
                  <div key={item} className="h-2 bg-[#E4E4E7] rounded-sm w-full" />
                ))}
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-[#18181B] rounded w-24" />
                <div className="h-2 bg-[#E4E4E7] rounded w-36" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-[#F7F7F8] rounded border border-[#E4E4E7]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 pb-3">
              <div className="text-[11px] font-medium text-[#71717A] text-center tracking-widest uppercase">WEB APPLICATION</div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex flex-col items-center py-4 gap-1">
            <div className="w-px h-6 bg-[#D4D4D8]" />
            <div className="px-6 py-2 rounded-full border border-[#E4E4E7] bg-white shadow-sm">
              <span className="text-[12px] font-bold text-[#6366F1] tracking-widest">NEXUS</span>
            </div>
            <div className="w-px h-6 bg-[#D4D4D8]" />
          </div>

          {/* Mobile App */}
          <div className="w-44 rounded-2xl border-2 border-[#E4E4E7] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="bg-[#F7F7F8] py-2 flex justify-center">
              <div className="w-10 h-1 bg-[#D4D4D8] rounded-full" />
            </div>
            <div className="p-3 space-y-2">
              <div className="h-2.5 bg-[#18181B] rounded w-20" />
              <div className="h-1.5 bg-[#E4E4E7] rounded w-24" />
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-[#F7F7F8] rounded-lg border border-[#E4E4E7]" />
                ))}
              </div>
              <div className="space-y-1.5 pt-1">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#E4E4E7]" />
                    <div className="h-1.5 bg-[#E4E4E7] rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F7F7F8] py-2 flex justify-center">
              <div className="w-6 h-1 bg-[#D4D4D8] rounded-full" />
            </div>
            <div className="py-2">
              <div className="text-[10px] font-medium text-[#71717A] text-center tracking-widest uppercase">ANDROID</div>
            </div>
          </div>
        </div>

        <p className="text-[13px] font-medium text-[#A1A1AA]">
          Your changes stay connected across web and mobile.
        </p>
      </div>
    </section>
  );
}
