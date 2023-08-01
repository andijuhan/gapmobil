'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdLogout } from 'react-icons/md';

const AdminNavbar = () => {
   const router = useRouter();
   const [showDropDown, setShowDropDown] = useState(false);

   const handleLougout = async () => {
      const response = await fetch('/api/auth/logout');
      if (response.ok) {
         router.push('/auth');
      }
   };
   return (
      <div className='navbar bg-primary text-neutral-content shadow-sm fixed z-20'>
         <div className='flex-none'>
            <button className='btn btn-square btn-ghost'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-5 h-5 stroke-current'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M4 6h16M4 12h16M4 18h16'
                  ></path>
               </svg>
            </button>
         </div>
         <div className='flex-1'>
            <a className='btn btn-ghost normal-case text-xl'>Dinamotor</a>
         </div>
         <div className='flex-none relative'>
            <button
               onClick={() => setShowDropDown(!showDropDown)}
               className='btn btn-square btn-ghost dropdown'
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-5 h-5 stroke-current'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                  ></path>
               </svg>
            </button>
            <div
               className={`flex absolute top-10 right-5 bg-base-100 text-neutral px-10 py-4 rounded-lg shadow-lg ${
                  showDropDown ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
               } transition-all duration-200`}
            >
               <button
                  className='flex items-center gap-2'
                  onClick={handleLougout}
               >
                  Logout <MdLogout />
               </button>
            </div>
         </div>
      </div>
   );
};

export default AdminNavbar;
