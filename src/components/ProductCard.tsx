/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const ProductCard = () => {
   return (
      <Link href='/beli-mobil/tes'>
         <div className='border border-gray-400 rounded-[30px] overflow-hidden flex flex-col justify-center'>
            <img
               className='max-h-[200px] object-cover object-center'
               src='/images/mobil.webp'
               alt=''
            />
            <div className='px-[30px] pb-[30px]'>
               <h3 className='text-2xl font-bold pt-[20px]'>
                  Hyundai Avega 2011
               </h3>
               <p className='mt-[30px]'>125.000 km | MT | Bensin</p>
               <p className='text-[#f7a621] font-bold text-lg'>Rp 68.000.000</p>
            </div>
         </div>
      </Link>
   );
};

export default ProductCard;
