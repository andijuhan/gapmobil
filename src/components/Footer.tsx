/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { BsInstagram, BsTiktok, BsFacebook } from 'react-icons/bs';

const Footer = () => {
   return (
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
               <Link href='/'>Beli Mobil</Link>
               <Link href='/'>Tentang Kami</Link>
               <Link href='/'>Artikel</Link>
               <Link href='/'>Hubungi Kami</Link>
            </div>
         </div>
         <div className='border-b border-b-gray-600 mt-[30px]'></div>
         <div className='max-w-6xl mx-auto px-[20px] lg:px-0 mt-[20px] pb-[20px] text-gray-400 text-xs'>
            <p>
               Hubungi <span className='text-blue-600'>0818 7555 88</span> untuk
               cara berbelanja
            </p>
            <p className='mt-1'>© 2023 GAPMOBIL. Dilindungi oleh hak cipta.</p>
         </div>
      </div>
   );
};

export default Footer;
