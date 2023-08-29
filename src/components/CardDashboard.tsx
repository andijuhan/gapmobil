'use client';
import React, { useEffect, useState } from 'react';
import { BsCarFrontFill } from 'react-icons/bs';
import { MdArticle } from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { useGeneralSetting } from '@/hooks/useStore';

const CardDashboard = () => {
   const { title: siteTitle } = useGeneralSetting();
   const [totalCar, setTotalCar] = useState<number>(0);
   const [totalPost, setTotalPost] = useState<number>(0);
   const [totalUser, setTotalUser] = useState<number>(0);

   useEffect(() => {
      document.title = 'Dashboard - ' + siteTitle;
   }, [siteTitle]);

   useEffect(() => {
      const getDashboardData = async () => {
         const response = await fetch('/api/dashboard');
         const data = await response.json();
         if (response.ok) {
            setTotalCar(data?.totalCar);
            setTotalPost(data?.totalPost);
            setTotalUser(data?.totalUser);
         }
      };
      getDashboardData();
   }, []);

   return (
      <div className='grid grid-cols-3 grid-rows-1 gap-5'>
         <div className='flex gap-5 justify-between items-center shadow-md rounded-md p-4 bg-blue-500 text-white'>
            <div className='flex flex-col gap-5'>
               <span className='text-2xl font-bold'>{totalCar}</span>
               <span className='text-xl font-semibold'>Total Mobil</span>
            </div>
            <BsCarFrontFill size={60} />
         </div>
         <div className='flex gap-5 justify-between items-center shadow-md rounded-md p-4 bg-green-500 text-white'>
            <div className='flex flex-col gap-5'>
               <span className='text-2xl font-bold'>{totalPost}</span>
               <span className='text-xl font-semibold'>Total Artikel</span>
            </div>
            <MdArticle size={60} />
         </div>
         <div className='flex gap-5 justify-between items-center shadow-md rounded-md p-4 bg-red-500 text-white'>
            <div className='flex flex-col gap-5'>
               <span className='text-2xl font-bold'>{totalUser}</span>
               <span className='text-xl font-semibold'>Total Pengguna</span>
            </div>
            <FaUserGroup size={60} />
         </div>
      </div>
   );
};

export default CardDashboard;
