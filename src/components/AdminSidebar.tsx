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

const AdminSidebar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const path = usePathname();

   return (
      <div className='w-[220px] bg-slate-900 min-h-screen text-white font-semibold px-[30px]'>
         <div className='mt-[30px] mb-[20px]'>
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
                  <span>Dashboard</span>
               </div>
            </Link>

            <div onClick={() => setCarToggle(!carToggle)}>
               <div
                  className={`flex gap-3 items-center ${
                     path.includes('cars') && 'bg-violet-700'
                  } hover:bg-violet-700 rounded-[10px] py-2 px-3 cursor-pointer`}
               >
                  <AiOutlineCar size={20} />
                  <span>Cars</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-1 mt-4 px-2 bg-slate-800 rounded-[10px] ${
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

            <div onClick={() => setPostToggle(!postToggle)}>
               <div className='flex gap-3 items-center hover:bg-violet-700 rounded-[10px] py-2 px-3 cursor-pointer'>
                  <AiOutlineEdit size={20} />
                  <span>Post</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-1 mt-4 px-2 bg-slate-800 rounded-[10px] ${
                     !postToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer justify-center'>
                     Manage Posts
                  </li>
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer'>
                     Add New Post
                  </li>
               </ul>
            </div>
            <div onClick={() => setSettingToggle(!settingToggle)}>
               <div className='flex gap-3 items-center hover:bg-violet-700 rounded-[10px] py-2 px-3 cursor-pointer'>
                  <BsGear size={20} />
                  <span>Setting</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-1 mt-4 px-4 bg-slate-800 rounded-[10px] ${
                     !settingToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer justify-center'>
                     Slider
                  </li>
                  <li className='p-2 hover:font-bold rounded-[10px] cursor-pointer'>
                     Account
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default AdminSidebar;
