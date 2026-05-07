import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER: Pitching the Upgrade */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B82F6]/10 border border-[#2B82F6]/20 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2B82F6]">Tier Selection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Expand Your <span className="text-[#2B82F6]">Intelligence Vault</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">
            Unlock longer session durations, unlimited companion creation, and 
            priority access to our most advanced AI models.
          </p>
        </header>

        {/* PRICING TABLE CONTAINER */}
        <section className="relative p-1 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl overflow-hidden">
            {/* Clerk Pricing Table */}
            <PricingTable />
        </section>

        {/* TRUST FOOTER */}
        <footer className="mt-12 text-center">
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                Securely processed via Stripe & Clerk
            </p>
        </footer>
      </div>
    </main>
  );
};

export default Subscription;