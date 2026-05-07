import Image from 'next/image';
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { getRecentSessions, getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main className="pt-24 bg-[#0A0A0A] min-h-screen text-white">
      
      {/* --- HERO SECTION (Integrated) --- */}
      <section className="relative w-full pt-8 pb-20 overflow-hidden border-b border-white/5">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2B82F6]/5 blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: The Localized Pitch */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B82F6]/10 border border-[#2B82F6]/20 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2B82F6]">
                Silicon Savannah AI Lab
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
              Architect your <br />
              <span className="text-[#94A3B8]">Future, Secure </span>
              <span>the Bag</span>
            </h1>
            
            <p className="text-[#94A3B8] text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10">
              Don&apos;t just study Kenyan Law or Data Science. Deploy an AI Mentor that helps you win that contract, 
              manage that stock, and master the Silicon Savannah.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary Action: Directs to the Creation Form */}
              <Link href="/companions/new">
                <button className="bg-[#2B82F6] text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(43,130,246,0.3)] active:scale-95">
                  Build My Companion
                </button>
              </Link>

              {/* Secondary Action: Navigates to the Catalog */}
              <Link href="/companions">
                <button className="bg-transparent border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all active:scale-95">
                  Explore Library
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: The Visual (Reference: hero-architect.png) */}
          <div className="flex-1 relative w-full aspect-square max-w-[500px] lg:max-w-none">
            <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-3xl -rotate-3" />
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 rotate-3 transition-transform hover:rotate-0 duration-700">
              {/* This image needs to be in your /public/images folder */}
              <Image 
                src="/images/hero-architect.png" 
                alt="AI Architecture Visual"
                width={600}
                height={600}
                className="object-contain drop-shadow-[0_0_30px_rgba(43,130,246,0.2)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#2B82F6] mb-4">
            Featured Mentors
          </h2>
          <h3 className="text-3xl font-extrabold tracking-tight">Professional Architects</h3>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mb-24">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              { ... companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>

        <section className="flex flex-col lg:flex-row gap-16 items-start border-t border-white/5 pt-20">
          <div className="flex-1 w-full lg:w-2/3">
            <CompanionsList
              title="Recent Professional Dialogues"
              companions={recentSessionsCompanions}
              classNames="w-full"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <CTA />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;