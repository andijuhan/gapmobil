'use client';
/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

import 'swiper/css/bundle';

const AboutUs = () => {
   const swiperRef = useRef<any>();

   return (
      <>
         <div>
            <div className='mt-[70px] lg:mt-[80px]'>
               <picture>
                  <source
                     media='(min-width: 840px)'
                     srcSet='/images/about-banner.jpg'
                  />
                  <img src='/images/about-banner-mobile.jpg' alt='' />
               </picture>
            </div>
            <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-[20px] lg:gap-0 py-[80px] px-[20px] lg:px-0'>
               <div className='w-full lg:w-[50%]'>
                  <h1 className='text-xl lg:text-2xl font-bold'>
                     Tentang GAPMOBI
                  </h1>
                  <h2 className='text-2xl lg:text-4xl font-bold mt-4'>
                     Platform Terbaik Jual Beli Mobil.
                  </h2>
               </div>
               <div className='w-full lg:w-[50%]'>
                  <p>
                     GAPMOBIL merupakan platform yang menyediakan solusi
                     terlengkap untuk pembeli mobil baru dan bekas dengan
                     memberikan harga terbaik dan berkualitas untuk anda serta
                     proses yang cepat untuk pembelian cash atau kredit dan
                     cepat dalam proses dokumen kendaraan dan proses kredit.
                  </p>
                  <p className='mt-4'>
                     GAPMOBIL didirikan pada tahun 2020, oleh PT. Wahyu Andy
                     Persada. Dengan tujuan sebagai berikut:
                  </p>
                  <h3 className='mt-4 font-bold'>Visi kami</h3>
                  <p>
                     Meningkatkan perputaran ekonomi Indonesia melalui industry
                     otomotif.
                  </p>
                  <h3 className='mt-4 font-bold'>Misi</h3>
                  <p>
                     Menjadi partner resmi seluruh ATPM/Pabrikan mobil di
                     seluruh Indonesia, meningkatkan penjualan melalui platform
                     digital.
                  </p>
                  <p className='mt-4'>
                     Kami melayani sepenuh hati untuk memberikan pelayanan
                     bermutu untuk kepuasan customer GAPMOBIL demi mendapatkan
                     mobil impiannya.
                  </p>
                  <p className='mt-4'>
                     Kami juga menerima tukar tambah Trade In kendaraan lama
                     anda agar dapat terwujudnya mobil impian anda.
                  </p>
               </div>
            </div>
         </div>

         <div className='bg-[#ebebeb] flex flex-col justify-center items-center pt-[50px] pb-[70px] px-[40px] md:px-[100px] lg:px-0 lg:text-left'>
            <h2 className='text-3xl lg:text-4xl font-bold text-center lg:text-left'>
               Kenapa Transaksi di GAPMOBIL?
            </h2>
            <div className='max-w-6xl grid grid-cols-1 lg:grid-cols-3 lg:gap-20 mt-[50px] text-center lg:text-left md:px-[50px] lg:px-0'>
               <div>
                  <img src='/images/hand-icon.png' alt='' />
                  <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white font-bold mb-3'>
                     1
                  </div>
                  <h3 className='font-bold text-2xl'>Terpercaya.</h3>
                  <p className='text-sm mt-3'>
                     Tak perlu ragu saat bertransaksi. Kami menggunakan berbagai
                     fitur pembayaran agar transaksi Anda aman serta nyaman.
                  </p>
               </div>

               <div>
                  <img src='/images/car-icon.png' alt='' />
                  <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white font-bold mb-3'>
                     2
                  </div>
                  <h3 className='font-bold text-2xl'>
                     Berbagai pilihan terbaik.
                  </h3>
                  <p className='text-sm mt-3'>
                     Sebagai partner resmi kami akan memberikan layanan terbaik,
                     bergaransi, serta terpercaya bagi Anda.
                  </p>
               </div>

               <div>
                  <img src='/images/stand-icon.png' alt='' />
                  <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white font-bold mb-3'>
                     3
                  </div>
                  <h3 className='font-bold text-2xl'>Test Drive.</h3>
                  <p className='text-sm mt-3'>
                     Anda bisa memilih mobil impian yang kami antarkan langsung
                     ke rumah dan mencobanya lewat test drive.
                  </p>
               </div>
            </div>
         </div>

         <div className=' py-[70px] lg:text-left'>
            <div className='max-w-6xl flex flex-col lg:flex-row mx-auto px-[10px] lg:px-0 gap-[60px] lg:gap-0'>
               <div className='w-full lg:w-[50%]'>
                  <h2 className='text-2xl lg:text-3xl font-bold lg:max-w-[440px]'>
                     Lebih dari ribuan pelanggan telah bertransaksi dengan kami.
                  </h2>
               </div>
               <div className='w-full lg:w-[50%]'>
                  <Swiper
                     modules={[Navigation, Pagination, Autoplay]}
                     spaceBetween={0}
                     slidesPerView={1}
                     autoplay
                     onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                     }}
                  >
                     <SwiperSlide>
                        <div className='w-full border border-gray-400 overflow-hidden rounded-[30px]'>
                           <img src='/images/testimoni-1.jpg' alt='' />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className='w-full border border-gray-400 overflow-hidden rounded-[30px]'>
                           <img src='/images/testimoni-2.jpg' alt='' />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className='w-full border border-gray-400 overflow-hidden rounded-[30px]'>
                           <img src='/images/testimoni-3.jpg' alt='' />
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </>
   );
};

export default AboutUs;
