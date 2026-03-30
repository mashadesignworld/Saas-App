import Image from "next/image";
import Link from "next/link";
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">
      Start Learning your way.
      </div>
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1.1]">
    Architect Your Perfect <br />
    <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
      Learning Companion
    </span>
  </h2>
    <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">Define a subject, select a signature voice, and refine a personality. 
    Engage in fluid, real-time dialogues that transform complex study into 
    <span className="text-slate-200 font-medium"> effortless mastery.</span></p>
    <Image src="images/cta.svg" alt="cta" width={362}
    height="232" />
    <button className="btn-primary">
      <Image src="/icons/plus.svg" alt="plus"  width={12} height={12} />
    <Link href="/companions/new">
    <p>Build a New Companion</p>
    </Link>
    </button>
    </section>
  )
}

export default CTA