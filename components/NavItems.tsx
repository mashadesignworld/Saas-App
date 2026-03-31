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

interface NavItemsProps {
  isMobile?: boolean;
}

const NavItems = ({ isMobile }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex items-center gap-2",
      isMobile && "flex-col items-start w-full gap-4" // Vertical stack for mobile
    )}>
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "px-5 py-2 text-sm transition-all duration-300 rounded-full border border-transparent",
            isMobile && "w-full text-lg px-2", // Larger text for mobile taps
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