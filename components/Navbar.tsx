import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignInButton, UserButton, Show } from '@clerk/nextjs'

const Navbar = () => {
  return (
    // Added: h-20, border-b, and backdrop-blur for the "classy" feel
    <nav className="flex items-center justify-between px-8 h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <Image 
            src="/images/logo4.png" 
            alt="logo" 
            width={100} 
            height={100}
            className="rounded-xl" 
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavItems />
        
        {/* Reverted to your exact "Show" logic */}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="bg-white text-black text-sm font-semibold py-2 px-6 rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
    </nav>
  )
}

export default Navbar;