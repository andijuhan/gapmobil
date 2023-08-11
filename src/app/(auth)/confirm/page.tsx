'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
   const searchParam = useSearchParams();
   const token = searchParam.get('token');
   const router = useRouter();
   const [message, setMessage] = useState('');

   useEffect(() => {
      const emailChangeConfirm = async () => {
         const response = await fetch(`/api/users/confirm?token=${token}`);
         if (response.ok) {
            router.push('/users/your-account');
            setMessage('email berhasil dirubah');
         }
         if (!response.ok) {
            router.push('/users/your-account');
            setMessage('gagal merubah email');
         }
      };
      emailChangeConfirm();
   }, [token]);

   return (
      <div className='flex justify-center items-center capitalize mt-[20px]'>
         {message}
      </div>
   );
};

export default page;
