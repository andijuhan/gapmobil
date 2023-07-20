'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { usePathname } from 'next/navigation';

const Header = () => {
   const [toggle, setToggle] = useState(false);

   const path = usePathname();

   useEffect(() => {
      setToggle(false);
   }, [path]);

   return (
      <div className='w-full bg-black py-[10px] px-[10px] lg:px-0 lg:py-[17px] text-white fixed left-0 top-0 z-10'>
         <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <div>
               <Link href='/'>
                  <img
                     className='w-[200px]'
                     src='/images/gap-mobil-logo.png'
                     alt=''
                  />
               </Link>
            </div>
            <div className='lg:hidden' onClick={() => setToggle(true)}>
               <AiOutlineMenu size={30} />
            </div>
            <div className='hidden lg:flex gap-10 text-lg font-bold'>
               <Link href='/'>Beranda</Link>
               <Link href='/beli-mobil'>Beli Mobil</Link>
               <Link href='/tentang-kami'>Tentang Kami</Link>
               <Link href='/berita'>Artikel</Link>
               <Link href='/hubungi-kami'>Hubungi Kami</Link>
            </div>
         </div>
         <div
            className={`lg:hidden h-screen bg-black inset-0 z-50 fixed ${
               toggle ? '' : 'translate-x-[100vw]'
            } transition-all duration-300`}
         >
            <div
               className='flex justify-end p-4'
               onClick={() => setToggle(false)}
            >
               <img className='w-[40px]' src='/images/close.png' alt='' />
            </div>
            <div className='h-[85%] flex flex-col justify-between items-center'>
               <ul className='text-white font-bold text-lg space-y-9 mt-[40px] text-center'>
                  <li>
                     <Link href='/'>Beranda</Link>
                  </li>
                  <li>
                     <Link href='/beli-mobil'>Beli Mobil</Link>
                  </li>
                  <li>
                     <Link href='/tentang-kami'>Tentang Kami</Link>
                  </li>
                  <li>
                     <Link href='/berita'>Artikel</Link>
                  </li>
                  <li>
                     <Link href='/hubungi-kami'>Hubungi Kami</Link>
                  </li>
               </ul>
               <div className=''>
                  <img
                     className='w-[200px]'
                     src='/images/gap-mobil-logo.png'
                     alt=''
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
