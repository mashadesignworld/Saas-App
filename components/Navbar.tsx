"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NavItems from './NavItems'
import { SignInButton, UserButton, Show } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 md:px-12 h-20 flex items-center",
      scrolled 
        ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* SomaAI Logo - Moonchild Style */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg bg-[#2B82F6] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
             <span className="text-white font-black text-xl">S</span>
             {/* Subtle Glow behind icon */}
             <div className="absolute inset-0 bg-[#2B82F6] blur-lg opacity-20 -z-10" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase">
            Soma<span className="text-[#2B82F6]">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavItems />
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-[#2B82F6] text-white text-xs font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                Sign Up
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">      
            <div className="flex items-center gap-4">
              <Link href="/companions/new" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#2B82F6] transition-colors">
                + Create
              </Link>
              <div className="h-8 w-[1px] bg-white/10 mx-2" />
              <div className="p-0.5 rounded-full border border-white/10 hover:border-[#2B82F6]/50 transition-colors">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </Show>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 bg-[#0A0A0A] z-40 p-8 flex flex-col gap-8 md:hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Navigation</p>
            <NavItems isMobile />
          </div>
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="w-full bg-[#2B82F6] text-white py-5 rounded-2xl font-bold text-lg">
                Get Started Now
              </button>
            </SignInButton>
          </Show>
        </div>
      )}
    </nav>
  )
}

export default Navbar;