/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { BsInstagram, BsTiktok, BsFacebook } from 'react-icons/bs';

const Footer = () => {
   return (
      <>
         <div className='bg-black pt-[80px]'>
            <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-5 px-[20px] lg:px-0'>
               <div className='w-[220px]'>
                  <img src='/images/gap-mobil-logo.png' alt='' />
               </div>
               <div className='max-w-[400px]'>
                  <p className='text-gray-400'>
                     Memberikan harga terbaik mobil terbaik dan mobil yang
                     berkualitas untuk Anda.
                  </p>
               </div>
               <div className='text-gray-400 flex gap-3'>
                  <BsInstagram size={30} />
                  <BsTiktok size={30} />
                  <BsFacebook size={30} />
               </div>
               <div className='text-white font-bold flex flex-col gap-1 w-[200px]'>
                  <Link href='/'>Beranda</Link>
                  <Link href='/beli-mobil'>Beli Mobil</Link>
                  <Link href='/tentang-kami'>Tentang Kami</Link>
                  <Link href='/berita'>Artikel</Link>
                  <Link href='/hubungi-kami'>Hubungi Kami</Link>
               </div>
            </div>
            <div className='border-b border-b-gray-600 mt-[30px]'></div>
            <div className='max-w-6xl mx-auto px-[20px] lg:px-0 mt-[20px] pb-[20px] text-gray-400 text-xs'>
               <p>
                  Hubungi <span className='text-blue-600'>0818 7555 88</span>{' '}
                  untuk cara berbelanja
               </p>
               <p className='mt-1'>
                  © 2023 GAPMOBIL. Dilindungi oleh hak cipta.
               </p>
            </div>
         </div>
         <div className='flex flex-col gap-[10px] fixed right-[10px] bottom-[10px]'>
            <Link target='_blank' href='https://www.instagram.com/gapmobil/'>
               <img
                  className='w-[75px] h-[75px] drop-shadow-lg'
                  src='/images/ig.png'
                  alt=''
               />
            </Link>

            <Link
               target='_blank'
               href='https://api.whatsapp.com/send/?phone=62818755588&text&type=phone_number&app_absent=0'
            >
               <img
                  className='w-[75px] h-[75px] drop-shadow-lg'
                  src='/images/wa.png'
                  alt=''
               />
            </Link>
         </div>
      </>
   );
};

export default Footer;
