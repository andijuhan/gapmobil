'use client';
/* eslint-disable @next/next/no-img-element */
import { BsWhatsapp } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef, useState } from 'react';
import 'swiper/css/bundle';

const SliderProducts = () => {
   const swiperRef = useRef<any>();
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);

   return (
      <div className='flex flex-col lg:flex-row justify-center items-center gap-[30px] lg:gap-[70px]'>
         <div className='flex flex-col gap-3 w-full lg:w-[65%] '>
            <div>
               <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  onSwiper={(swiper) => {
                     swiperRef.current = swiper;
                     swiper.on('slideChange', () => {
                        setActiveSlideIndex(swiper.activeIndex);
                     });
                  }}
               >
                  <SwiperSlide>
                     <div className='border border-gray-300 rounded-[20px] overflow-hidden'>
                        <img src='/images/car-slide-01.webp' alt='' />
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div className='border border-gray-300 rounded-[20px] overflow-hidden'>
                        <img src='/images/car-slide-02.webp' alt='' />
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
            <div className='flex gap-3'>
               <img
                  onClick={() => swiperRef.current.slideTo(0)}
                  className={`w-[70px] rounded-[50px] border cursor-pointer ${
                     activeSlideIndex === 0 && 'brightness-50'
                  }`}
                  src='/images/car-slide-01.webp'
                  alt=''
               />
               <img
                  onClick={() => swiperRef.current.slideTo(1)}
                  className={`w-[70px] rounded-[50px] border cursor-pointer ${
                     activeSlideIndex === 1 && 'brightness-50'
                  }`}
                  src='/images/car-slide-02.webp'
                  alt=''
               />
            </div>
         </div>

         <div className='w-full lg:w-[35%]'>
            <h1 className='text-2xl lg:text-4xl font-bold mb-2'>
               Hyundai Avega 2011
            </h1>
            <p className='text-sm lg:text-base'>125.000 km | MT | Bensin</p>
            <p className='text-xl lg:text-2xl font-bold mt-3 text-[#f7a621]'>
               Rp 68.000.000
            </p>
            <button className='bg-[#0de576] text-white flex gap-2 py-[10px] lg:py-[12px] px-[50px] lg:px-[70px] font-bold rounded-full mt-3 justify-center items-center text-sm lg:text-base'>
               <BsWhatsapp size={15} />
               <p>Hubungi Sales</p>
            </button>
         </div>
      </div>
   );
};

export default SliderProducts;
