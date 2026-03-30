"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
  { label: 'Subscription', href: '/subscription' },
]

const NavItems = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "px-5 py-2 text-sm transition-all duration-300 rounded-full border border-transparent",
            // Active state: subtle teal border and glow instead of a solid block
            pathname === href 
              ? "text-white border-teal-500/30 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.1)] font-semibold" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export default NavItems;