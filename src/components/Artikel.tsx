import React from 'react';
import ArtikelCard from './ArtikelCard';

const Artikel = () => {
   return (
      <div>
         <div className='max-w-6xl mx-auto px-[14px] lg:px-0'>
            <h2 className='text-2xl lg:text-4xl font-bold mb-[30px] text-center'>
               Berita terbaru dari GAPMOBIL.
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
               <ArtikelCard />
               <ArtikelCard />
               <ArtikelCard />
               <ArtikelCard />
            </div>
            <div className='flex justify-center mt-14 mb-14 lg:mt-7'>
               <button className='bg-[#f7a621] px-10 py-3 lg:px-20 lg:py-4 rounded-full mt-5 font-bold text-white'>
                  Lihat Lebih Banyak
               </button>
            </div>
         </div>
      </div>
   );
};

export default Artikel;
