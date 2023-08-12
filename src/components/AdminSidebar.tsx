'use client';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import {
   BsGearFill,
   BsFillHouseDoorFill,
   BsCarFrontFill,
   BsChevronDown,
   BsFillPersonFill,
} from 'react-icons/bs';

import { MdArticle } from 'react-icons/md';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const [userToggle, setUserToggle] = useState(false);
   const path = usePathname();

   useEffect(() => {
      if (path.includes('cars') || path.includes('brands')) setCarToggle(true);
      if (path.includes('users')) setUserToggle(true);
   }, [path]);

   return (
      <div className='w-[250px] lg:relative z-40 bg-neutral min-h-screen text-neutral-content text-sm pt-[30px] px-7 mt-[60px]'>
         <div className='flex flex-col gap-6 dropdown mt-5'>
            {/* MANAGE DASHBOARD */}
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center ${
                     path === '/dashboard' && 'font-medium text-base-100'
                  } hover:text-base-100 cursor-pointer`}
               >
                  <BsFillHouseDoorFill size={18} />
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
                     className={`flex justify-between items-center hover:text-base-100 ${
                        path.includes('cars') && 'font-medium text-base-100'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <BsCarFrontFill size={18} />
                        <span>Cars</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           carToggle && 'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul
                  className={`mt-2 ml-7 font-light h-auto max-h-auto overflow-hidden ${
                     carToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100 cursor-pointer ${
                        (path.includes('manage-car') ||
                           path.includes('edit-car')) &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/cars/manage-cars'>Manage Cars</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-car') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/cars/add-new-car'>Add New Car</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-brands') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/cars/manage-brands'>Manage Brands</Link>
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
                     className={`flex justify-between items-center hover:text-base-100 ${
                        path.includes('posts') && 'font-medium text-base-100'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <MdArticle size={18} />
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

               <ul
                  className={`mt-2 ml-7 font-light h-auto max-h-auto overflow-hidden ${
                     postToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-posts') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/posts/manage-posts'>Manage Posts</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-post') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/posts/add-new-post'>Add New Post</Link>
                  </li>
               </ul>
            </div>
            {/* MANAGE USER */}
            <div>
               <Link
                  onClick={() => {
                     setUserToggle(!userToggle);
                  }}
                  href='#'
               >
                  <div
                     className={`flex justify-between items-center hover:text-base-100 ${
                        path.includes('user') && 'font-medium text-base-100'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <BsFillPersonFill size={18} />
                        <span>Users</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           userToggle &&
                           'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul
                  className={`mt-2 ml-7 font-light h-auto max-h-auto overflow-hidden ${
                     userToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-users') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/users/manage-users'>Manage Users</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-post') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/users/your-account'>Your Account</Link>
                  </li>
               </ul>
            </div>
            {/* SETTING */}
            <div>
               <Link
                  onClick={() => {
                     setSettingToggle(!settingToggle);
                  }}
                  href='#'
               >
                  <div
                     className={`flex justify-between items-center hover:text-base-100 ${
                        path.includes('settings') && 'font-medium text-base-100'
                     } `}
                  >
                     <div className='flex items-center gap-3'>
                        <BsGearFill size={18} />
                        <span>Settings</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           settingToggle &&
                           'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul
                  className={`mt-2 ml-7 font-light h-auto max-h-auto overflow-hidden ${
                     settingToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('general') && 'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/settings/car-info'>General</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('car-info') && 'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/settings/car-info'>Car info</Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default AdminSidebar;
