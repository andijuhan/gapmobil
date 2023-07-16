import Link from 'next/link';
import React from 'react';

const AboutUs = () => {
   return (
      <div
         style={{ backgroundImage: `url('/images/background.jpg')` }}
         className='py-[120px] bg-center bg-cover'
      >
         <div className='max-w-6xl mx-auto text-white flex flex-col lg:flex-row gap-10 lg:gap-[200px] px-[30px] lg:px-0'>
            <div className='text-center lg:text-left'>
               <h2 className='text-xl lg:text-2xl font-bold'>
                  Tentang GAPMOBIL
               </h2>
               <h3 className='font-bold text-2xl lg:text-4xl mt-5'>
                  Platform Terbaik Jual Beli Mobil.
               </h3>
            </div>
            <div className='text-center lg:text-left'>
               <p className='lgtext-lg font-medium'>
                  Memberikan harga terbaik mobil terbaik dan mobil yang
                  berkualitas untuk Anda.
               </p>
               <Link href='/tentang-kami'>
                  <button className='bg-[#f7a621] px-10 py-3 lg:px-20 lg:py-4 rounded-full mt-5 font-bold'>
                     Baca Selengkapnya
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
