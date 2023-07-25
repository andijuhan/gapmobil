'use client';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import {
   AiOutlineDashboard,
   AiOutlineCar,
   AiOutlineEdit,
} from 'react-icons/ai';
import { BsGear } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import { BsChevronDown } from 'react-icons/bs';

const AdminSidebar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const path = usePathname();

   return (
      <div className='fixed lg:relative z-40 w-[50vw] lg:w-[250px] bg-gray-800 min-h-screen text-slate-400 py-4 px-7'>
         <div className='py-3 mb-[30px]'>
            <h1 className='text-xl font-medium text-white'>Admin Panel</h1>
         </div>

         <div className='flex flex-col gap-5 dropdown text-base'>
            {/* MANAGE DASHBOARD */}
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center ${
                     path === '/dashboard' && 'font-medium text-white'
                  } hover:font-medium cursor-pointer`}
               >
                  <AiOutlineDashboard size={15} />
                  <span>Dashboard</span>
               </div>
            </Link>
            {/* MANAGE CAR */}
            <div>
               <Link
                  onClick={() => {
                     setCarToggle(!carToggle);
                  }}
                  href='#'
               >
                  <div
                     className={`flex justify-between items-center hover:font-medium ${
                        path.includes('cars') && 'font-medium text-white'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <AiOutlineCar size={15} />
                        <span>Cars</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           carToggle && 'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul className={`mt-2 ml-4 ${!carToggle && 'hidden'}`}>
                  <li
                     className={`p-2 hover:font-medium  cursor-pointer ${
                        path.includes('manage-car') && 'text-white font-medium'
                     }`}
                  >
                     <Link href='/cars/manage-cars'>Manage Cars</Link>
                  </li>
                  <li
                     className={`p-2 hover:font-medium  cursor-pointer ${
                        path.includes('add-new-car') && 'text-white font-medium'
                     }`}
                  >
                     <Link href='/cars/add-new-car'>Add New Car</Link>
                  </li>
               </ul>
            </div>
            {/* MANAGE POST */}
            <div>
               <Link
                  onClick={() => {
                     setPostToggle(!postToggle);
                  }}
                  href='#'
               >
                  <div
                     className={`flex justify-between items-center hover:font-medium ${
                        path.includes('posts') && 'font-medium text-white'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <AiOutlineEdit size={15} />
                        <span>Posts</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           postToggle &&
                           'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul className={`mt-2 ml-4 ${!postToggle && 'hidden'}`}>
                  <li
                     className={`p-2 hover:font-medium  cursor-pointer ${
                        path.includes('manage-posts') &&
                        'text-white font-medium'
                     }`}
                  >
                     <Link href='/posts/manage-posts'>Manage Posts</Link>
                  </li>
                  <li
                     className={`p-2 hover:font-medium  cursor-pointer ${
                        path.includes('add-new-post') &&
                        'text-white font-medium'
                     }`}
                  >
                     <Link href='/posts/add-new-post'>Add New Post</Link>
                  </li>
               </ul>
            </div>
            {/* SETTING */}
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center ${
                     path === '/dashboard' && 'font-medium text-white'
                  } hover:font-medium cursor-pointer`}
               >
                  <BsGear size={15} />
                  <span>Setting</span>
               </div>
            </Link>
         </div>
      </div>
   );
};

export default AdminSidebar;
