import Image from "next/image";
import Link from "next/link";

// CTA.tsx update
const CTA = () => {
  return (
    <section className="relative flex flex-col p-8 rounded-[24px] bg-[#0F0F0F] border border-white/5 h-fit">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
          Stop designing <br /> from scratch
        </h2>
        <p className="text-[#94A3B8] text-sm mt-4 leading-relaxed">
          Your learning system already has the pieces. Vocalize assembles them. 
          Define a PRD and get production-ready sessions.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xl font-bold text-white">541K+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Sessions</p>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div>
            <p className="text-xl font-bold text-white">66K+</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Architects</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-transparent border border-[#2B82F6] text-white py-3 rounded-full font-semibold hover:bg-[#2B82F6]/10 transition-all shadow-[0_0_15px_rgba(43,130,246,0.2)]">
        See it with your DS
      </button>
    </section>
  )
}
export default CTA;