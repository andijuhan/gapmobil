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
      if (path.includes('posts')) setPostToggle(true);
   }, [path]);

   return (
      <div className='w-[250px] lg:relative z-40 bg-gray-600 min-h-screen text-neutral-content pt-[30px] px-7 mt-[60px]'>
         <div className='flex flex-col gap-6 dropdown mt-5'>
            {/* MANAGE DASHBOARD */}
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center ${
                     path === '/dashboard' && 'font-medium text-base-100'
                  } hover:text-base-100 cursor-pointer`}
               >
                  <BsFillHouseDoorFill size={18} />
                  <span>Dasbor</span>
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
                        <span>Mobil</span>
                     </div>
                     <BsChevronDown
                        className={` ${
                           carToggle && 'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul
                  className={`mt-2 ml-7 h-auto max-h-auto overflow-hidden ${
                     carToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100 cursor-pointer ${
                        (path.includes('manage-car') ||
                           path.includes('edit-car')) &&
                        'text-base-100'
                     }`}
                  >
                     <Link href='/cars/manage-cars'>Kelola mobil</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-car') && 'text-base-100'
                     }`}
                  >
                     <Link href='/cars/add-new-car'>Tambah mobil</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-brands') && 'text-base-100'
                     }`}
                  >
                     <Link href='/cars/manage-brands'>Kelola merek</Link>
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
                        <span>Artikel</span>
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
                  className={`mt-2 ml-7 h-auto max-h-auto overflow-hidden ${
                     postToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-posts') && 'text-base-100'
                     }`}
                  >
                     <Link href='/posts/manage-posts'>Kelola artikel</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-post') && 'text-base-100'
                     }`}
                  >
                     <Link href='/posts/add-new-post'>Tambah artikel</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('category') && 'text-base-100'
                     }`}
                  >
                     <Link href='/posts/category'>Kelola kategori</Link>
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
                        <span>Pengguna</span>
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
                  className={`mt-2 ml-7 h-auto max-h-auto overflow-hidden ${
                     userToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('manage-users') && 'text-base-100'
                     }`}
                  >
                     <Link href='/users/manage-users'>Kelola pengguna</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('add-new-post') && 'text-base-100'
                     }`}
                  >
                     <Link href='/users/your-account'>Akun Anda</Link>
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
                        <span>Pengaturan</span>
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
                  className={`mt-2 ml-7 h-auto max-h-auto overflow-hidden ${
                     settingToggle
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                  } transition-all duration-500 ease-in-out`}
               >
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('general') && 'text-base-100'
                     }`}
                  >
                     <Link href='/settings/general'>Umum</Link>
                  </li>
                  <li
                     className={`py-2 hover:text-base-100  cursor-pointer ${
                        path.includes('car-info') && 'text-base-100'
                     }`}
                  >
                     <Link href='/settings/appearance'>Tampilan</Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default AdminSidebar;
