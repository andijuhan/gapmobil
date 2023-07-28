'use client';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import {
   BsGearFill,
   BsFillHouseDoorFill,
   BsCarFrontFill,
   BsPencilFill,
   BsChevronDown,
} from 'react-icons/bs';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const path = usePathname();

   return (
      <div className='fixed lg:relative z-40 w-[50vw] lg:w-[250px] bg-neutral min-h-screen text-neutral-content pt-[30px] px-7 mt-[60px]'>
         <div className='flex flex-col gap-6 dropdown text-base mt-5'>
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

               <ul className={`mt-2 ml-5 font-light ${!carToggle && 'hidden'}`}>
                  <li
                     className={`p-2 hover:text-base-100 cursor-pointer ${
                        (path.includes('manage-car') ||
                           path.includes('edit-car')) &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/cars/manage-cars'>Manage Cars</Link>
                  </li>
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-car') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/cars/add-new-car'>Add New Car</Link>
                  </li>
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-car-brand') &&
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
                        <BsPencilFill size={18} />
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
                  className={`mt-2 ml-5 font-light ${!postToggle && 'hidden'}`}
               >
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-posts') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/posts/manage-posts'>Manage Posts</Link>
                  </li>
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-post') &&
                        'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/posts/add-new-post'>Add New Post</Link>
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
                  className={`mt-2 ml-5 font-light ${
                     !settingToggle && 'hidden'
                  }`}
               >
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
                        path.includes('general') && 'text-base-100 font-medium'
                     }`}
                  >
                     <Link href='/settings/car-info'>General</Link>
                  </li>
                  <li
                     className={`p-2 hover:text-base-100  cursor-pointer ${
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
