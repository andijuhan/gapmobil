/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';

const ArtikelCard = () => {
   return (
      <div className='border rounded-[20px] border-gray-300 overflow-hidden flex flex-col gap-4'>
         <img
            className='w-full object-cover object-center'
            src='/images/card-image-1.jpg'
            alt=''
         />
         <div className='px-5 flex flex-col gap-2'>
            <span className='font-bold'>REVIEW</span>
            <h3 className='text-lg font-bold'>
               Tips Merawat Remote Keyless Mobil
            </h3>
            <p className='mt-3 text-sm'>
               Saat ini sudah banyak atau bahkan hampir semua kendaraan baru
               yang menggunakan remote keyless entry....
            </p>
            <div className='flex items-center text-red-500 mt-2 mb-6'>
               <div>
                  <Link className='font-bold text-sm' href='/'>
                     Baca Selengkapnya
                  </Link>
               </div>
               <BiChevronRight size={20} />
            </div>
         </div>
      </div>
   );
};

export default ArtikelCard;
