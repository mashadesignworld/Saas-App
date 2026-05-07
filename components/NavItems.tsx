"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: 'Explore', href: '/' },
  { label: 'Architects', href: '/companions' },
  { label: 'My Vault', href: '/my-journey' },
  { label: 'Premium', href: '/subscription' },
]

interface NavItemsProps {
  isMobile?: boolean;
}

const NavItems = ({ isMobile }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex items-center gap-1",
      isMobile && "flex-col items-start w-full gap-3 p-2"
    )}>
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;
        
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative px-5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 rounded-full group",
              isMobile && "w-full text-2xl py-6 border-b border-white/5 rounded-none",
              isActive 
                ? "text-white bg-white/5 border border-white/10" 
                : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <span className="relative z-10">{label}</span>
            
            {/* Moonchild Active Indicator: A subtle top-glow bar */}
            {isActive && !isMobile && (
              <span className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-[#2B82F6] shadow-[0_0_10px_#2B82F6]" />
            )}
          </Link>
        );
      })}
    </div>
  )
}

export default NavItems;