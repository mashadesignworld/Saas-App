import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                {canCreateCompanion ? (
                    /* THE BUILDER INTERFACE */
                    <article className="flex flex-col items-center">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B82F6]/10 border border-[#2B82F6]/20 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2B82F6]">
                                    Intelligence Architect
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
                                Architect Your <br />
                                <span className="text-[#94A3B8]">Expert Companion</span>
                            </h1>
                            <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                                Define the subject, refine the personality, and deploy a custom AI 
                                optimized for your professional workflow.
                            </p>
                        </div>

                        {/* Form Container with subtle glassmorphism */}
                        <div className="w-full bg-white/[0.02] border border-white/5 rounded-[32px] p-8 md:p-12 backdrop-blur-xl">
                            <CompanionForm />
                        </div>
                    </article>
                ) : (
                    /* THE PREMIUM UPGRADE INTERFACE (Limit Reached) */
                    <article className="flex flex-col items-center text-center py-12">
                        <div className="relative mb-8 group">
                            {/* Animated background glow */}
                            <div className="absolute inset-0 bg-[#2B82F6] opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity" />
                            
                            <div className="relative bg-[#0F0F0F] border border-white/10 p-10 rounded-[40px] shadow-2xl">
                                <Image 
                                    src="/images/limit.svg" 
                                    alt="Companion limit reached" 
                                    width={280} 
                                    height={180} 
                                    className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                        </div>

                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                                Storage Capacity Reached
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
                            Expand Your <br /> 
                            <span className="text-slate-500">Architectural Reach</span>
                        </h2>
                        
                        <p className="text-slate-400 text-lg max-w-md mb-10 leading-relaxed font-light">
                            You’ve reached the limit for your current tier. Upgrade to 
                            unlock unlimited companions and premium voice synthesis.
                        </p>

                        <Link 
                            href="/subscription" 
                            className="w-full max-w-xs bg-white text-black py-4 rounded-full font-bold text-sm hover:bg-[#2B82F6] hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95"
                        >
                            Upgrade My Plan
                        </Link>
                        
                        <Link href="/" className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                            Return to Lab
                        </Link>
                    </article>
                )}
            </div>
        </main>
    )
}

export default NewCompanion;