"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems =[
    {label:'Home', href:'/'},
    {label:'Companions', href:'/companions'},
    {label:'My Journey', href:'/my-journey'},
    {label:'Subscription', href:'/subscription'},

]


const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
        {navItems.map(({ label, href})=>(
            <Link 
            key={href} 
            href={href}
            className={cn(pathname === href && 'font-semibold  rounded-md bg-gradient-to-br from-teal-600 to-cyan-700 shadow-lg shadow-teal-900/30 hover:from-teal-500 hover:to-cyan-600 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-teal-400/20 text-white py-2 px-6')}
            
            >
                {label}
            </Link>
         )
        )}
    </nav>
  )
}

export default NavItems