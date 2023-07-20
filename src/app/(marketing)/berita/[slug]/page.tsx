/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BsLine, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { BiLogoTelegram } from 'react-icons/bi';
import SocialShare from '@/components/SocialShare';

const page = () => {
   return (
      <div className='mt-[80px]'>
         <div className='max-w-6xl mx-auto py-[70px] px-[10px] lg:px-0 flex flex-col gap-[30px]'>
            <img
               className='w-full border border-gray-400'
               src='/images/featured-post.jpg'
               alt=''
            />
            <div>
               <h2 className='text-4xl font-bold'>
                  Tips Merawat Remote Keyless Mobil
               </h2>
               <p className='text-lg mt-[20px]'>Friday, 30 June 2023 | 15.13</p>
               <p className='mt-[30px]'>
                  Saat ini sudah banyak atau bahkan hampir semua kendaraan baru
                  yang menggunakan remote keyless entry. Keunggulannya adalah
                  lebih simpel, serta kendaraan tidak akan mudah dicuri oleh
                  orang yang berniat jahat. Fasilitas ini sekarang bukan lagi
                  hak eksklusif mobil premium, model entry level sekalipun kini
                  sudah memiliki remote keyless entry.
                  <br />
                  Nah, agar remote keyless entry tetap berfungsi normal dan
                  memudahkan Anda, ada beberapa hal yang harus diperhatikan
                  dalam penggunaannya.
               </p>
               <ul className='list-decimal mt-3 ml-8'>
                  <li>
                     Jangan taruh remote control di tempat yang panas atau
                     terkena sinar matahari langsung, misalnya dashboard mobil.
                  </li>
                  <li>
                     Hindari remote keyless dari air, misalnya hujan atau
                     cipratan air karena bisa menyebabkan korsleting.
                  </li>
                  <li>
                     Usahakan jangan sampai remote keyless jatuh atau terbentur
                     keras.
                  </li>
                  <li>
                     Hindari material yang memancarkan magnet kuat atau
                     elektromagnet.
                     <br />
                     Pasalnya, gelombang ini bisa mempengaruhi komponen internal
                     remote control.
                  </li>
                  <li>
                     Hindari pengoperasian remote keyless entry di dekat menara
                     pemancar. Kondisi ini bisa membuat remote tidak bekerja dan
                     membuat baterai remote control menjadi cepat lemah.
                  </li>
               </ul>
            </div>
            <SocialShare />
         </div>
      </div>
   );
};

export default page;
