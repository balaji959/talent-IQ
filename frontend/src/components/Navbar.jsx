import { UserButton } from '@clerk/clerk-react';
import { BookOpenIcon, LayoutDashboardIcon, SparkleIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
    const location = useLocation();
    console.log(location.pathname)
    const isActive = (path) => {
        return location.pathname === path;
    }
  return (
    <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* LOGO */}
        <Link
          to="/"
          className='group flex items-center gap-3 hover:scale-105 transition-transform duration-200'
        >
          <div className='size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
            <SparkleIcon className='size-6 text-white'/>
          </div>
          <div className="flex flex-col">
            <span className='font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>Talent IQ</span>
            <span className='text-xs text-base-content/60 font-medium -mt-1'>Code Together</span>
          </div>
        </Link>
<div className='flex items-center gap-1'>
    {/*problem page link*/}
    <Link
      to="/problem"
      className={'px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ("/problem") ? " bg-primary text-primary-content " : " hover:bg-base-200 text-base-content/70 hover:text-base-content "}'

      }
    >
       <div className='flex items-center gap-x-2.5'>
        <BookOpenIcon className='size-4'/>
        <span className='font-medium hidden sm:inline'>Problem</span>

       </div>
      {/*Dashboard page link*/}
    </Link>
    <Link
      to="/dashboard"
      className={'px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive ("/dashboard") ? " bg-primary text-primary-content " : " hover:bg-base-200 text-base-content/70 hover:text-base-content "}'

      }
    >
       <div className='flex items-center gap-x-2.5'>
        <LayoutDashboardIcon className='size-3'/>
        <span className='font-medium hidden sm:inline '>Dashboard</span>

       </div>
      
    </Link>
<div className='ml-4 mt-2'>
    <UserButton/>
</div>

</div>




      </div>
    </nav>
  )
}

export default Navbar