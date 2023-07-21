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

const Navbar = () => {
   const [carToggle, setCarToggle] = useState(false);
   const [postToggle, setPostToggle] = useState(false);
   const [settingToggle, setSettingToggle] = useState(false);
   const path = usePathname();

   return (
      <div className='w-[220px] bg-slate-900 min-h-screen text-white font-semibold px-[30px]'>
         <img
            className='mx-auto mt-[30px] mb-[40px]'
            src='/images/logoipsum-298.svg'
            alt=''
         />
         <div className='flex flex-col gap-6 dropdown'>
            <Link href='/dashboard'>
               <div
                  className={`flex gap-3 items-center ${
                     path === '/dashboard' && 'bg-orange-700'
                  } hover:bg-orange-700 rounded-[10px] py-2 px-3 cursor-pointer`}
               >
                  <AiOutlineDashboard size={20} />
                  <span>Dashboard</span>
               </div>
            </Link>

            <div onClick={() => setCarToggle(!carToggle)}>
               <div
                  className={`flex gap-3 items-center ${
                     path.includes('cars') && 'bg-orange-700'
                  } hover:bg-orange-700 rounded-[10px] py-2 px-3 cursor-pointer`}
               >
                  <AiOutlineCar size={20} />
                  <span>Cars</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-2 mt-2 pl-7 ${
                     !carToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer justify-center'>
                     <Link className='w-full' href='/cars/manage-cars'>
                        Manage Car
                     </Link>
                  </li>
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer'>
                     <Link className='w-full' href='/cars/add-new-car'>
                        Add New Car
                     </Link>
                  </li>
               </ul>
            </div>

            <div onClick={() => setPostToggle(!postToggle)}>
               <div className='flex gap-3 items-center hover:bg-orange-700 rounded-[10px] py-2 px-3 cursor-pointer'>
                  <AiOutlineEdit size={20} />
                  <span>Post</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-2 mt-2 pl-7 ${
                     !postToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer justify-center'>
                     Manage Posts
                  </li>
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer'>
                     Add New Post
                  </li>
               </ul>
            </div>
            <div onClick={() => setSettingToggle(!settingToggle)}>
               <div className='flex gap-3 items-center hover:bg-orange-700 rounded-[10px] py-2 px-3 cursor-pointer'>
                  <BsGear size={20} />
                  <span>Setting</span>
               </div>
               <ul
                  className={`text-sm font-medium space-y-2 mt-2 pl-7 ${
                     !settingToggle && 'hidden'
                  }`}
               >
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer justify-center'>
                     Slider
                  </li>
                  <li className='p-2 hover:bg-orange-700 rounded-[10px] cursor-pointer'>
                     Account
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
