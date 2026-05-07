import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserRecentSessions, getUserCompanions } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserRecentSessions(user.id);

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION: USER IDENTITY */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-md">
          <div className="flex gap-6 items-center">
            <div className="relative size-[120px]">
               <Image 
                src={user.imageUrl} 
                alt={user.firstName!} 
                fill 
                className="rounded-3xl object-cover border-2 border-[#2B82F6]/30 shadow-[0_0_20px_rgba(43,130,246,0.2)]" 
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B82F6]/10 border border-[#2B82F6]/20 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2B82F6]">Verified Fellow</span>
              </div>
              <h1 className="font-black text-3xl md:text-4xl text-white tracking-tighter">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-slate-500 font-medium italic">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:w-40 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Image src="/icons/check.svg" alt="check" width={20} height={20} className="invert brightness-200" />
                </div>
                <p className="text-3xl font-black text-white">{sessionHistory.length}</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lessons Completed</p>
            </div>

            <div className="flex-1 lg:w-40 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#2B82F6]/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Image src="/icons/cap.svg" alt="cap" width={20} height={20} className="invert brightness-200" />
                </div>
                <p className="text-3xl font-black text-white">{companions.length}</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Architects Created</p>
            </div>
          </div>
        </section>

        {/* JOURNEY ACCORDIONS */}
        <div className="space-y-6">
          <Accordion type="multiple" defaultValue={["recent", "companions"]} className="w-full space-y-4 border-none">
            
            {/* RECENT SESSIONS */}
            <AccordionItem value="recent" className="border-none bg-white/[0.02] rounded-[32px] overflow-hidden px-8 transition-all hover:bg-white/[0.03]">
              <AccordionTrigger className="hover:no-underline py-8">
                <div className="flex items-center gap-4">
                   <div className="size-2 bg-[#2B82F6] rounded-full animate-pulse" />
                   <span className="text-xl font-bold text-white tracking-tight">Recent Learning History</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="pt-4 border-t border-white/5">
                   <CompanionsList title="" companions={sessionHistory} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* MY COMPANIONS */}
            <AccordionItem value="companions" className="border-none bg-white/[0.02] rounded-[32px] overflow-hidden px-8 transition-all hover:bg-white/[0.03]">
              <AccordionTrigger className="hover:no-underline py-8">
                <div className="flex items-center gap-4">
                   <div className="size-2 bg-slate-700 rounded-full" />
                   <span className="text-xl font-bold text-white tracking-tight">
                    Custom Architects <span className="text-slate-600 ml-2">({companions.length})</span>
                   </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="pt-4 border-t border-white/5">
                  <CompanionsList title="" companions={companions} />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default Profile;