import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CompanionComponent from "@/components/CompanionComponent";

export default async function CompanionSession(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  if (!id) redirect("/companions");

  const companion = await getCompanion(id);
  const { name, subject, title, duration, topic } = companion;
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!name) redirect("/companions");

  const brandColor = getSubjectColor(subject);

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* BACK NAVIGATION */}
        <Link 
          href="/companions" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-bold uppercase tracking-widest">Exit to Library</span>
        </Link>

        {/* HEADER: MISSION CONTROL STYLE */}
        <article className="relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-8 backdrop-blur-xl">
          {/* Dynamic background glow based on subject */}
          <div 
            className="absolute -top-24 -right-24 w-64 h-64 blur-[120px] opacity-10 rounded-full pointer-events-none"
            style={{ backgroundColor: brandColor }}
          />

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              {/* Icon with glowing backdrop */}
              <div className="relative size-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                <Image 
                  src={`/icons/${subject}.svg`} 
                  alt={subject} 
                  width={40} 
                  height={40} 
                  className="invert brightness-200" 
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-white tracking-tighter">{name}</h1>
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border"
                    style={{ color: brandColor, borderColor: `${brandColor}40`, backgroundColor: `${brandColor}10` }}
                  >
                    {subject}
                  </span>
                </div>
                <p className="text-[#2B82F6] font-mono text-xs uppercase tracking-[0.2em]">{topic}</p>
              </div>
            </div>

            {/* Desktop Duration Display */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Logic</span>
              <span className="text-xl font-bold text-white font-mono">{duration}m Active</span>
            </div>
          </div>

          {/* Distinctive Session Button */}
          <div className="mt-8 relative z-10">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#2B82F6] hover:text-white transition-all shadow-xl active:scale-95">
              Initialize Architect
            </button>
          </div>
        </article>

        {/* INTERACTION AREA */}
        <section className="relative min-h-[500px] bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle inner gradient to separate the chat area */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <CompanionComponent 
              {...companion}
              companionId={id}
              userName={user.firstName!}
              userImage={user.imageUrl!}
            />
          </div>
        </section>
      </div>
    </main>
  );
}