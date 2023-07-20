/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const page = () => {
   return (
      <div className='mt-[80px]'>
         <div className='max-w-6xl mx-auto py-[70px] px-[10px] lg:px-0'>
            <h1 className='text-2xl text-center lg:text-left lg:text-4xl font-bold'>
               Artikel.
            </h1>
            <div className='flex flex-col lg:flex-row mt-[40px] gap-[50px] lg:gap-[80px]'>
               <div className='w-full lg:w-[65%]'>
                  <img
                     className='border border-gray-400'
                     src='/images/featured-post.jpg'
                     alt=''
                  />
                  <Link href='/berita/tes'>
                     <h2 className='text-2xl lg:text-4xl font-bold mt-[30px]'>
                        Tips Merawat Remote Keyless Mobil
                     </h2>
                  </Link>

                  <p className='text-lg mt-[20px] mb-[20px]'>
                     Friday, 30 June 2023 | 15.13
                  </p>
                  <button className='bg-[#f7a621] text-white text-sm px-8 py-3 lg:px-20 lg:py-4 rounded-full font-bold'>
                     Baca Selengkapnya
                  </button>
               </div>
               <div className='w-full lg:w-[35%] flex flex-col gap-5'>
                  <div className='border-b border-b-gray-300'>
                     <Link href='/berita/tes'>
                        <h3 className='text-2xl font-bold'>
                           5 Cara Merawat Wiper Mobil
                        </h3>
                     </Link>

                     <p className='text-lg mt-[10px] mb-[30px]'>
                        Monday, 26 June 2023 | 06.36
                     </p>
                  </div>

                  <div className='border-b border-b-gray-300'>
                     <h3 className='text-2xl font-bold'>
                        Tips Cegah Mobil Terbakar Akibat Korslet
                     </h3>
                     <p className='text-lg mt-[10px] mb-[30px]'>
                        Friday, 23 June 2023 | 12.04
                     </p>
                  </div>

                  <div className='border-b border-b-gray-300'>
                     <h3 className='text-2xl font-bold'>
                        5 Tips Merawat Sunroof Mobil
                     </h3>
                     <p className='text-lg mt-[10px] mb-[30px]'>
                        Monday, 12 June 2023 | 14.44
                     </p>
                  </div>

                  <div className='border-b border-b-gray-300'>
                     <h3 className='text-2xl font-bold'>
                        Penyebab dan Cara Mengatasi Kampas Kopling Selip
                     </h3>
                     <p className='text-lg mt-[10px] mb-[30px]'>
                        Saturday, 27 May 2023 | 11.20
                     </p>
                  </div>
               </div>
            </div>
            <div className='flex items-center justify-center gap-4 mt-[60px] text-sm md:text-base'>
               <p>Halaman ke </p>
               <select
                  className='p-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  name=''
                  id=''
               >
                  <option value=''>1</option>
                  <option value=''>2</option>
                  <option value=''>3</option>
               </select>
               <p>dari 5</p>
            </div>
         </div>
      </div>
   );
};

export default page;
