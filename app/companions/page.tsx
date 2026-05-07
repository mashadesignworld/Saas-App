import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });

    return (
        <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER & FILTERS */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B82F6]/10 border border-[#2B82F6]/20 mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2B82F6]">
                                Knowledge Repository
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                            The Architect <br />
                            <span className="text-[#94A3B8]">Library</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            Deploy pre-configured AI specialists trained for the Kenyan 
                            professional landscape. Filter by industry or specific expertise.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <SearchInput />
                        <SubjectFilter />
                    </div>
                </header>

                {/* COMPANIONS GRID */}
                {companions.length > 0 ? (
                   /* ... existing imports ... */

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                        {companions.map((companion) => (
                            <div key={companion.id} className="flex h-full"> {/* Parent wrapper forces height */}
                                <CompanionCard
                                    {...companion}
                                    color={getSubjectColor(companion.subject)}
                                    className="w-full h-full" // Passing h-full to the component
                                />
                            </div>
                        ))}
                    </section>
                ) : (
                    /* EMPTY STATE */
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-[40px]">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <div className="w-6 h-6 border-2 border-slate-700 rounded-full border-t-[#2B82F6] animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Architects Found</h3>
                        <p className="text-slate-500 text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default CompanionsLibrary;