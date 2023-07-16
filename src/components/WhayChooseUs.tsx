/* eslint-disable @next/next/no-img-element */
import React from 'react';

const WhayChooseUs = () => {
   return (
      <div className='mt-[100px] bg-[#ebebeb] flex flex-col justify-center items-center py-[50px] px-[40px] md:px-[100px] lg:px-0 lg:text-left'>
         <h2 className='text-3xl lg:text-4xl font-bold text-center lg:text-left'>
            Kenapa Transaksi di GAPMOBIL?
         </h2>
         <div className='max-w-6xl grid grid-cols-1 lg:grid-cols-4 lg:gap-20 mt-[50px] text-center lg:text-left md:px-[50px] lg:px-0'>
            <div>
               <img src='/images/hand-icon.png' alt='' />
               <h3 className='font-bold text-2xl'>
                  DP Ringan, Bunga & Harga Termurah
               </h3>
               <p className='text-sm mt-3'>
                  Kami memberikan kemudahan setiap orang untuk memiliki mobil
                  impian, Dengan DP mulai dari 10Jtan, dan potongan harga yang
                  besar.
               </p>
            </div>

            <div>
               <img src='/images/car-icon.png' alt='' />
               <h3 className='font-bold text-2xl'>Proses Kredit Cepat</h3>
               <p className='text-sm mt-3'>
                  GAPMOBIL telah terintegrasi dengan leasing-leasing besar di
                  seluruh Indonesia yang membuat proses kredit lebih cepat.
               </p>
            </div>

            <div>
               <img src='/images/stand-icon.png' alt='' />
               <h3 className='font-bold text-2xl'>STNK Kurang Dari 1 Minggu</h3>
               <p className='text-sm mt-3'>
                  Kami memberikan garansi proses pengurusan STNK kendaraan baru
                  anda selesai dibawah 7 Hari.
               </p>
            </div>

            <div>
               <img src='/images/hand-icon.png' alt='' />
               <h3 className='font-bold text-2xl'>
                  Lulus inspeksi otospector dan bergaransi
               </h3>
               <p className='text-sm mt-3'>
                  Kami memberikan jaminan mobil telah lulus inspeksi otospector
                  dan bergaransi
               </p>
            </div>
         </div>
      </div>
   );
};

export default WhayChooseUs;
