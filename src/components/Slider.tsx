'use client';
/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/css/bundle';

const Slider = () => {
   const swiperRef = useRef<any>();

   return (
      <div className='w-full mt-[60px] lg:mt-[80px]'>
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
               <picture>
                  <source
                     media='(min-width: 840px)'
                     srcSet='/images/slider-1.jpg'
                  />
                  <img src='/images/slider-1-mobile.jpg' alt='' />
               </picture>
            </SwiperSlide>
            <SwiperSlide>
               <picture>
                  <source
                     media='(min-width: 840px)'
                     srcSet='/images/slider-2.jpg'
                  />
                  <img src='/images/slider-2-mobile.jpg' alt='' />
               </picture>
            </SwiperSlide>
            <SwiperSlide>
               <picture>
                  <source
                     media='(min-width: 840px)'
                     srcSet='/images/slider-3.jpg'
                  />
                  <img src='/images/slider-3-mobile.jpg' alt='' />
               </picture>
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default Slider;
