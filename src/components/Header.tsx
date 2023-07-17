/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
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
            <div className='lg:hidden'>
               <AiOutlineMenu size={30} />
            </div>
            <div className='hidden lg:flex gap-10 text-lg font-bold'>
               <Link href='/'>Beranda</Link>
               <Link href='/beli-mobil'>Beli Mobil</Link>
               <Link href='/tentang-kami'>Tentang Kami</Link>
               <Link href='/artikel'>Artikel</Link>
               <Link href='/hubungi-kami'>Hubungi Kami</Link>
            </div>
         </div>
      </div>
   );
};

export default Header;