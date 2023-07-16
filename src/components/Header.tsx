/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
   return (
      <div className='w-full bg-black py-[10px] px-[10px] lg:px-0 lg:py-[17px] text-white fixed left-0 top-0 z-10'>
         <div className='max-w-6xl mx-auto flex justify-between items-center'>
            <div>
               <img
                  className='w-[200px]'
                  src='/images/gap-mobil-logo.png'
                  alt=''
               />
            </div>
            <div className='lg:hidden'>
               <AiOutlineMenu size={30} />
            </div>
            <div className='hidden lg:flex gap-10 text-xl font-semibold'>
               <Link href='/'>Beranda</Link>
               <Link href='/'>Beli Mobil</Link>
               <Link href='/tentang-kami'>Tentang Kami</Link>
               <Link href='/'>Artikel</Link>
               <Link href='/'>Hubungi Kami</Link>
            </div>
         </div>
      </div>
   );
};

export default Header;
