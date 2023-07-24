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
      <div className='w-[70px] lg:w-[200px] bg-gray-900 min-h-screen text-white text-sm px-2 lg:px-1 font-bold'>
         <div className='mt-[30px] mb-[40px]'>
            <h1 className='text-center text-2xl font-bold'>Admin.</h1>
         </div>
         <div className='border-b mb-[40px] border-slate-500'></div>

         <div className='flex flex-col gap-3 dropdown'>
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center  py-2 px-3 ${
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
                  }}
                  href='#'
               >
                  <div
                     className={`flex gap-3 items-center ${
                        path.includes('cars') && 'bg-violet-700'
                     } hover:bg-violet-700  py-2 px-3`}
                  >
                     <AiOutlineCar size={20} />
                     <span className='hidden lg:block'>Cars</span>
                     <AiFillCaretDown
                        className={`hidden lg:block ${
                           carToggle && 'transition-all rotate-180 duration-300'
                        }`}
                        size={10}
                     />
                  </div>
               </Link>

               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-1 p-2 bg-slate-800 z-10  ${
                     !carToggle && 'hidden'
                  }`}
               >
                  <li
                     className={`p-2 hover:font-bold  cursor-pointer ${
                        path.includes('manage-car') && 'font-bold'
                     }`}
                  >
                     <Link className='w-full' href='/cars/manage-cars'>
                        Manage Car
                     </Link>
                  </li>
                  <li
                     className={`p-2 hover:font-bold  cursor-pointer ${
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
                  }}
                  href='#'
               >
                  <div
                     className={`flex gap-3 items-center ${
                        path.includes('posts') && 'bg-violet-700'
                     } hover:bg-violet-700  py-2 px-3`}
                  >
                     <AiOutlineEdit size={20} />
                     <span className='hidden lg:block'>Posts</span>
                     <AiFillCaretDown
                        className={`hidden lg:block ${
                           postToggle &&
                           'transition-all rotate-180 duration-300'
                        }`}
                        size={10}
                     />
                  </div>
               </Link>
               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-1 p-2 z-10 bg-slate-800  ${
                     !postToggle && 'hidden'
                  }`}
               >
                  <Link href='/posts/manage-posts'>
                     <li className='p-2 hover:font-bold  cursor-pointer justify-center'>
                        Manage Posts
                     </li>
                  </Link>
                  <Link href='/posts/add-new-post'>
                     <li className='p-2 hover:font-bold  cursor-pointer'>
                        Add New Post
                     </li>
                  </Link>
               </ul>
            </div>
            <div className='relative'>
               <div
                  onClick={() => {
                     setSettingToggle(!settingToggle);
                  }}
                  className='flex gap-3 items-center hover:bg-violet-700  py-2 px-3 cursor-pointer'
               >
                  <BsGear size={20} />
                  <span className='hidden lg:block'>Setting</span>
                  <AiFillCaretDown
                     className={`hidden lg:block ${
                        settingToggle &&
                        'transition-all rotate-180 duration-300'
                     }`}
                     size={10}
                  />
               </div>
               <ul
                  className={`absolute lg:relative -top-4 lg:top-0 lg:left-0 left-[105%] w-max lg:w-full text-sm font-medium space-y-1 mt-1 p-2 z-10 bg-slate-800  ${
                     !settingToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:font-bold  cursor-pointer justify-center'>
                     General
                  </li>
                  <li className='p-2 hover:font-bold  cursor-pointer'>
                     Homepage
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default AdminSidebar;
