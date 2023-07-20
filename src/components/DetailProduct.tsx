'use client';
import { useState } from 'react';

const DetailProduct = () => {
   const [tab, setTab] = useState(false);
   return (
      <div className='mb-[40px]'>
         <div className='mt-[40px] rounded-[10px] overflow-hidden border border-gray-300'>
            <div className='flex gap-[40px] font-bold bg-gray-300 py-3 pl-7'>
               <button
                  onClick={() => setTab(false)}
                  className={`${tab && 'text-gray-500'}`}
               >
                  Detail
               </button>
               <button
                  onClick={() => setTab(true)}
                  className={`${!tab && 'text-gray-500'}`}
               >
                  Kelengkapan
               </button>
            </div>
            {!tab ? (
               <div className='grid grid-cols-2 lg:grid-cols-4 p-[30px]'>
                  <ul className='space-y-3 text-sm lg:text-base'>
                     <li>Jarak Tempuh</li>
                     <li>Tipe Registrasi</li>
                     <li>Transmisi</li>
                     <li>Garansi</li>
                     <li>Bahan Bakar</li>
                     <li>Tangan ke-</li>
                  </ul>

                  <ul className='space-y-3 font-bold text-sm lg:text-base'>
                     <li>125.000 km</li>
                     <li>-</li>
                     <li>MT</li>
                     <li>Ya</li>
                     <li>Bensin</li>
                     <li>0</li>
                  </ul>

                  <ul className='space-y-3 text-sm lg:text-base'>
                     <li>Tempat Duduk</li>
                     <li>Warna</li>
                     <li>Tanggal Registrasi</li>
                     <li>Masa Berlaku STNK</li>
                     <li>Status Odometer</li>
                  </ul>

                  <ul className='space-y-3 font-bold text-sm lg:text-base'>
                     <li>125.000 km</li>
                     <li>-</li>
                     <li>MT</li>
                     <li>Ya</li>
                     <li>Bensin</li>
                  </ul>
               </div>
            ) : (
               <div className='grid grid-cols-2 lg:grid-cols-4 p-[30px]'>
                  <ul className='space-y-3 text-sm lg:text-base'>
                     <li>Jumlah Kunci</li>
                     <li>Tool Kit</li>
                     <li>Buku Servis</li>
                     <li>Buku Panduan</li>
                     <li>Dongkrak</li>
                  </ul>

                  <ul className='space-y-3 font-bold text-sm lg:text-base'>
                     <li>0</li>
                     <li>Ya</li>
                     <li>Ya</li>
                     <li>Ya</li>
                     <li>Ya</li>
                  </ul>
               </div>
            )}
         </div>

         <div className='mt-[40px] rounded-[10px] overflow-hidden border border-gray-300'>
            <div className='flex gap-[40px] font-bold bg-gray-300 py-3 pl-7'>
               <button>Data Modifikasi</button>
            </div>
            <div className='p-[30px] text-sm lg:text-base'>
               <p>Hyundai Avega GX manual 2011</p>
            </div>
         </div>
      </div>
   );
};

export default DetailProduct;
