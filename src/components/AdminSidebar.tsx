'use client';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import {
   AiOutlineDashboard,
   AiOutlineCar,
   AiOutlineEdit,
   AiFillCaretDown,
} from 'react-icons/ai';
import { BsGear } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const path = usePathname();

   return (
      <div className='w-[70px] lg:w-[220px] bg-slate-900 min-h-screen text-white font-semibold px-2 lg:px-[30px]'>
         <div className='mt-[30px] mb-[40px]'>
            <img className='mx-auto' src='/images/admin-logo.svg' alt='' />
         </div>
         <div className='border-b mb-[20px] border-slate-500'></div>

         <div className='flex flex-col gap-3 dropdown'>
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center rounded-[10px] py-2 px-3 ${
                     path === '/dashboard' && 'bg-violet-700'
                  } hover:bg-violet-700 cursor-pointer`}
               >
                  <AiOutlineDashboard size={20} />
                  <span className='hidden lg:block'>Dashboard</span>
               </div>
            </Link>

            <div className='relative'>
               <Link
                  onClick={() => {
                     setCarToggle(!carToggle);
                     setPostToggle(false);
                     setSettingToggle(false);
                  }}
                  href='#'
               >
                  <div
                     className={`flex gap-3 items-center ${
                        path.includes('cars') && 'bg-violet-700'
                     } hover:bg-violet-700 rounded-[10px] py-2 px-3`}
                  >
                     <AiOutlineCar size={20} />
                     <span className='hidden lg:block'>Cars</span>
                     <AiFillCaretDown
                        className={`hidden lg:block ${
                           carToggle && 'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>

               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-4 p-2 bg-slate-800 rounded-[10px] ${
                     !carToggle && 'hidden'
                  }`}
               >
                  <li
                     className={`p-2 hover:font-bold rounded-[10px] cursor-pointer ${
                        path.includes('manage-car') && 'font-bold'
                     }`}
                  >
                     <Link className='w-full' href='/cars/manage-cars'>
                        Manage Car
                     </Link>
                  </li>
                  <li
                     className={`p-2 hover:font-bold rounded-[10px] cursor-pointer ${
                        path.includes('add-new-car') && 'font-bold'
                     }`}
                  >
                     <Link className='w-full' href='/cars/add-new-car'>
                        Add New Car
                     </Link>
                  </li>
               </ul>
            </div>

            <div className='relative'>
               <Link
                  onClick={() => {
                     setPostToggle(!postToggle);
                     setCarToggle(false);
                     setSettingToggle(false);
                  }}
                  href='#'
               >
                  <div
                     className={`flex gap-3 items-center ${
                        path.includes('posts') && 'bg-violet-700'
                     } hover:bg-violet-700 rounded-[10px] py-2 px-3`}
                  >
                     <AiOutlineEdit size={20} />
                     <span className='hidden lg:block'>Post</span>
                     <AiFillCaretDown
                        className={`hidden lg:block ${
                           postToggle &&
                           'transition-all rotate-180 duration-300'
                        }`}
                     />
                  </div>
               </Link>
               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-4 p-2 bg-slate-800 rounded-[10px] ${
                     !postToggle && 'hidden'
                  }`}
               >
                  <Link href='/posts/manage-posts'>
                     <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer justify-center'>
                        Manage Posts
                     </li>
                  </Link>
                  <Link href='/posts/add-new-post'>
                     <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer'>
                        Add New Post
                     </li>
                  </Link>
               </ul>
            </div>
            <div className='relative'>
               <div
                  onClick={() => {
                     setSettingToggle(!settingToggle);
                     setCarToggle(false);
                     setPostToggle(false);
                  }}
                  className='flex gap-3 items-center hover:bg-violet-700 rounded-[10px] py-2 px-3 cursor-pointer'
               >
                  <BsGear size={20} />
                  <span className='hidden lg:block'>Setting</span>
                  <AiFillCaretDown
                     className={`hidden lg:block ${
                        settingToggle &&
                        'transition-all rotate-180 duration-300'
                     }`}
                  />
               </div>
               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-4 p-2 bg-slate-800 rounded-[10px] ${
                     !settingToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer justify-center'>
                     General
                  </li>
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer'>
                     Homepage
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default AdminSidebar;
