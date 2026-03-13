
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className="navbar">
    <Link  href="/">
        <div className="flex items-center gap-2.5 cursor pointer">
         <Image src="/images/logo4.png" alt="logo" width={56} 
         height={56}/>
        </div>
       
    </Link>
         <div className="flex items-center gap-8">
            <NavItems/>
           
        
            
                <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="btn-signin">Sign In</button>
                </SignInButton>
                    </Show>
                <Show when="signed-in">      
                <UserButton />
             </Show>
              
          
        </div>
    </nav>
  )
}

export default Navbar