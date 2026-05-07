"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  return (
    <article 
      className="relative group flex flex-col h-full w-full p-6 rounded-[24px] border border-white/5 bg-[#0A0A0A] hover:bg-[#111111] transition-all duration-500 overflow-hidden"
    >
      {/* World-class touch: Dynamic glow effect using the 'color' prop */}
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      
      {/* Top accent border */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] opacity-50"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div 
          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10"
          style={{ color: color, backgroundColor: `${color}15` }}
        >
          {subject}
        </div>
        <button className="p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <Image 
            src="/icons/bookmark.svg" 
            alt="bookmark" 
            width={12}
            height={12}
            className="brightness-200"
          />
        </button>
      </div>

      <div className="flex-1 relative z-10">
        <h1 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {name}
        </h1>
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 min-h-[40px]">
          {topic}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/5">
          <Image src="/icons/clock.svg" alt="clock" width={14} height={14} className="opacity-70" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Duration</span>
          <span className="text-sm font-semibold text-white">{duration} Minutes</span>
        </div>
      </div>

      <Link href={`/companions/${id}`} className="relative z-10">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-indigo-50 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Launch Lesson
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;