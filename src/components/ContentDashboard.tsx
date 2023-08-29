'use client';
import { useUser } from '@/hooks/useStore';
import Link from 'next/link';
import React from 'react';

const ContentDashboard = () => {
   const { username } = useUser();

   return (
      <div>
         <h1 className='text-2xl font-semibold mb-5'>
            Selamat datang <span className='capitalize'>{username}</span>
         </h1>
         <p>
            Ini adalah halaman portal admin panel. Anda dapat mengelola mobil,
            artikel, pengguna, memperbarui informasi Akun, dan memperbarui
            pengaturan website.
         </p>
         <h2 className='text-xl font-semibold mt-5 mb-5'>Tutorial</h2>
         <div className='w-max'>
            <Link
               href='https://www.youtube.com/watch?v=a3ICNMQW7Ok&pp=ygUMc2FtcGxlIHZpZGVv'
               target='_blank'
            >
               <h3 className='text-lg font-medium text-blue-600 hover:text-blue-500'>
                  Cara posting mobil
               </h3>
            </Link>
            <Link
               href='https://www.youtube.com/watch?v=a3ICNMQW7Ok&pp=ygUMc2FtcGxlIHZpZGVv'
               target='_blank'
            >
               <h3 className='text-lg font-medium text-blue-600 hover:text-blue-500'>
                  Cara posting artikel
               </h3>
            </Link>
         </div>
      </div>
   );
};

export default ContentDashboard;
