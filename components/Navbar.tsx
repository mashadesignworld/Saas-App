"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignInButton, UserButton, Show } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react' // Install lucide-react if you haven't

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-8 h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo: Always Visible */}
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <Image 
            src="/images/logo4.png" 
            alt="logo"  
            width={110} 
            height={110}
            className="rounded-xl w-auto h-auto" 
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <NavItems />
        
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="bg-white text-black text-sm font-semibold py-2 px-6 rounded-full hover:bg-slate-200 transition-all">
              Sign In
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">      
          <div className="border border-white/10 p-1 rounded-full bg-white/5">
            <UserButton />
          </div>
        </Show>
      </div>

      {/* Mobile Controls (Hamburger + UserButton) */}
      <div className="flex md:hidden items-center gap-4">
        <Show when="signed-in">      
           <UserButton />
        </Show>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#050505] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300">
          <NavItems isMobile />
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="w-full bg-white text-black py-3 rounded-full font-semibold">
                Sign In
              </button>
            </SignInButton>
          </Show>
        </div>
      )}
    </nav>
  )
}

export default Navbar;